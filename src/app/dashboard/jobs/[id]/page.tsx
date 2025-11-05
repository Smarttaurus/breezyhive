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
}

interface JobAssignment {
  employee_id: string
  enterprise_employees: Employee
}

export default function JobDetailPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params?.id as string

  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState<Job | null>(null)
  const [assignedEmployees, setAssignedEmployees] = useState<Employee[]>([])

  useEffect(() => {
    if (jobId) {
      loadJobDetails()
    }
  }, [jobId])

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
            role
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'in_progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard/jobs"
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                <p className="text-gray-400">Job Details</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 text-sm font-bold rounded-lg border ${getStatusColor(job.status)}`}>
                {job.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className={`px-4 py-2 text-sm font-bold rounded-lg border ${getPriorityColor(job.priority)}`}>
                {job.priority.toUpperCase()}
              </span>
              <Link
                href={`/dashboard/jobs/${jobId}/edit`}
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Job
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📋</span>
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Additional Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-gray-400 mb-1">Location</div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-gray-400 mb-1">Due Date</div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(job.due_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {job.estimated_hours && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Estimated Hours</div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.estimated_hours}h
                    </div>
                  </div>
                )}

                {job.budget && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-gray-400 mb-1">Budget</div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      £{job.budget.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {job.notes && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  Additional Notes
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column - Assigned Employees */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">👥</span>
                Assigned Employees
              </h2>
              {assignedEmployees.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No employees assigned yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignedEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                          {employee.first_name[0]}{employee.last_name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">
                            {employee.first_name} {employee.last_name}
                          </p>
                          <p className="text-sm text-gray-400 truncate">{employee.email}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {employee.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  Total: {assignedEmployees.length} employee{assignedEmployees.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">🕐</span>
                Timeline
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Created</div>
                  <div className="text-white font-semibold">
                    {new Date(job.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Last Updated</div>
                  <div className="text-white font-semibold">
                    {new Date(job.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
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
