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
    <div className="min-h-screen bg-[#0a0e1a] flex">
      <DashboardSidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {enterprise?.business_name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Employees */}
          <div className="bg-[#0f1729] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">👥</span>
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold">
                {stats.clockedIn} Working
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.totalEmployees}</div>
            <div className="text-gray-400 text-sm">Total Employees</div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all"
                  style={{ width: `${stats.totalEmployees > 0 ? (stats.activeEmployees / stats.totalEmployees) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{stats.activeEmployees} active</span>
            </div>
          </div>

          {/* Jobs */}
          <div className="bg-[#0f1729] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🔧</span>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                {stats.inProgressJobs} Active
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.totalJobs}</div>
            <div className="text-gray-400 text-sm">Total Jobs</div>
            <div className="mt-3 text-xs text-gray-500">
              {stats.openJobs} open • {stats.inProgressJobs} in progress
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-[#0f1729] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">💰</span>
              {stats.pendingExpenses > 0 && (
                <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs font-bold">
                  Pending
                </div>
              )}
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.pendingExpenses}</div>
            <div className="text-gray-400 text-sm">Pending Expenses</div>
            <Link href="/dashboard/expenses" className="mt-3 text-xs text-primary hover:underline inline-block">
              Review expenses →
            </Link>
          </div>

          {/* Marketplace */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🏪</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">New</div>
            <div className="text-gray-400 text-sm mb-3">Browse Marketplace</div>
            <Link
              href="/dashboard/marketplace"
              className="inline-block px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-all"
            >
              View Jobs
            </Link>
          </div>
        </div>

        {/* Map */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-white">Job Locations</h2>
            <Link
              href="/dashboard/jobs"
              className="text-primary hover:text-primary/80 text-sm font-semibold"
            >
              View All Jobs →
            </Link>
          </div>
          <JobsMapDynamic jobs={jobs} height="600px" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/employees"
            className="bg-[#0f1729] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Manage Team
            </h3>
            <p className="text-gray-400 text-sm">
              View and manage your employees
            </p>
          </Link>

          <Link
            href="/dashboard/time-entries"
            className="bg-[#0f1729] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
          >
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Time Tracking
            </h3>
            <p className="text-gray-400 text-sm">
              View employee clock-in/out times
            </p>
          </Link>

          <Link
            href="/dashboard/reports"
            className="bg-[#0f1729] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
          >
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Analytics
            </h3>
            <p className="text-gray-400 text-sm">
              View reports and insights
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}
