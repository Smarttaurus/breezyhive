'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Employee {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string
  employment_type: string
  hourly_rate: number | null
  hire_date: string
  is_active: boolean
  created_at: string
  is_clocked_in?: boolean
}

export default function EmployeesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [roleFilter, setRoleFilter] = useState<'all' | string>('all')

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/business/login')
        return
      }

      // Get enterprise
      const { data: enterprise } = await supabase
        .from('enterprises')
        .select('id')
        .eq('tradesperson_id', user.id)
        .single()

      if (!enterprise) {
        router.push('/dashboard')
        return
      }

      // Load employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('enterprise_employees')
        .select('*')
        .eq('enterprise_id', enterprise.id)
        .order('created_at', { ascending: false })

      if (employeesError) throw employeesError

      // Check which employees are currently clocked in
      if (employeesData && employeesData.length > 0) {
        const { data: clockedInData } = await supabase
          .from('employee_time_entries')
          .select('employee_id')
          .eq('enterprise_id', enterprise.id)
          .eq('status', 'clocked_in')

        const clockedInIds = new Set(clockedInData?.map(entry => entry.employee_id) || [])

        const employeesWithStatus = employeesData.map(emp => ({
          ...emp,
          is_clocked_in: clockedInIds.has(emp.id)
        }))

        setEmployees(employeesWithStatus)
      } else {
        setEmployees([])
      }
    } catch (error) {
      console.error('Error loading employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && emp.is_active) ||
                         (statusFilter === 'inactive' && !emp.is_active)
    const matchesRole = roleFilter === 'all' || emp.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const uniqueRoles = Array.from(new Set(employees.map(e => e.role)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Loading employees...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm mb-2 inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="text-4xl font-black text-white">👥 Team Management</h1>
              <p className="text-gray-400 mt-2">Manage your workforce and team members</p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
            >
              Add Employee
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Total Employees</div>
            <div className="text-3xl font-bold text-white">{employees.length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Active Employees</div>
            <div className="text-3xl font-bold text-green-400">{employees.filter(e => e.is_active).length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Currently Working</div>
            <div className="text-3xl font-bold text-blue-400">{employees.filter(e => e.is_clocked_in).length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Roles</div>
            <div className="text-3xl font-bold text-purple-400">{uniqueRoles.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employees Grid */}
        {filteredEmployees.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-20 text-center">
            <div className="text-6xl mb-4">👷</div>
            <h3 className="text-2xl font-bold text-white mb-2">No employees found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || statusFilter !== 'all' || roleFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first employee'}
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
            >
              Add Employee
            </Link>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Employee</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Hourly Rate</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center text-white font-bold">
                            {employee.first_name[0]}{employee.last_name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {employee.first_name} {employee.last_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Joined {new Date(employee.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{employee.email}</div>
                        <div className="text-xs text-gray-500">{employee.phone || 'No phone'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">{employee.employment_type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">
                          {employee.hourly_rate ? `£${employee.hourly_rate}/hr` : 'Not set'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {employee.is_active ? (
                            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1 w-fit">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                              Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-gray-500/20 text-gray-400 border border-gray-500/30 w-fit">
                              Inactive
                            </span>
                          )}
                          {employee.is_clocked_in && (
                            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 w-fit">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                              Clocked In
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/employee/${employee.id}`}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-all border border-white/10 inline-block"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
