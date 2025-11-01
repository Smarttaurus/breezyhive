'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/DashboardSidebar'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const JobsMapDynamic = dynamic(() => import('@/components/JobsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0a0e1a] flex items-center justify-center">
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
  source?: 'enterprise' | 'marketplace' // Track where job came from
}

// Job categories for filtering
const JOB_CATEGORIES = [
  { id: 'all', name: 'All Jobs', icon: '🔧' },
  { id: 'plumbing', name: 'Plumbing', icon: '💧' },
  { id: 'electrical', name: 'Electrical', icon: '⚡' },
  { id: 'building', name: 'Building', icon: '🏗️' },
  { id: 'roofing', name: 'Roofing', icon: '🏠' },
  { id: 'carpentry', name: 'Carpentry', icon: '🔨' },
  { id: 'painting', name: 'Painting', icon: '🎨' },
  { id: 'landscaping', name: 'Landscaping', icon: '🌿' },
  { id: 'handyman', name: 'Handyman', icon: '🛠️' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [enterprise, setEnterprise] = useState<EnterpriseData | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<'all' | 'enterprise' | 'marketplace'>('all')
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

  useEffect(() => {
    let filtered = jobs

    // Filter by source
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(job => job.source === sourceFilter)
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(job => job.category === categoryFilter)
    }

    setFilteredJobs(filtered)
  }, [categoryFilter, sourceFilter, jobs])

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category)
  }

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

      // Load enterprise jobs with coordinates
      const { data: enterpriseJobsData } = await supabase
        .from('enterprise_jobs')
        .select('*')
        .eq('enterprise_id', enterpriseData.id)

      const validEnterpriseJobs = (enterpriseJobsData || [])
        .filter(job => job.location_latitude && job.location_longitude)
        .map(job => ({
          id: job.id,
          title: job.title,
          location_latitude: job.location_latitude,
          location_longitude: job.location_longitude,
          city: job.city,
          category: job.category,
          status: job.status,
          budget_min: job.budget_min,
          budget_max: job.budget_max,
          source: 'enterprise' as const
        }))

      // Load marketplace jobs (public jobs from customers)
      const { data: marketplaceJobsData } = await supabase
        .from('jobs')
        .select('id, title, location_latitude, location_longitude, city, category, status, budget_min, budget_max')
        .eq('status', 'open')

      const validMarketplaceJobs = (marketplaceJobsData || [])
        .filter(job => job.location_latitude && job.location_longitude)
        .map(job => ({
          ...job,
          source: 'marketplace' as const
        }))

      // Combine both job sources
      const allJobs = [...validEnterpriseJobs, ...validMarketplaceJobs]

      setJobs(allJobs)
      setFilteredJobs(allJobs)

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

      {/* Full Screen Map Background - INTERACTIVE */}
      <div className="fixed inset-0 ml-64 z-0">
        <JobsMapDynamic jobs={filteredJobs} height="100vh" />
      </div>

      {/* Compact Floating Stats - Top */}
      <div className="fixed top-4 left-72 right-4 z-20 pointer-events-none">
        <div className="flex items-center justify-between gap-3 pointer-events-auto">
          {/* Compact Header */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2">
            <h1 className="text-lg font-black text-white">{enterprise?.business_name}</h1>
          </div>

          {/* Job Source Filter */}
          <div className="flex gap-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setSourceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sourceFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              All ({jobs.length})
            </button>
            <button
              onClick={() => setSourceFilter('enterprise')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sourceFilter === 'enterprise'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              My Jobs ({jobs.filter(j => j.source === 'enterprise').length})
            </button>
            <button
              onClick={() => setSourceFilter('marketplace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sourceFilter === 'marketplace'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Marketplace ({jobs.filter(j => j.source === 'marketplace').length})
            </button>
          </div>

          {/* Mini Stats Cards */}
          <div className="flex gap-2">
            <Link href="/dashboard/employees" className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 hover:border-blue-500/50 hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="text-lg">👥</span>
              <div>
                <div className="text-white font-bold text-sm">{stats.totalEmployees}</div>
                <div className="text-gray-400 text-xs">Team</div>
              </div>
              {stats.clockedIn > 0 && (
                <div className="ml-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </Link>

            <Link href="/dashboard/jobs" className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 hover:border-orange-500/50 hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="text-lg">🔧</span>
              <div>
                <div className="text-white font-bold text-sm">{stats.totalJobs}</div>
                <div className="text-gray-400 text-xs">Jobs</div>
              </div>
            </Link>

            <Link href="/dashboard/expenses" className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 hover:border-yellow-500/50 hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="text-lg">💰</span>
              <div>
                <div className="text-white font-bold text-sm">{stats.pendingExpenses}</div>
                <div className="text-gray-400 text-xs">Expenses</div>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Category Filter - Left Side */}
      <div className="fixed top-20 left-72 z-20 pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {JOB_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`group bg-gradient-to-br backdrop-blur-md border rounded-xl px-3 py-2 hover:bg-white/15 transition-all flex items-center gap-2 min-w-[140px] ${
                categoryFilter === category.id
                  ? 'from-primary/30 to-accent/30 border-primary/60 bg-white/20'
                  : 'from-white/5 to-transparent border-white/20 hover:border-primary/40'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="text-white font-bold text-xs">{category.name}</div>
              {categoryFilter === category.id && jobs.filter(j => category.id === 'all' || j.category === category.id).length > 0 && (
                <div className="ml-auto w-5 h-5 rounded-full bg-primary/50 flex items-center justify-center text-white text-xs font-bold">
                  {jobs.filter(j => category.id === 'all' || j.category === category.id).length}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
