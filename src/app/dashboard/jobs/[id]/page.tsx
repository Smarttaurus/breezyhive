'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Job {
  id: string
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

      // Load job details
      const { data: jobData, error: jobError } = await supabase
        .from('enterprise_jobs')
        .select('*')
        .eq('id', jobId)
        .single()

      if (jobError) {
        console.error('Error loading job:', jobError)
        router.push('/dashboard/jobs')
        return
      }

      setJob(jobData)
      setOriginalJob(JSON.parse(JSON.stringify(jobData)))

      // Load assigned employees
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('enterprise_job_assignments')
        .select(`
          employee_id,
          enterprise_employees (
            id,
            first_name,
            last_name,
            email,
            role,
            phone_number
          )
        `)
        .eq('job_id', jobId)

      if (!assignmentsError && assignmentsData) {
        const employees = assignmentsData
          .map((a: any) => a.enterprise_employees)
          .filter(Boolean)
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
      alert('Changes saved successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/40'
      case 'in_progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/40'
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/40'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/40'
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/40'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/40'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40'
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
          <p className="text-xl text-gray-300 font-medium">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Job not found</h2>
          <Link href="/dashboard/jobs" className="text-primary hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <div className="bg-black/60 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <Link href="/dashboard/jobs" className="text-gray-400 hover:text-white text-sm mb-3 inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
          <div className="flex items-center justify-between mt-3">
            <div className="flex-1">
              <input
                type="text"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                className="text-5xl font-black text-white tracking-tight mb-2 bg-transparent border-b-2 border-transparent hover:border-primary/30 focus:border-primary focus:outline-none transition-all w-full"
                placeholder="Job Title"
              />
              <div className="flex items-center gap-3">
                <select
                  value={job.status}
                  onChange={(e) => setJob({ ...job, status: e.target.value as any })}
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border cursor-pointer ${getStatusColor(job.status)} bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50`}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={job.priority}
                  onChange={(e) => setJob({ ...job, priority: e.target.value as any })}
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border cursor-pointer ${getPriorityColor(job.priority)} bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            {hasChanges && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-4 bg-gradient-to-r from-green-500 via-green-500 to-green-600 hover:from-green-600 hover:via-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-2xl font-black text-lg transition-all shadow-2xl shadow-green-500/20 flex items-center gap-3 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    SAVING...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    SAVE CHANGES
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
          {/* Left Column - Job Details (3/5) */}
          <div className="xl:col-span-3 space-y-8">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">
              <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Job Description</h2>
              <textarea
                value={job.description}
                onChange={(e) => setJob({ ...job, description: e.target.value })}
                rows={6}
                className="w-full text-gray-200 text-lg leading-relaxed bg-transparent border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-primary resize-none"
                placeholder="Describe the job..."
              />
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent rounded-3xl border border-blue-500/20 p-8">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-black text-blue-400 uppercase tracking-widest">Location</div>
                      <div className="text-xs text-gray-400 mt-0.5">Job site address</div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={job.location}
                    onChange={(e) => setJob({ ...job, location: e.target.value })}
                    className="w-full text-2xl font-black text-white bg-transparent border-b-2 border-transparent hover:border-blue-400/30 focus:border-blue-400 focus:outline-none transition-all"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-black text-purple-400 uppercase tracking-widest">Due Date</div>
                    <div className="text-xs text-gray-400 mt-0.5">Deadline</div>
                  </div>
                </div>
                <input
                  type="date"
                  value={job.due_date.split('T')[0]}
                  onChange={(e) => setJob({ ...job, due_date: e.target.value })}
                  className="w-full text-2xl font-black text-white bg-transparent border-b-2 border-transparent hover:border-purple-400/30 focus:border-purple-400 focus:outline-none transition-all"
                />
              </div>

              {/* Estimated Hours */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">Est. Hours</div>
                    <div className="text-xs text-gray-400 mt-0.5">Time estimate</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={job.estimated_hours || ''}
                    onChange={(e) => setJob({ ...job, estimated_hours: e.target.value ? parseFloat(e.target.value) : null })}
                    className="flex-1 text-2xl font-black text-white bg-transparent border-b-2 border-transparent hover:border-cyan-400/30 focus:border-cyan-400 focus:outline-none transition-all"
                    placeholder="0"
                  />
                  <span className="text-2xl font-black text-white">h</span>
                </div>
              </div>

              {/* Budget */}
              <div className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent rounded-3xl border border-green-500/20 p-8">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">💰</span>
                    </div>
                    <div>
                      <div className="text-xs font-black text-green-400 uppercase tracking-widest">Budget</div>
                      <div className="text-xs text-gray-400 mt-0.5">Allocated funds</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black text-white">£</span>
                    <input
                      type="number"
                      step="0.01"
                      value={job.budget || ''}
                      onChange={(e) => setJob({ ...job, budget: e.target.value ? parseFloat(e.target.value) : null })}
                      className="flex-1 text-4xl font-black text-white bg-transparent border-b-2 border-transparent hover:border-green-400/30 focus:border-green-400 focus:outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">
              <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Additional Notes</h2>
              <textarea
                value={job.notes || ''}
                onChange={(e) => setJob({ ...job, notes: e.target.value })}
                rows={4}
                className="w-full text-gray-200 text-lg leading-relaxed bg-transparent border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-primary resize-none"
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          {/* Right Column - Team & Timeline (2/5) */}
          <div className="xl:col-span-2 space-y-8">
            {/* Assigned Team */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Assigned Team</h2>
                  <p className="text-xs text-gray-400">{assignedEmployees.length} member{assignedEmployees.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {assignedEmployees.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-semibold">No employees assigned</p>
                  <Link
                    href={`/dashboard/jobs/${jobId}/edit`}
                    className="inline-block mt-4 text-primary hover:text-primary/80 text-sm font-bold"
                  >
                    Assign Team Members →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignedEmployees.map((employee) => (
                    <a
                      key={employee.id}
                      href={`mailto:${employee.email}`}
                      className="block bg-white/5 hover:bg-white/10 rounded-2xl p-5 border border-white/10 transition-all hover:border-primary/30 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                          {employee.first_name[0]}{employee.last_name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-black text-lg truncate group-hover:text-primary transition-colors">
                            {employee.first_name} {employee.last_name}
                          </p>
                          <p className="text-sm text-gray-400 truncate">{employee.email}</p>
                          {employee.phone_number && (
                            <p className="text-sm text-gray-500 truncate">{employee.phone_number}</p>
                          )}
                        </div>
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                          {employee.role}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Timeline</h2>
                  <p className="text-xs text-gray-400">Activity history</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Created</div>
                  <div className="text-white font-bold text-lg">
                    {new Date(job.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(job.created_at).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Last Updated</div>
                  <div className="text-white font-bold text-lg">
                    {new Date(job.updated_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
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
    </div>
  )
}
