'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AddEmployeeModal from '@/components/AddEmployeeModal'

interface EnterpriseData {
  id: string
  business_name: string
  address: string
  city: string
  postcode: string
  phone: string
  email: string
  industry: string
  company_size: string
  job_title: string
  country: string
  is_active: boolean
  created_at: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  subscription_status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete'
  trial_ends_at?: string
  canceled_at?: string
  last_payment_at?: string
}

interface Employee {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string
  employment_type: string
  is_active: boolean
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [enterprise, setEnterprise] = useState<EnterpriseData | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalJobs: 0,
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
      // Load enterprise data
      const { data: enterpriseData, error: enterpriseError } = await supabase
        .from('enterprises')
        .select('*')
        .eq('tradesperson_id', userId)
        .single()

      if (enterpriseError) throw enterpriseError
      setEnterprise(enterpriseData)

      // Load employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('enterprise_employees')
        .select('*')
        .eq('enterprise_id', enterpriseData.id)
        .order('created_at', { ascending: false })

      if (employeesError) throw employeesError
      setEmployees(employeesData || [])

      // Calculate stats
      const activeEmployees = employeesData?.filter(e => e.is_active).length || 0
      setStats({
        totalEmployees: employeesData?.length || 0,
        activeEmployees,
        totalJobs: 0,
        pendingExpenses: 0,
      })

    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Premium Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-primary/50 animate-pulse">
                  🐝
                </div>
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">{enterprise?.business_name}</h1>
                  <p className="text-xs text-gray-400 font-medium">{enterprise?.industry}</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
                <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-semibold transition-all">
                  Overview
                </button>
                <button className="px-4 py-2 text-gray-400 hover:text-white rounded-lg text-sm font-semibold transition-all">
                  Employees
                </button>
                <button className="px-4 py-2 text-gray-400 hover:text-white rounded-lg text-sm font-semibold transition-all">
                  Jobs
                </button>
                <button className="px-4 py-2 text-gray-400 hover:text-white rounded-lg text-sm font-semibold transition-all">
                  Reports
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              <button
                onClick={handleSignOut}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all border border-white/10"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Welcome Section with Premium Design */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Welcome back 👋
              </h2>
              <p className="text-lg text-gray-400 font-medium">Here's what's happening with your business today.</p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Today's Date</p>
                <p className="text-lg font-bold text-white">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Subscription Status Banner */}
        {enterprise && (
          <div className={`relative overflow-hidden rounded-3xl shadow-2xl p-8 mb-12 border-2 ${
            enterprise.subscription_status === 'trialing'
              ? 'bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent border-blue-500/30'
              : enterprise.subscription_status === 'active'
              ? 'bg-gradient-to-br from-green-600/20 via-green-500/10 to-transparent border-green-500/30'
              : enterprise.subscription_status === 'past_due'
              ? 'bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent border-red-500/30'
              : 'bg-gradient-to-br from-gray-600/20 via-gray-500/10 to-transparent border-gray-500/30'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-xl ${
                  enterprise.subscription_status === 'trialing' ? 'bg-blue-500/20' :
                  enterprise.subscription_status === 'active' ? 'bg-green-500/20' :
                  enterprise.subscription_status === 'past_due' ? 'bg-red-500/20' : 'bg-gray-500/20'
                }`}>
                  {enterprise.subscription_status === 'trialing' && '🎁'}
                  {enterprise.subscription_status === 'active' && '✅'}
                  {enterprise.subscription_status === 'past_due' && '⚠️'}
                  {!enterprise.subscription_status && '⏳'}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    {enterprise.subscription_status === 'trialing' && 'Free Trial Active'}
                    {enterprise.subscription_status === 'active' && 'Subscription Active'}
                    {enterprise.subscription_status === 'past_due' && 'Payment Required'}
                    {!enterprise.subscription_status && 'Complete Setup'}
                  </h3>
                  <p className="text-gray-300 font-medium">
                    {enterprise.subscription_status === 'trialing' && enterprise.trial_ends_at && (
                      <>Your free trial ends on {new Date(enterprise.trial_ends_at).toLocaleDateString()}. Enjoy all premium features!</>
                    )}
                    {enterprise.subscription_status === 'active' && (
                      <>Your subscription is active and running smoothly. Thank you for being a valued customer!</>
                    )}
                    {enterprise.subscription_status === 'past_due' && (
                      <>Please update your payment method to continue enjoying BreezyHive Enterprise.</>
                    )}
                    {!enterprise.subscription_status && (
                      <>Complete your payment setup to activate your 14-day free trial with full access.</>
                    )}
                  </p>
                </div>
              </div>
              {(enterprise.subscription_status === 'past_due' || !enterprise.subscription_status) && (
                <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105">
                  {!enterprise.subscription_status ? 'Complete Setup' : 'Update Payment'}
                </button>
              )}
              {(enterprise.subscription_status === 'trialing' || enterprise.subscription_status === 'active') && (
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
                  Manage Subscription
                </button>
              )}
            </div>
          </div>
        )}

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-2xl">
                  👥
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-400 font-bold">↑ 12%</div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-400 mb-2">Total Employees</p>
              <p className="text-5xl font-black text-white">{stats.totalEmployees}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-400 font-bold">Active</div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-400 mb-2">Active Employees</p>
              <p className="text-5xl font-black text-green-400">{stats.activeEmployees}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-600/10 via-purple-500/5 to-transparent rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl">
                  📋
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-bold">This Month</div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-400 mb-2">Active Jobs</p>
              <p className="text-5xl font-black text-white">{stats.totalJobs}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent rounded-3xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center text-2xl">
                  💰
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-400 font-bold">Pending</div>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-400 mb-2">Expense Claims</p>
              <p className="text-5xl font-black text-orange-400">{stats.pendingExpenses}</p>
            </div>
          </div>
        </div>

        {/* Premium Quick Actions */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12">
          <h3 className="text-2xl font-black text-white mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => setShowAddEmployee(true)}
              className="group relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 border border-primary/30 hover:border-primary/60 transition-all hover:scale-105 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  ➕
                </div>
                <span className="text-base font-bold text-white block">Add Employee</span>
                <span className="text-xs text-gray-400 mt-1 block">Onboard new team member</span>
              </div>
            </button>

            <Link
              href="/dashboard/jobs/create"
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/60 transition-all hover:scale-105 transform block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  📝
                </div>
                <span className="text-base font-bold text-white block">Create Job</span>
                <span className="text-xs text-gray-400 mt-1 block">Assign new project</span>
              </div>
            </Link>

            <button className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent rounded-2xl p-8 border border-green-500/30 hover:border-green-500/60 transition-all hover:scale-105 transform">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  ⏰
                </div>
                <span className="text-base font-bold text-white block">Time Entries</span>
                <span className="text-xs text-gray-400 mt-1 block">Review clock-ins</span>
              </div>
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-105 transform">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  💳
                </div>
                <span className="text-base font-bold text-white block">Expenses</span>
                <span className="text-xs text-gray-400 mt-1 block">Approve claims</span>
              </div>
            </button>
          </div>
        </div>

        {/* Premium Employees Section */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Team Members</h3>
                <p className="text-gray-400">Manage your workforce efficiently</p>
              </div>
              <button
                onClick={() => setShowAddEmployee(true)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105"
              >
                + Add Employee
              </button>
            </div>
          </div>

          {employees.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <span className="text-7xl">👷</span>
              </div>
              <h4 className="text-2xl font-black text-white mb-4">Build Your Dream Team</h4>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Start adding employees to manage your workforce, track time, and streamline operations.</p>
              <button
                onClick={() => setShowAddEmployee(true)}
                className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105"
              >
                Add Your First Employee
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {employees.map((employee, index) => (
                    <tr key={employee.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {employee.first_name[0]}{employee.last_name[0]}
                          </div>
                          <div>
                            <div className="text-base font-bold text-white">
                              {employee.first_name} {employee.last_name}
                            </div>
                            <div className="text-xs text-gray-500">Joined {new Date(employee.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm text-gray-300">{employee.email}</div>
                        <div className="text-xs text-gray-500">{employee.phone || 'No phone'}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{employee.employment_type}</span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        {employee.is_active ? (
                          <span className="px-4 py-2 text-xs font-bold rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-2 w-fit">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Active
                          </span>
                        ) : (
                          <span className="px-4 py-2 text-xs font-bold rounded-xl bg-gray-500/20 text-gray-400 border border-gray-500/30">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/dashboard/employee/${employee.id}`}
                            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-all border border-white/10 inline-block"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={async () => {
                              if (confirm(`Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`)) {
                                try {
                                  const { data: { session } } = await supabase.auth.getSession()
                                  if (!session) {
                                    alert('You must be logged in')
                                    return
                                  }

                                  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
                                  const response = await fetch(`${supabaseUrl}/functions/v1/delete-employee`, {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${session.access_token}`,
                                    },
                                    body: JSON.stringify({
                                      employeeId: employee.id,
                                      userId: employee.user_id
                                    }),
                                  })

                                  const result = await response.json()

                                  if (!response.ok) {
                                    throw new Error(result.error || 'Failed to delete employee')
                                  }

                                  alert('Employee deleted successfully')
                                  window.location.reload()
                                } catch (error: any) {
                                  console.error('Delete error:', error)
                                  alert(`Error: ${error.message}`)
                                }
                              }
                            }}
                            className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold transition-all border border-red-500/30 hover:border-red-500/50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Employee Modal */}
      {showAddEmployee && enterprise && (
        <AddEmployeeModal
          enterpriseId={enterprise.id}
          onClose={() => setShowAddEmployee(false)}
          onSuccess={async () => {
            // Reload dashboard data to show new employee
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
              await loadDashboardData(user.id)
            }
          }}
        />
      )}
    </div>
  )
}
