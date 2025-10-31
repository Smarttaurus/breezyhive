'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Employee {
  id: string
  user_id: string
  enterprise_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string
  employment_type: string
  hourly_rate: number | null
  hire_date: string
  can_create_jobs: boolean
  can_view_all_jobs: boolean
  can_approve_expenses: boolean
  is_active: boolean
  created_at: string
}

interface TimeEntry {
  id: string
  employee_id: string
  enterprise_id: string
  job_id: string | null
  clock_in_time: string
  clock_out_time: string | null
  clock_in_latitude: number
  clock_in_longitude: number
  clock_in_address: string | null
  clock_out_latitude: number | null
  clock_out_longitude: number | null
  clock_out_address: string | null
  total_hours: number | null
  status: string
  created_at: string
}

interface JobAssignment {
  id: string
  job_id: string
  job_title: string
  job_status: string
  job_location: string
  job_priority: string
  job_due_date: string | null
  assigned_at: string
  completed_at: string | null
}

export default function EmployeeDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const employeeId = params.id as string

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [jobAssignments, setJobAssignments] = useState<JobAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [isClockedIn, setIsClockedIn] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    employmentType: '',
    hourlyRate: '',
    hireDate: '',
    canCreateJobs: false,
    canViewAllJobs: false,
    canApproveExpenses: false,
    isActive: true,
  })

  useEffect(() => {
    loadEmployeeData()
  }, [employeeId])

  const loadEmployeeData = async () => {
    try {
      setLoading(true)

      // Load employee details
      const { data: employeeData, error: employeeError } = await supabase
        .from('enterprise_employees')
        .select('*')
        .eq('id', employeeId)
        .single()

      if (employeeError) throw employeeError
      setEmployee(employeeData)

      // Set form data
      setFormData({
        firstName: employeeData.first_name,
        lastName: employeeData.last_name,
        email: employeeData.email,
        phone: employeeData.phone || '',
        role: employeeData.role,
        employmentType: employeeData.employment_type,
        hourlyRate: employeeData.hourly_rate?.toString() || '',
        hireDate: employeeData.hire_date,
        canCreateJobs: employeeData.can_create_jobs,
        canViewAllJobs: employeeData.can_view_all_jobs,
        canApproveExpenses: employeeData.can_approve_expenses,
        isActive: employeeData.is_active,
      })

      // Load time entries (clock in/out records) - FIXED TABLE NAME
      const { data: timeData, error: timeError } = await supabase
        .from('employee_time_entries')
        .select('*')
        .eq('employee_id', employeeId)
        .order('clock_in_time', { ascending: false })
        .limit(50)

      if (!timeError && timeData) {
        setTimeEntries(timeData)
        // Check if employee is currently clocked in
        const activeClock = timeData.find(entry => entry.status === 'clocked_in')
        setIsClockedIn(!!activeClock)
      } else if (timeError) {
        console.error('Error loading time entries:', timeError)
      }

      // Load job assignments - FIXED TABLE NAME
      const { data: jobsData, error: jobsError } = await supabase
        .from('enterprise_job_assignments')
        .select(`
          id,
          assigned_at,
          completed_at,
          notes,
          job:enterprise_jobs!enterprise_job_assignments_job_id_fkey (
            id,
            title,
            status,
            location,
            priority,
            due_date
          )
        `)
        .eq('employee_id', employeeId)
        .order('assigned_at', { ascending: false })
        .limit(50)

      if (!jobsError && jobsData) {
        setJobAssignments(jobsData.map((item: any) => ({
          id: item.id,
          job_id: item.job?.id || '',
          job_title: item.job?.title || 'Unknown Job',
          job_status: item.job?.status || 'unknown',
          job_location: item.job?.location || '',
          job_priority: item.job?.priority || 'medium',
          job_due_date: item.job?.due_date || null,
          assigned_at: item.assigned_at,
          completed_at: item.completed_at,
        })))
      } else if (jobsError) {
        console.error('Error loading job assignments:', jobsError)
      }

    } catch (error) {
      console.error('Error loading employee data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('You must be logged in')
        return
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const response = await fetch(`${supabaseUrl}/functions/v1/update-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          employeeId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          role: formData.role,
          employmentType: formData.employmentType,
          hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
          hireDate: formData.hireDate,
          canCreateJobs: formData.canCreateJobs,
          canViewAllJobs: formData.canViewAllJobs,
          canApproveExpenses: formData.canApproveExpenses,
          isActive: formData.isActive,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update employee')
      }

      alert('Employee updated successfully')
      setEditMode(false)
      loadEmployeeData()
    } catch (error: any) {
      console.error('Update error:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const calculateTotalHours = (entry: TimeEntry) => {
    if (!entry.clock_out_time) return 'Still clocked in'

    const clockIn = new Date(entry.clock_in_time)
    const clockOut = new Date(entry.clock_out_time)
    const hours = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60)

    return `${hours.toFixed(2)} hours`
  }

  // Calculate hours worked
  const calculateHoursInRange = (entries: TimeEntry[], startDate: Date, endDate: Date) => {
    return entries
      .filter(entry => {
        const clockIn = new Date(entry.clock_in_time)
        return clockIn >= startDate && clockIn <= endDate && entry.clock_out_time
      })
      .reduce((total, entry) => {
        const clockIn = new Date(entry.clock_in_time)
        const clockOut = new Date(entry.clock_out_time!)
        const hours = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60)
        return total + hours
      }, 0)
  }

  // Get time ranges
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const startOfToday = new Date(today)
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(today)
  endOfToday.setHours(23, 59, 59, 999)

  // Calculate totals
  const hoursToday = calculateHoursInRange(timeEntries, startOfToday, endOfToday)
  const hoursThisWeek = calculateHoursInRange(timeEntries, startOfWeek, endOfWeek)
  const hoursThisMonth = calculateHoursInRange(timeEntries, startOfMonth, endOfMonth)

  // Calculate total all time
  const totalHoursAllTime = timeEntries
    .filter(entry => entry.clock_out_time)
    .reduce((total, entry) => {
      const clockIn = new Date(entry.clock_in_time)
      const clockOut = new Date(entry.clock_out_time!)
      const hours = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60)
      return total + hours
    }, 0)

  // Calculate earnings
  const hourlyRate = employee?.hourly_rate || 0
  const earningsToday = hoursToday * hourlyRate
  const earningsThisWeek = hoursThisWeek * hourlyRate
  const earningsThisMonth = hoursThisMonth * hourlyRate
  const earningsAllTime = totalHoursAllTime * hourlyRate

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Employee not found</h1>
          <Link href="/dashboard" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {employee.first_name[0]}{employee.last_name[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {employee.first_name} {employee.last_name}
                  </h1>
                  <p className="text-gray-400">{employee.role}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Edit Details
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditMode(false)
                      loadEmployeeData()
                    }}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Employee Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">👤</span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <p className="text-white text-lg">{employee.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <p className="text-white text-lg">{employee.last_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
                  <p className="text-white text-lg">{employee.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <p className="text-white text-lg">{employee.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">💼</span>
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Role</label>
                  {editMode ? (
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    >
                      <option value="employee">Employee</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="manager">Manager</option>
                    </select>
                  ) : (
                    <span className="inline-block px-4 py-2 text-sm font-bold rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {employee.role}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Employment Type</label>
                  {editMode ? (
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    >
                      <option value="full_time">Full Time</option>
                      <option value="part_time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="temporary">Temporary</option>
                    </select>
                  ) : (
                    <p className="text-white text-lg capitalize">{employee.employment_type.replace('_', ' ')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Hourly Rate (£)</label>
                  {editMode ? (
                    <input
                      type="number"
                      step="0.01"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                      placeholder="15.50"
                    />
                  ) : (
                    <p className="text-white text-lg">
                      {employee.hourly_rate ? `£${employee.hourly_rate.toFixed(2)}/hour` : 'Not set'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Hire Date</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={formData.hireDate}
                      onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <p className="text-white text-lg">
                      {new Date(employee.hire_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Status</label>
                  {editMode ? (
                    <select
                      value={formData.isActive ? 'active' : 'inactive'}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      {employee.is_active ? (
                        <span className="inline-block px-4 py-2 text-sm font-bold rounded-xl bg-green-500/20 text-green-300 border border-green-500/30">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block mr-2"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-4 py-2 text-sm font-bold rounded-xl bg-gray-500/20 text-gray-400 border border-gray-500/30">
                          Inactive
                        </span>
                      )}
                      {isClockedIn && (
                        <span className="inline-block px-4 py-2 text-sm font-bold rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse inline-block mr-2"></span>
                          Currently Clocked In
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🔐</span>
                Permissions
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.canCreateJobs ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {formData.canCreateJobs ? '✓' : '×'}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Can Create Jobs</p>
                      <p className="text-sm text-gray-400">Allow employee to create new job assignments</p>
                    </div>
                  </div>
                  {editMode && (
                    <input
                      type="checkbox"
                      checked={formData.canCreateJobs}
                      onChange={(e) => setFormData({ ...formData, canCreateJobs: e.target.checked })}
                      className="w-6 h-6 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                  )}
                </label>

                <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.canViewAllJobs ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {formData.canViewAllJobs ? '✓' : '×'}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Can View All Jobs</p>
                      <p className="text-sm text-gray-400">Employee can see all company jobs</p>
                    </div>
                  </div>
                  {editMode && (
                    <input
                      type="checkbox"
                      checked={formData.canViewAllJobs}
                      onChange={(e) => setFormData({ ...formData, canViewAllJobs: e.target.checked })}
                      className="w-6 h-6 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                  )}
                </label>

                <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.canApproveExpenses ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {formData.canApproveExpenses ? '✓' : '×'}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Can Approve Expenses</p>
                      <p className="text-sm text-gray-400">Allow employee to approve expense claims</p>
                    </div>
                  </div>
                  {editMode && (
                    <input
                      type="checkbox"
                      checked={formData.canApproveExpenses}
                      onChange={(e) => setFormData({ ...formData, canApproveExpenses: e.target.checked })}
                      className="w-6 h-6 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                  )}
                </label>
              </div>
            </div>

            {/* Time Entries (Clock In/Out) */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">⏰</span>
                Time Entries
              </h2>
              {timeEntries.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No time entries recorded yet</p>
              ) : (
                <div className="space-y-4">
                  {timeEntries.map((entry) => (
                    <div key={entry.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Clock In</p>
                          <p className="text-white font-semibold">
                            {new Date(entry.clock_in_time).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          {entry.clock_in_address && (
                            <p className="text-xs text-gray-400 mt-1">
                              📍 {entry.clock_in_address}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1 font-mono">
                            {entry.clock_in_latitude.toFixed(6)}, {entry.clock_in_longitude.toFixed(6)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Clock Out</p>
                          {entry.clock_out_time ? (
                            <>
                              <p className="text-white font-semibold">
                                {new Date(entry.clock_out_time).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {entry.clock_out_address && (
                                <p className="text-xs text-gray-400 mt-1">
                                  📍 {entry.clock_out_address}
                                </p>
                              )}
                              {entry.clock_out_latitude && entry.clock_out_longitude && (
                                <p className="text-xs text-gray-500 mt-1 font-mono">
                                  {entry.clock_out_latitude.toFixed(6)}, {entry.clock_out_longitude.toFixed(6)}
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-yellow-400 font-semibold">Still clocked in</p>
                          )}
                        </div>
                        <div className="md:col-span-2 mt-4 pt-4 border-t border-white/10">
                          <p className="text-sm text-gray-400 mb-1">Total Hours</p>
                          <p className="text-white font-bold text-lg">
                            {entry.total_hours ? `${entry.total_hours.toFixed(2)} hours` : 'Still clocked in'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Job Assignments */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">📋</span>
                Job Assignments
              </h2>
              {jobAssignments.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No job assignments yet</p>
              ) : (
                <div className="space-y-4">
                  {jobAssignments.map((job) => (
                    <div key={job.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Link href={`/dashboard/jobs`} className="text-white font-bold text-lg mb-1 hover:text-primary transition-colors">
                            {job.job_title}
                          </Link>
                          {job.job_location && (
                            <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                              <span>📍</span> {job.job_location}
                            </p>
                          )}
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                          job.job_status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          job.job_status === 'in_progress' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          job.job_status === 'cancelled' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                          {job.job_status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 mb-1">Assigned</p>
                          <p className="text-white font-semibold">
                            {new Date(job.assigned_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        {job.job_due_date && (
                          <div>
                            <p className="text-gray-400 mb-1">Due Date</p>
                            <p className="text-white font-semibold">
                              {new Date(job.job_due_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-400 mb-1">Priority</p>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            job.job_priority === 'urgent' ? 'bg-red-500/20 text-red-300' :
                            job.job_priority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                            job.job_priority === 'medium' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {job.job_priority?.toUpperCase()}
                          </span>
                        </div>
                        {job.completed_at && (
                          <div>
                            <p className="text-gray-400 mb-1">Completed</p>
                            <p className="text-green-400 font-semibold">
                              {new Date(job.completed_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="space-y-8">
            {/* Hours Worked & Earnings */}
            <div className="bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent backdrop-blur-sm border border-green-500/20 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Hours & Earnings
              </h2>
              <div className="space-y-6">
                {/* Today */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-3">Today</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">{hoursToday.toFixed(2)}h</p>
                      <p className="text-xs text-gray-500 mt-1">hours worked</p>
                    </div>
                    {hourlyRate > 0 && (
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-400">£{earningsToday.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">earned</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* This Week */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-3">This Week</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">{hoursThisWeek.toFixed(2)}h</p>
                      <p className="text-xs text-gray-500 mt-1">hours worked</p>
                    </div>
                    {hourlyRate > 0 && (
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-400">£{earningsThisWeek.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">earned</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* This Month */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-400 mb-3">This Month</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">{hoursThisMonth.toFixed(2)}h</p>
                      <p className="text-xs text-gray-500 mt-1">hours worked</p>
                    </div>
                    {hourlyRate > 0 && (
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-400">£{earningsThisMonth.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">earned</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* All Time */}
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-4 border border-primary/30">
                  <p className="text-sm text-gray-400 mb-3">All Time Total</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-white">{totalHoursAllTime.toFixed(2)}h</p>
                      <p className="text-xs text-gray-500 mt-1">total hours</p>
                    </div>
                    {hourlyRate > 0 && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">£{earningsAllTime.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 mt-1">total earned</p>
                      </div>
                    )}
                  </div>
                </div>

                {hourlyRate === 0 && (
                  <p className="text-xs text-gray-500 text-center">Set hourly rate to see earnings</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Quick Stats</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Total Time Entries</p>
                  <p className="text-3xl font-black text-white">{timeEntries.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Total Job Assignments</p>
                  <p className="text-3xl font-black text-white">{jobAssignments.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Completed Jobs</p>
                  <p className="text-3xl font-black text-green-400">
                    {jobAssignments.filter(j => j.job_status === 'completed').length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Member Since</p>
                  <p className="text-white font-semibold">
                    {new Date(employee.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Account Info</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Employee ID</p>
                  <p className="text-white font-mono text-sm">{employee.id.slice(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">User ID</p>
                  <p className="text-white font-mono text-sm">{employee.user_id.slice(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Created</p>
                  <p className="text-white text-sm">
                    {new Date(employee.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
