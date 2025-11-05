'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getApproximateLocation } from '@/utils/locationUtils'

interface PublicJob {
  id: string
  title: string
  description: string
  location_address: string
  city: string
  postcode: string
  country?: string
  budget_min: number | null
  budget_max: number | null
  category: string
  urgency: string
  status: string
  created_at: string
  customer_id: string
}

export default function MarketplacePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<PublicJob[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedJob, setSelectedJob] = useState<PublicJob | null>(null)

  useEffect(() => {
    loadPublicJobs()
  }, [])

  const loadPublicJobs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/business/login')
        return
      }

      // Load public jobs from the 'jobs' table (posted by homeowners/customers)
      const { data: jobsData, error } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          description,
          location_address,
          city,
          postcode,
          country,
          budget_min,
          budget_max,
          category,
          urgency,
          status,
          created_at,
          customer_id
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error loading jobs:', error)
      } else {
        setJobs(jobsData as any || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.location_address || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(jobs.map(j => j.category)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Loading marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
              <h1 className="text-4xl font-black text-white">🏪 Job Marketplace</h1>
              <p className="text-gray-400 mt-2">Browse public jobs posted by homeowners</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Available Jobs</div>
            <div className="text-3xl font-bold text-white">{jobs.length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Categories</div>
            <div className="text-3xl font-bold text-blue-400">{categories.length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Filtered Results</div>
            <div className="text-3xl font-bold text-green-400">{filteredJobs.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No jobs found</h3>
            <p className="text-gray-400">
              {searchQuery || categoryFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No public jobs available at the moment'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    job.urgency === 'urgent' ? 'bg-red-500/20 text-red-300' :
                    job.urgency === 'high' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {job.urgency}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{job.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>📍</span>
                    <span>{getApproximateLocation(job.postcode, job.country || 'GB')}</span>
                    <span className="text-xs text-gray-500">(Approximate area)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>🏷️</span>
                    <span>{job.category}</span>
                  </div>
                  {(job.budget_min || job.budget_max) && (
                    <div className="flex items-center gap-2 text-sm text-green-400 font-semibold">
                      <span>💰</span>
                      <span>
                        £{job.budget_min || 0} - £{job.budget_max || 0}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-500 mb-3">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </div>
                  <Link
                    href={`/dashboard/marketplace/submit-quote/${job.id}`}
                    className="block w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/20 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                  <p className="text-gray-400">Posted {new Date(selectedJob.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-8 space-y-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {/* Budget */}
              <div className="bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent rounded-2xl p-6 border border-green-500/20">
                <div className="text-sm text-gray-400 mb-2">Budget Range</div>
                <div className="text-4xl font-bold text-white">
                  £{selectedJob.budget_min || 0} - £{selectedJob.budget_max || 0}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-sm font-semibold text-gray-400 mb-3">Description</div>
                <div className="text-white text-base leading-relaxed">{selectedJob.description}</div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Location (Approximate)</div>
                  <div className="text-white font-semibold">{getApproximateLocation(selectedJob.postcode, selectedJob.country || 'GB')}</div>
                  <div className="text-xs text-gray-500 mt-1">📍 Exact location revealed after payment</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Category</div>
                  <div className="text-white font-semibold">{selectedJob.category}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Urgency</div>
                  <div className={`font-semibold ${
                    selectedJob.urgency === 'urgent' ? 'text-red-400' :
                    selectedJob.urgency === 'high' ? 'text-orange-400' :
                    'text-blue-400'
                  }`}>
                    {selectedJob.urgency?.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent border-t border-gray-700/50 px-8 py-6">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
                >
                  Close
                </button>
                <Link
                  href={`/dashboard/marketplace/submit-quote/${selectedJob.id}`}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-xl font-semibold transition-all shadow-lg shadow-primary/30 inline-block"
                >
                  Submit Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
