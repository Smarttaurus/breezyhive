'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  description: string
  location: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date: string
  created_at: string
  assigned_employees: number
}

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
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

      setEnterpriseId(enterprise.id)

      // Load jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('enterprise_jobs')
        .select(`
          *,
          enterprise_job_assignments (
            id
          )
        `)
        .eq('enterprise_id', enterprise.id)
        .order('created_at', { ascending: false })

      if (jobsError) {
        console.error('Error loading jobs:', jobsError)
        alert(`Failed to load jobs: ${jobsError.message}`)
        throw jobsError
      }

      console.log('Jobs loaded successfully:', jobsData)

      const jobsWithCounts = jobsData?.map((job: any) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        status: job.status,
        priority: job.priority,
        due_date: job.due_date,
        created_at: job.created_at,
        assigned_employees: job.enterprise_job_assignments?.length || 0,
      })) || []

      setJobs(jobsWithCounts)
    } catch (error) {
      console.error('Error loading jobs:', error)
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
              <div>
                <h1 className="text-2xl font-bold text-white">Jobs Management</h1>
                <p className="text-gray-400">Create and manage your jobs</p>
              </div>
            </div>
            <Link
              href="/dashboard/jobs/create"
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
            >
              + Create New Job
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20">
            <p className="text-sm text-gray-400 mb-2">Total Jobs</p>
            <p className="text-4xl font-black text-white">{jobs.length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-500/5 rounded-2xl p-6 border border-yellow-500/20">
            <p className="text-sm text-gray-400 mb-2">Pending</p>
            <p className="text-4xl font-black text-yellow-400">
              {jobs.filter(j => j.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20">
            <p className="text-sm text-gray-400 mb-2">In Progress</p>
            <p className="text-4xl font-black text-blue-400">
              {jobs.filter(j => j.status === 'in_progress').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-600/10 to-green-500/5 rounded-2xl p-6 border border-green-500/20">
            <p className="text-sm text-gray-400 mb-2">Completed</p>
            <p className="text-4xl font-black text-green-400">
              {jobs.filter(j => j.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8">All Jobs</h2>

          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-white mb-2">No jobs yet</h3>
              <p className="text-gray-400 mb-6">Create your first job to get started</p>
              <Link
                href="/dashboard/jobs/create"
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Create Your First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/dashboard/jobs/${job.id}`}
                  className="block bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getStatusColor(job.status)}`}>
                          {job.status.replace('_', ' ')}
                        </span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {new Date(job.due_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {job.assigned_employees} assigned
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
