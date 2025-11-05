'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Job {
  id: string
  enterprise_id: string
  title: string
  description: string
  location: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date: string
  estimated_hours: number | null
  budget: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

interface Employee {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  phone_number?: string
}

export default function JobDetailPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params?.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [job, setJob] = useState<Job | null>(null)
  const [originalJob, setOriginalJob] = useState<Job | null>(null)
  const [assignedEmployees, setAssignedEmployees] = useState<Employee[]>([])
  const [allEmployees, setAllEmployees] = useState<Employee[]>([])
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (jobId) {
      loadJobDetails()
    }
  }, [jobId])

  useEffect(() => {
    if (job && originalJob) {
      const changed = JSON.stringify(job) !== JSON.stringify(originalJob)
      setHasChanges(changed)
    }
  }, [job, originalJob])

  const loadJobDetails = async () => {
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

      // Load job details
      const { data: jobData, error: jobError } = await supabase
        .from('enterprise_jobs')
        .select('*')
        .eq('id', jobId)
        .eq('enterprise_id', enterprise.id)
        .single()

      if (jobError) {
        console.error('Error loading job:', jobError)
        router.push('/dashboard/jobs')
        return
      }

      setJob(jobData)
      setOriginalJob(JSON.parse(JSON.stringify(jobData)))

      // Load all employees for this enterprise
      const { data: allEmployeesData } = await supabase
        .from('enterprise_employees')
        .select('*')
        .eq('enterprise_id', enterprise.id)
        .eq('is_active', true)
        .order('first_name')

      if (allEmployeesData) {
        setAllEmployees(allEmployeesData)
      }

      // Load assigned employees - get assignment IDs first
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('enterprise_job_assignments')
        .select('employee_id')
        .eq('job_id', jobId)

      console.log('Assignments data:', assignmentsData)
      console.log('Assignments error:', assignmentsError)

      if (assignmentsData && allEmployeesData) {
        const assignedEmployeeIds = assignmentsData.map((a: any) => a.employee_id)
        console.log('Assigned employee IDs:', assignedEmployeeIds)

        const employees = allEmployeesData.filter((emp: Employee) =>
          assignedEmployeeIds.includes(emp.id)
        )
        console.log('Filtered assigned employees:', employees)
        setAssignedEmployees(employees)
      }

    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!job) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('enterprise_jobs')
        .update({
          title: job.title,
          description: job.description,
          location: job.location,
          status: job.status,
          priority: job.priority,
          due_date: job.due_date,
          estimated_hours: job.estimated_hours,
          budget: job.budget,
          notes: job.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)

      if (error) {
        console.error('Error saving job:', error)
        alert('Failed to save changes')
        return
      }

      setOriginalJob(JSON.parse(JSON.stringify(job)))
      setHasChanges(false)

      // Show success message briefly
      const temp = document.createElement('div')
      temp.className = 'fixed top-8 right-8 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl z-50 animate-in slide-in-from-top'
      temp.textContent = '✓ Changes saved successfully!'
      document.body.appendChild(temp)
      setTimeout(() => temp.remove(), 3000)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleEmployee = async (employeeId: string) => {
    const isAssigned = assignedEmployees.some(e => e.id === employeeId)

    try {
      if (isAssigned) {
        // Remove assignment
        await supabase
          .from('enterprise_job_assignments')
          .delete()
          .eq('job_id', jobId)
          .eq('employee_id', employeeId)

        setAssignedEmployees(assignedEmployees.filter(e => e.id !== employeeId))
      } else {
        // Add assignment
        await supabase
          .from('enterprise_job_assignments')
          .insert({
            job_id: jobId,
            employee_id: employeeId,
            assigned_at: new Date().toISOString()
          })

        const employee = allEmployees.find(e => e.id === employeeId)
        if (employee) {
          setAssignedEmployees([...assignedEmployees, employee])
        }
      }
    } catch (error) {
      console.error('Error toggling employee:', error)
      alert('Failed to update team assignment')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500/20 to-green-600/10 text-green-300 border-green-500/40 shadow-green-500/20'
      case 'in_progress': return 'from-blue-500/20 to-blue-600/10 text-blue-300 border-blue-500/40 shadow-blue-500/20'
      case 'pending': return 'from-yellow-500/20 to-yellow-600/10 text-yellow-300 border-yellow-500/40 shadow-yellow-500/20'
      case 'cancelled': return 'from-red-500/20 to-red-600/10 text-red-300 border-red-500/40 shadow-red-500/20'
      default: return 'from-gray-500/20 to-gray-600/10 text-gray-300 border-gray-500/40 shadow-gray-500/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'from-red-500/20 to-red-600/10 text-red-300 border-red-500/40 shadow-red-500/20'
      case 'high': return 'from-orange-500/20 to-orange-600/10 text-orange-300 border-orange-500/40 shadow-orange-500/20'
      case 'medium': return 'from-yellow-500/20 to-yellow-600/10 text-yellow-300 border-yellow-500/40 shadow-yellow-500/20'
      case 'low': return 'from-green-500/20 to-green-600/10 text-green-300 border-green-500/40 shadow-green-500/20'
      default: return 'from-gray-500/20 to-gray-600/10 text-gray-300 border-gray-500/40 shadow-gray-500/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-2xl text-white font-black">Loading job details...</p>
          <p className="text-gray-400 mt-2">Please wait</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h2 className="text-4xl font-black text-white mb-4">Job not found</h2>
          <p className="text-gray-400 mb-8">The job you're looking for doesn't exist</p>
          <Link
            href="/dashboard/jobs"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl font-black hover:shadow-2xl hover:shadow-primary/30 transition-all"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      {/* Gradient Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="relative bg-black/40 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-10 py-8">
          <Link href="/dashboard/jobs" className="text-gray-400 hover:text-white text-sm mb-4 inline-flex items-center gap-2 transition-all hover:gap-3 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>

          <div className="flex items-start justify-between gap-8 mt-4">
            <div className="flex-1 space-y-4">
              <input
                type="text"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                className="text-6xl font-black text-white tracking-tight bg-transparent border-b-4 border-transparent hover:border-primary/20 focus:border-primary focus:outline-none transition-all w-full placeholder-gray-700"
                placeholder="Enter job title..."
              />

              <div className="flex items-center gap-4 flex-wrap">
                <select
                  value={job.status}
                  onChange={(e) => setJob({ ...job, status: e.target.value as any })}
                  className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border-2 cursor-pointer bg-gradient-to-r ${getStatusColor(job.status)} hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all shadow-lg`}
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in_progress">⚡ In Progress</option>
                  <option value="completed">✓ Completed</option>
                  <option value="cancelled">✕ Cancelled</option>
                </select>

                <select
                  value={job.priority}
                  onChange={(e) => setJob({ ...job, priority: e.target.value as any })}
                  className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border-2 cursor-pointer bg-gradient-to-r ${getPriorityColor(job.priority)} hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all shadow-lg`}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🟠 High</option>
                  <option value="urgent">🔴 Urgent</option>
                </select>
              </div>
            </div>

            {hasChanges && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-10 py-5 bg-gradient-to-r from-green-500 via-green-500 to-emerald-600 hover:from-green-600 hover:via-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-3xl font-black text-xl uppercase tracking-wider transition-all shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-4 group"
              >
                {saving ? (
                  <>
                    <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-[1800px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Left Column - Job Details (2/3) */}
          <div className="xl:col-span-2 space-y-10">
            {/* Description */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-white/10 p-10 shadow-2xl hover:shadow-primary/10 transition-all group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">Job Description</h2>
                    <p className="text-sm text-gray-400 mt-1">What needs to be done</p>
                  </div>
                </div>
                <textarea
                  value={job.description}
                  onChange={(e) => setJob({ ...job, description: e.target.value })}
                  rows={8}
                  className="w-full text-gray-200 text-lg leading-relaxed bg-black/20 border-2 border-white/10 rounded-3xl p-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 resize-none transition-all placeholder-gray-600"
                  placeholder="Describe the job in detail..."
                />
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-blue-500/30 p-10 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-black text-blue-300 uppercase tracking-widest">Location</div>
                      <div className="text-xs text-gray-400 mt-1">Job site address</div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={job.location}
                    onChange={(e) => setJob({ ...job, location: e.target.value })}
                    className="w-full text-2xl font-black text-white bg-transparent border-b-4 border-transparent hover:border-blue-400/40 focus:border-blue-400 focus:outline-none transition-all placeholder-gray-700"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-purple-500/30 p-10 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-purple-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-black text-purple-300 uppercase tracking-widest">Due Date</div>
                      <div className="text-xs text-gray-400 mt-1">Deadline</div>
                    </div>
                  </div>
                  <input
                    type="date"
                    value={job.due_date.split('T')[0]}
                    onChange={(e) => setJob({ ...job, due_date: e.target.value })}
                    className="w-full text-2xl font-black text-white bg-transparent border-b-4 border-transparent hover:border-purple-400/40 focus:border-purple-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Estimated Hours */}
              <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/15 via-cyan-500/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-cyan-500/30 p-10 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-cyan-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <svg className="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-black text-cyan-300 uppercase tracking-widest">Est. Hours</div>
                      <div className="text-xs text-gray-400 mt-1">Time estimate</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.5"
                      value={job.estimated_hours || ''}
                      onChange={(e) => setJob({ ...job, estimated_hours: e.target.value ? parseFloat(e.target.value) : null })}
                      className="flex-1 text-4xl font-black text-white bg-transparent border-b-4 border-transparent hover:border-cyan-400/40 focus:border-cyan-400 focus:outline-none transition-all placeholder-gray-700"
                      placeholder="0"
                    />
                    <span className="text-4xl font-black text-cyan-300">hrs</span>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="relative overflow-hidden bg-gradient-to-br from-green-500/15 via-green-500/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-green-500/30 p-10 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <span className="text-4xl">💰</span>
                    </div>
                    <div>
                      <div className="text-sm font-black text-green-300 uppercase tracking-widest">Budget</div>
                      <div className="text-xs text-gray-400 mt-1">Allocated funds</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black text-green-300">£</span>
                    <input
                      type="number"
                      step="0.01"
                      value={job.budget || ''}
                      onChange={(e) => setJob({ ...job, budget: e.target.value ? parseFloat(e.target.value) : null })}
                      className="flex-1 text-4xl font-black text-white bg-transparent border-b-4 border-transparent hover:border-green-400/40 focus:border-green-400 focus:outline-none transition-all placeholder-gray-700"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-white/10 p-10 shadow-2xl hover:shadow-primary/10 transition-all group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">Additional Notes</h2>
                    <p className="text-sm text-gray-400 mt-1">Extra information</p>
                  </div>
                </div>
                <textarea
                  value={job.notes || ''}
                  onChange={(e) => setJob({ ...job, notes: e.target.value })}
                  rows={5}
                  className="w-full text-gray-200 text-lg leading-relaxed bg-black/20 border-2 border-white/10 rounded-3xl p-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 resize-none transition-all placeholder-gray-600"
                  placeholder="Add any additional notes or special instructions..."
                />
              </div>
            </div>
          </div>

          {/* Right Column - Team & Timeline (1/3) */}
          <div className="space-y-10">
            {/* Assigned Team */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-white/10 p-10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">👥</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">Team</h2>
                    <p className="text-sm text-gray-400 mt-1">{assignedEmployees.length} assigned</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEmployeeModal(!showEmployeeModal)}
                  className="p-4 bg-primary/20 hover:bg-primary/30 rounded-2xl transition-all hover:scale-110 border border-primary/30 shadow-lg shadow-primary/20"
                >
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              {assignedEmployees.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-bold text-lg mb-2">No team members assigned</p>
                  <p className="text-gray-500 text-sm">Click the + button to assign employees</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignedEmployees.map((employee) => (
                    <a
                      key={employee.id}
                      href={`mailto:${employee.email}`}
                      className="block bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 rounded-2xl p-6 border border-white/20 transition-all hover:border-primary/50 hover:scale-[1.02] cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-primary/20"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/30 group-hover:shadow-primary/50 group-hover:scale-110 transition-all">
                          {employee.first_name[0]}{employee.last_name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-black text-xl truncate group-hover:text-primary transition-colors">
                            {employee.first_name} {employee.last_name}
                          </p>
                          <p className="text-sm text-gray-400 truncate">{employee.email}</p>
                          {employee.phone_number && (
                            <p className="text-sm text-gray-500 truncate mt-1">{employee.phone_number}</p>
                          )}
                          <div className="flex items-center gap-2 mt-3">
                            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-xl">
                              <span className="text-xs font-black text-blue-300 uppercase tracking-wider">
                                {employee.role}
                              </span>
                            </div>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-[2rem] border border-white/10 p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider">Timeline</h2>
                  <p className="text-sm text-gray-400 mt-1">Activity history</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 border-l-4 border-green-500/30">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-green-500 rounded-full -translate-x-[10px] shadow-lg shadow-green-500/50"></div>
                  <div className="text-xs font-black text-green-400 uppercase tracking-widest mb-2">Created</div>
                  <div className="text-white font-black text-2xl">
                    {new Date(job.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(job.created_at).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="relative pl-8 border-l-4 border-blue-500/30">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[10px] shadow-lg shadow-blue-500/50"></div>
                  <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">Last Updated</div>
                  <div className="text-white font-black text-2xl">
                    {new Date(job.updated_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(job.updated_at).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Employee Assignment Modal */}
      {showEmployeeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setShowEmployeeModal(false)}
        >
          <div
            className="bg-[#0a0e1a] rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/20 px-10 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-wider mb-2">Manage Team</h2>
                  <p className="text-gray-400">Assign or remove employees from this job</p>
                </div>
                <button
                  onClick={() => setShowEmployeeModal(false)}
                  className="p-4 hover:bg-white/10 rounded-2xl transition-all hover:rotate-90 group"
                >
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-10" style={{ maxHeight: 'calc(80vh - 140px)' }}>
              {allEmployees.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">👥</div>
                  <h3 className="text-3xl font-black text-white mb-4">No employees found</h3>
                  <p className="text-gray-400 mb-8">Add employees to your enterprise first</p>
                  <Link
                    href="/dashboard"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl font-black hover:shadow-2xl hover:shadow-primary/30 transition-all"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {allEmployees.map((employee) => {
                    const isAssigned = assignedEmployees.some(e => e.id === employee.id)
                    return (
                      <button
                        key={employee.id}
                        onClick={() => handleToggleEmployee(employee.id)}
                        className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                          isAssigned
                            ? 'bg-gradient-to-r from-primary/20 to-accent/10 border-primary/50 shadow-lg shadow-primary/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-all ${
                            isAssigned
                              ? 'bg-gradient-to-br from-primary to-accent scale-110'
                              : 'bg-gradient-to-br from-gray-600 to-gray-700'
                          }`}>
                            {employee.first_name[0]}{employee.last_name[0]}
                          </div>
                          <div className="text-left">
                            <p className="text-white font-black text-xl">
                              {employee.first_name} {employee.last_name}
                            </p>
                            <p className="text-sm text-gray-400">{employee.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-xl">
                                <span className="text-xs font-black text-blue-300 uppercase tracking-wider">
                                  {employee.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-xl border-4 flex items-center justify-center transition-all ${
                          isAssigned
                            ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                            : 'bg-transparent border-white/30'
                        }`}>
                          {isAssigned && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
