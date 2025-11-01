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

// ALL Job categories from mobile app (50 categories)
const JOB_CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'plumbing', name: 'Plumbing & Heating' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'building', name: 'Building & Construction' },
  { id: 'roofing', name: 'Roofing' },
  { id: 'carpentry', name: 'Carpentry & Joinery' },
  { id: 'painting', name: 'Painting & Decorating' },
  { id: 'plastering', name: 'Plastering & Rendering' },
  { id: 'flooring', name: 'Flooring' },
  { id: 'tiling', name: 'Tiling' },
  { id: 'kitchen_bathroom', name: 'Kitchen & Bathroom' },
  { id: 'windows_doors', name: 'Windows & Doors' },
  { id: 'landscaping', name: 'Landscaping & Gardening' },
  { id: 'groundwork', name: 'Groundwork & Drainage' },
  { id: 'driveways', name: 'Driveways & Paving' },
  { id: 'gas', name: 'Gas Services' },
  { id: 'hvac', name: 'HVAC & Air Conditioning' },
  { id: 'insulation', name: 'Insulation & Damp Proofing' },
  { id: 'specialist', name: 'Specialist Services' },
  { id: 'demolition', name: 'Demolition & Clearance' },
  { id: 'scaffolding', name: 'Scaffolding' },
  { id: 'security', name: 'Security & Alarms' },
  { id: 'solar', name: 'Solar & Renewable Energy' },
  { id: 'cleaning', name: 'Cleaning Services' },
  { id: 'pest_control', name: 'Pest Control' },
  { id: 'handyman', name: 'Handyman Services' },
  { id: 'plant_hire', name: 'Plant Hire & Equipment' },
  { id: 'tool_hire', name: 'Tool Hire' },
  { id: 'skip_hire', name: 'Skip Hire & Waste' },
  { id: 'removals', name: 'Removals & Storage' },
  { id: 'masonry', name: 'Masonry & Stonework' },
  { id: 'welding', name: 'Welding & Metalwork' },
  { id: 'concrete', name: 'Concrete Services' },
  { id: 'crane_lifting', name: 'Crane & Lifting Services' },
  { id: 'access_equipment', name: 'Access Equipment' },
  { id: 'piling', name: 'Piling & Drilling' },
  { id: 'site_services', name: 'Site Services' },
  { id: 'surveying', name: 'Surveying & Engineering' },
  { id: 'shuttering', name: 'Shuttering & Formwork' },
  { id: 'suspended_ceilings', name: 'Suspended Ceilings' },
  { id: 'partitions', name: 'Partitions & Dividers' },
  { id: 'cladding', name: 'Cladding & Facades' },
  { id: 'fire_safety', name: 'Fire Safety & Protection' },
  { id: 'waterproofing', name: 'Waterproofing' },
  { id: 'excavation', name: 'Excavation & Earthworks' },
  { id: 'mechanical', name: 'Mechanical Services' },
  { id: 'shopfitting', name: 'Shopfitting & Joinery' },
  { id: 'signage', name: 'Signage & Graphics' },
  { id: 'flooring_industrial', name: 'Industrial Flooring' },
  { id: 'testing_inspection', name: 'Testing & Inspection' },
  { id: 'other', name: 'Other Services' },
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
      const { data: enterpriseJobsData, error: enterpriseError } = await supabase
        .from('enterprise_jobs')
        .select('*')
        .eq('enterprise_id', enterpriseData.id)

      console.log('Enterprise jobs raw:', enterpriseJobsData)
      console.log('Enterprise jobs error:', enterpriseError)

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

      console.log('Valid enterprise jobs with coords:', validEnterpriseJobs)

      // Load marketplace jobs (public jobs from customers) - get ALL location fields
      const { data: marketplaceJobsData, error: marketplaceError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')

      console.log('Marketplace jobs raw (ALL FIELDS):', marketplaceJobsData)
      console.log('Marketplace jobs error:', marketplaceError)

      const validMarketplaceJobs = (marketplaceJobsData || [])
        .filter(job => (job.location_latitude || job.locationLatitude) && (job.location_longitude || job.locationLongitude))
        .map(job => ({
          id: job.id,
          title: job.title,
          location_latitude: job.location_latitude || job.locationLatitude,
          location_longitude: job.location_longitude || job.locationLongitude,
          city: job.city,
          category: job.category,
          status: job.status,
          budget_min: job.budget_min || job.budgetMin,
          budget_max: job.budget_max || job.budgetMax,
          source: 'marketplace' as const
        }))

      console.log('Valid marketplace jobs with coords:', validMarketplaceJobs)

      // Combine both job sources
      const allJobs = [...validEnterpriseJobs, ...validMarketplaceJobs]

      console.log('All jobs combined:', allJobs)

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
        totalJobs: allJobs.length,
        openJobs: allJobs.filter(j => j.status === 'open').length,
        inProgressJobs: allJobs.filter(j => j.status === 'in_progress').length,
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

          {/* Filters Row */}
          <div className="flex gap-2">
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

            {/* Category Filter Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-white text-xs font-bold focus:outline-none focus:border-primary/50 transition-all"
            >
              {JOB_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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

    </div>
  )
}
