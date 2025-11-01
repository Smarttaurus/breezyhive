'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/DashboardSidebar'
import JobsMap from '@/components/JobsMap'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const JobsMapDynamic = dynamic(() => import('@/components/JobsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-[#1a1f2e] rounded-2xl border border-white/10 flex items-center justify-center">
      <div className="text-white">Loading map...</div>
    </div>
  )
})

interface EnterpriseData {
  id: string
  business_name: string
}

interface Employee {
  id: string
  first_name: string
  last_name: string
  is_active: boolean
  is_clocked_in?: boolean
}

interface Job {
  id: string
  title: string
  location_latitude: number
  location_longitude: number
  city: string
  category: string
  status: string
  budget_min?: number
  budget_max?: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [enterprise, setEnterprise] = useState<EnterpriseData | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    clockedIn: 0,
    totalJobs: 0,
    openJobs: 0,
    inProgressJobs: 0,
    pendingExpenses: 0,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/business/login')
        return
      }

      await loadDashboardData(user.id)
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/business/login')
    }
  }

  const loadDashboardData = async (userId: string) => {
    try {
      // Get enterprise
      const { data: enterpriseData } = await supabase
        .from('enterprises')
        .select('*')
        .eq('tradesperson_id', userId)
        .single()

      if (!enterpriseData) {
        router.push('/dashboard')
        return
      }

      setEnterprise(enterpriseData)

      // Load employees
      const { data: employeesData } = await supabase
        .from('enterprise_employees')
        .select('*')
        .eq('enterprise_id', enterpriseData.id)

      // Check who's clocked in
      if (employeesData && employeesData.length > 0) {
        const { data: clockedInData } = await supabase
          .from('employee_time_entries')
          .select('employee_id')
          .eq('enterprise_id', enterpriseData.id)
          .eq('status', 'clocked_in')

        const clockedInIds = new Set(clockedInData?.map(entry => entry.employee_id) || [])

        const employeesWithStatus = employeesData.map(emp => ({
          ...emp,
          is_clocked_in: clockedInIds.has(emp.id)
        }))

        setEmployees(employeesWithStatus)
      }

      // Load jobs with coordinates
      const { data: jobsData } = await supabase
        .from('enterprise_jobs')
        .select('*')
        .eq('enterprise_id', enterpriseData.id)

      const validJobs = jobsData?.filter(job =>
        job.location_latitude && job.location_longitude
      ) || []

      setJobs(validJobs)

      // Load stats
      const { data: expensesData } = await supabase
        .from('employee_supplies')
        .select('id')
        .eq('enterprise_id', enterpriseData.id)
        .eq('status', 'pending')

      const { data: fuelData } = await supabase
        .from('employee_fuel_entries')
        .select('id')
        .eq('enterprise_id', enterpriseData.id)
        .eq('status', 'pending')

      setStats({
        totalEmployees: employeesData?.length || 0,
        activeEmployees: employeesData?.filter(e => e.is_active).length || 0,
        clockedIn: employeesData?.filter(e => e.is_clocked_in).length || 0,
        totalJobs: jobsData?.length || 0,
        openJobs: jobsData?.filter(j => j.status === 'open').length || 0,
        inProgressJobs: jobsData?.filter(j => j.status === 'in_progress').length || 0,
        pendingExpenses: (expensesData?.length || 0) + (fuelData?.length || 0)
      })

    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex overflow-hidden">
      <DashboardSidebar />

      {/* Full Screen Map Background */}
      <div className="fixed inset-0 ml-64 z-0">
        <JobsMapDynamic jobs={jobs} height="100vh" />
      </div>

      {/* Floating UI Elements */}
      <main className="flex-1 ml-64 relative z-10 p-8 pointer-events-none">
        <div className="pointer-events-auto">
        {/* Glassmorphism Header */}
        <div className="mb-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
          <h1 className="text-3xl font-black text-white mb-1">
            Command Center
          </h1>
          <p className="text-gray-400 text-sm">{enterprise?.business_name}</p>
        </div>

        {/* Floating Stats Grid - Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Employees Card */}
          <div className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-xl p-4 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/40 flex items-center justify-center text-xl">
                👥
              </div>
              {stats.clockedIn > 0 && (
                <div className="px-2 py-1 bg-green-500/30 backdrop-blur-sm text-green-300 rounded-lg text-xs font-bold border border-green-500/40 animate-pulse">
                  {stats.clockedIn} Live
                </div>
              )}
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.totalEmployees}</div>
            <div className="text-gray-300 text-xs font-semibold">Team Members</div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-white/10 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.totalEmployees > 0 ? (stats.activeEmployees / stats.totalEmployees) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 font-semibold">{stats.activeEmployees}</span>
            </div>
          </div>

          {/* Jobs Card */}
          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center text-2xl backdrop-blur-sm">
                🔧
              </div>
              {stats.inProgressJobs > 0 && (
                <div className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm text-orange-300 rounded-lg text-xs font-bold border border-orange-500/30">
                  {stats.inProgressJobs} Active
                </div>
              )}
            </div>
            <div className="text-4xl font-black text-white mb-1">{stats.totalJobs}</div>
            <div className="text-gray-300 text-sm font-semibold">Total Jobs</div>
            <div className="mt-4 text-xs text-gray-400 font-semibold">
              <span className="text-green-400">{stats.openJobs} open</span> • <span className="text-orange-400">{stats.inProgressJobs} in progress</span>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 flex items-center justify-center text-2xl backdrop-blur-sm">
                💰
              </div>
              {stats.pendingExpenses > 0 && (
                <div className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm text-yellow-300 rounded-lg text-xs font-bold border border-yellow-500/30 animate-pulse">
                  Review
                </div>
              )}
            </div>
            <div className="text-4xl font-black text-white mb-1">{stats.pendingExpenses}</div>
            <div className="text-gray-300 text-sm font-semibold">Pending Expenses</div>
            <Link href="/dashboard/expenses" className="mt-4 inline-block text-xs text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Review expenses →
            </Link>
          </div>

          {/* Marketplace Card */}
          <div className="group bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-2xl border border-primary/40 rounded-2xl p-6 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/40 flex items-center justify-center text-2xl backdrop-blur-sm">
                🏪
              </div>
              <div className="px-3 py-1 bg-primary/30 backdrop-blur-sm text-white rounded-lg text-xs font-bold border border-primary/40">
                New
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-1">Browse</div>
            <div className="text-gray-300 text-sm font-semibold mb-4">Job Marketplace</div>
            <Link
              href="/dashboard/marketplace"
              className="inline-block px-4 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/30"
            >
              Explore Jobs
            </Link>
          </div>
        </div>

        {/* Floating Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/employees"
            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Manage Team
            </h3>
            <p className="text-gray-400 text-sm">
              View and manage your employees
            </p>
          </Link>

          <Link
            href="/dashboard/time-entries"
            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              ⏰
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Time Tracking
            </h3>
            <p className="text-gray-400 text-sm">
              View employee clock-in/out times
            </p>
          </Link>

          <Link
            href="/dashboard/reports"
            className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📈
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Analytics
            </h3>
            <p className="text-gray-400 text-sm">
              View reports and insights
            </p>
          </Link>
        </div>
        </div>
      </main>
    </div>
  )
}
