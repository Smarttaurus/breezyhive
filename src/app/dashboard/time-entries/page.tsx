'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface TimeEntry {
  id: string;
  employee_id: string;
  enterprise_id: string;
  job_id: string | null;
  clock_in_time: string;
  clock_in_latitude: number;
  clock_in_longitude: number;
  clock_in_address: string | null;
  clock_out_time: string | null;
  clock_out_latitude: number | null;
  clock_out_longitude: number | null;
  clock_out_address: string | null;
  total_hours: number | null;
  status: 'clocked_in' | 'clocked_out';
  created_at: string;
  employee: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
  };
  job?: {
    title: string;
    location: string;
  };
}

export default function TimeEntriesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<TimeEntry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null)

  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'clocked_in' | 'clocked_out'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'all'>('7days')

  // Stats
  const [stats, setStats] = useState({
    totalEntries: 0,
    currentlyClockedIn: 0,
    totalHoursToday: 0,
    totalHoursThisWeek: 0,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (enterpriseId) {
      loadTimeEntries()
    }
  }, [enterpriseId])

  useEffect(() => {
    applyFilters()
  }, [timeEntries, statusFilter, searchQuery, dateRange])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/business/login')
        return
      }

      const { data: enterprise, error } = await supabase
        .from('enterprises')
        .select('id')
        .eq('tradesperson_id', user.id)
        .single()

      if (error || !enterprise) {
        console.error('No enterprise found:', error)
        router.push('/business/register')
        return
      }

      setEnterpriseId(enterprise.id)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/business/login')
    }
  }

  const loadTimeEntries = async () => {
    if (!enterpriseId) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('employee_time_entries')
        .select(`
          *,
          employee:enterprise_employees!employee_time_entries_employee_id_fkey (
            first_name,
            last_name,
            email,
            avatar_url
          ),
          job:enterprise_jobs!employee_time_entries_job_id_fkey (
            title,
            location
          )
        `)
        .eq('enterprise_id', enterpriseId)
        .order('clock_in_time', { ascending: false })

      if (error) throw error

      const entries: TimeEntry[] = (data || []).map(entry => ({
        ...entry,
        employee: Array.isArray(entry.employee) ? entry.employee[0] : entry.employee,
        job: Array.isArray(entry.job) ? entry.job[0] : entry.job,
      }))

      setTimeEntries(entries)
      calculateStats(entries)
    } catch (error) {
      console.error('Error loading time entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (entries: TimeEntry[]) => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const totalHoursToday = entries
      .filter(e => new Date(e.clock_in_time) >= todayStart && e.total_hours)
      .reduce((sum, e) => sum + (e.total_hours || 0), 0)

    const totalHoursThisWeek = entries
      .filter(e => new Date(e.clock_in_time) >= weekStart && e.total_hours)
      .reduce((sum, e) => sum + (e.total_hours || 0), 0)

    setStats({
      totalEntries: entries.length,
      currentlyClockedIn: entries.filter(e => e.status === 'clocked_in').length,
      totalHoursToday: parseFloat(totalHoursToday.toFixed(2)),
      totalHoursThisWeek: parseFloat(totalHoursThisWeek.toFixed(2)),
    })
  }

  const applyFilters = () => {
    let filtered = [...timeEntries]

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(e => {
        const employeeName = `${e.employee.first_name} ${e.employee.last_name}`.toLowerCase()
        const jobTitle = e.job?.title?.toLowerCase() || ''
        return employeeName.includes(query) || jobTitle.includes(query)
      })
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date()
      let cutoffDate: Date

      if (dateRange === 'today') {
        cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      } else if (dateRange === '7days') {
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      } else {
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      }

      filtered = filtered.filter(e => new Date(e.clock_in_time) >= cutoffDate)
    }

    setFilteredEntries(filtered)
  }

  const formatDuration = (hours: number | null): string => {
    if (!hours) return 'N/A'
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m}m`
  }

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatTime = (dateString: string | null): string => {
    if (!dateString) return 'Still clocked in'
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Employee',
      'Job',
      'Clock In',
      'Clock Out',
      'Total Hours',
      'Status',
      'Clock In Location',
      'Clock Out Location',
    ]

    const rows = filteredEntries.map(e => [
      new Date(e.clock_in_time).toLocaleDateString('en-GB'),
      `${e.employee.first_name} ${e.employee.last_name}`,
      e.job?.title || 'N/A',
      formatTime(e.clock_in_time),
      formatTime(e.clock_out_time),
      e.total_hours?.toFixed(2) || 'N/A',
      e.status,
      e.clock_in_address || 'N/A',
      e.clock_out_address || 'N/A',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `time-entries-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading time entries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">⏰ Time Entries</h1>
              <p className="text-gray-400">Track employee clock in/out times and locations</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={exportToCSV}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-600/30"
              >
                📥 Export CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent rounded-2xl p-4 border border-blue-500/20">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.totalEntries}</div>
              <div className="text-sm text-gray-400">Total Entries</div>
            </div>
            <div className="bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent rounded-2xl p-4 border border-green-500/20">
              <div className="text-2xl mb-1">🟢</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.currentlyClockedIn}</div>
              <div className="text-sm text-gray-400">Currently Clocked In</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent rounded-2xl p-4 border border-orange-500/20">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.totalHoursToday.toFixed(1)}h</div>
              <div className="text-sm text-gray-400">Hours Today</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/10 via-purple-500/5 to-transparent rounded-2xl p-4 border border-purple-500/20">
              <div className="text-2xl mb-1">📈</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.totalHoursThisWeek.toFixed(1)}h</div>
              <div className="text-sm text-gray-400">Hours This Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                <option value="all" className="bg-gray-800">All Statuses</option>
                <option value="clocked_in" className="bg-gray-800">Clocked In</option>
                <option value="clocked_out" className="bg-gray-800">Clocked Out</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                <option value="today" className="bg-gray-800">Today</option>
                <option value="7days" className="bg-gray-800">Last 7 Days</option>
                <option value="30days" className="bg-gray-800">Last 30 Days</option>
                <option value="all" className="bg-gray-800">All Time</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Search</label>
              <input
                type="text"
                placeholder="Employee or job..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-400">
          Showing {filteredEntries.length} of {timeEntries.length} entries
        </div>

        {/* Time Entries Table */}
        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Job</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Clock In</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Clock Out</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      No time entries found
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm">
                            {entry.employee.first_name[0]}{entry.employee.last_name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {entry.employee.first_name} {entry.employee.last_name}
                            </div>
                            <div className="text-xs text-gray-400">{entry.employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {entry.job?.title || 'No job assigned'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{formatTime(entry.clock_in_time)}</div>
                        <div className="text-xs text-gray-400">{new Date(entry.clock_in_time).toLocaleDateString('en-GB')}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white">{formatTime(entry.clock_out_time)}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        {formatDuration(entry.total_hours)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          entry.status === 'clocked_in'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {entry.status === 'clocked_in' ? '🟢 Clocked In' : '⚪ Clocked Out'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedEntry(entry)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600/20 via-green-500/10 to-transparent border-b border-green-500/20 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">⏰ Time Entry Details</h2>
                  <p className="text-gray-400">
                    {selectedEntry.employee.first_name} {selectedEntry.employee.last_name} - {formatDateTime(selectedEntry.clock_in_time)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
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
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedEntry.status === 'clocked_in'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                }`}>
                  {selectedEntry.status === 'clocked_in' ? '🟢 CLOCKED IN' : '⚪ CLOCKED OUT'}
                </span>
                {selectedEntry.job && (
                  <span className="text-gray-400 text-sm">
                    Job: <span className="text-white font-semibold">{selectedEntry.job.title}</span>
                  </span>
                )}
              </div>

              {/* Duration */}
              {selectedEntry.total_hours && (
                <div className="bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent rounded-2xl p-6 border border-green-500/20">
                  <div className="text-sm text-gray-400 mb-2">Total Duration</div>
                  <div className="text-4xl font-bold text-white">
                    {formatDuration(selectedEntry.total_hours)}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">{selectedEntry.total_hours.toFixed(2)} hours</div>
                </div>
              )}

              {/* Clock In/Out Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Clock In */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-green-400 mb-4">🟢 Clock In</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Time</div>
                      <div className="text-white font-semibold">{formatDateTime(selectedEntry.clock_in_time)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Location</div>
                      <div className="text-white text-sm">{selectedEntry.clock_in_address || 'Address unavailable'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Coordinates</div>
                      <div className="text-white text-sm font-mono">
                        {selectedEntry.clock_in_latitude.toFixed(6)}, {selectedEntry.clock_in_longitude.toFixed(6)}
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${selectedEntry.clock_in_latitude},${selectedEntry.clock_in_longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all mt-2"
                    >
                      📍 View on Map
                    </a>
                  </div>
                </div>

                {/* Clock Out */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-gray-400 mb-4">⚪ Clock Out</h3>
                  {selectedEntry.clock_out_time ? (
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Time</div>
                        <div className="text-white font-semibold">{formatDateTime(selectedEntry.clock_out_time)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Location</div>
                        <div className="text-white text-sm">{selectedEntry.clock_out_address || 'Address unavailable'}</div>
                      </div>
                      {selectedEntry.clock_out_latitude && selectedEntry.clock_out_longitude && (
                        <>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Coordinates</div>
                            <div className="text-white text-sm font-mono">
                              {selectedEntry.clock_out_latitude.toFixed(6)}, {selectedEntry.clock_out_longitude.toFixed(6)}
                            </div>
                          </div>
                          <a
                            href={`https://www.google.com/maps?q=${selectedEntry.clock_out_latitude},${selectedEntry.clock_out_longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-all mt-2"
                          >
                            📍 View on Map
                          </a>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">⏳</div>
                      <div>Still clocked in</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Map Preview */}
              {selectedEntry.clock_in_latitude && selectedEntry.clock_in_longitude && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">📍 Location Map</h3>
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${selectedEntry.clock_in_latitude},${selectedEntry.clock_in_longitude}&zoom=15`}
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <div className="text-xs text-gray-400">Clock In Location</div>
                      <div className="text-sm text-white font-semibold">{selectedEntry.clock_in_address}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent border-t border-gray-700/50 px-8 py-6">
              <button
                onClick={() => setSelectedEntry(null)}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
