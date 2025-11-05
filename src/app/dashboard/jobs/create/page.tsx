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
  role: string
  is_active: boolean
}

export default function CreateJobPage() {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    estimatedHours: '',
    budget: '',
    notes: '',
    selectedEmployees: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
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

      // Load employees
      const { data: employeesData } = await supabase
        .from('enterprise_employees')
        .select('*')
        .eq('enterprise_id', enterprise.id)
        .eq('is_active', true)
        .order('first_name')

      if (employeesData) {
        setEmployees(employeesData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Job title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('=== JOB CREATION DEBUG ===')
    console.log('Form data:', formData)
    console.log('Enterprise ID:', enterpriseId)

    if (!validateForm()) {
      console.log('Form validation failed')
      return
    }

    if (!enterpriseId) {
      console.log('No enterprise ID')
      return
    }

    setSubmitting(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session:', session?.user?.id)

      if (!session) {
        alert('You must be logged in')
        return
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      console.log('Supabase URL:', supabaseUrl)
      console.log('Edge function URL:', `${supabaseUrl}/functions/v1/create-job`)

      const payload = {
        enterpriseId,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
        estimatedHours: formData.estimatedHours ? parseFloat(formData.estimatedHours) : null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        notes: formData.notes,
        assignedEmployees: formData.selectedEmployees,
      }

      console.log('Payload:', JSON.stringify(payload, null, 2))

      const response = await fetch(`${supabaseUrl}/functions/v1/create-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      const result = await response.json()
      console.log('Response data:', JSON.stringify(result, null, 2))

      if (!response.ok) {
        console.error('Response not OK. Error:', result)
        throw new Error(result.error || 'Failed to create job')
      }

      console.log('Job created successfully! Job ID:', result.job?.id)
      alert('Job created successfully!')
      router.push('/dashboard/jobs')
    } catch (error: any) {
      console.error('Error creating job:', error)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      alert(`Error: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleEmployee = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId]
    }))
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
              <h1 className="text-2xl font-bold text-white">Create New Job</h1>
              <p className="text-gray-400">Fill in the details below</p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📋</span>
              Basic Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  placeholder="e.g. Kitchen Renovation - 42 Oak Street"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  placeholder="Describe the job in detail..."
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-4">
                  Full Address <span className="text-red-400">*</span>
                </label>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Street Address
                    </div>
                    <input
                      type="text"
                      value={formData.location.split('\n')[0] || ''}
                      onChange={(e) => {
                        const lines = formData.location.split('\n')
                        lines[0] = e.target.value
                        setFormData({ ...formData, location: lines.join('\n') })
                      }}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="e.g. 123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        City
                      </div>
                      <input
                        type="text"
                        value={formData.location.split('\n')[1] || ''}
                        onChange={(e) => {
                          const lines = formData.location.split('\n')
                          lines[1] = e.target.value
                          setFormData({ ...formData, location: lines.join('\n') })
                        }}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                        placeholder="e.g. London"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        County/State
                      </div>
                      <input
                        type="text"
                        value={formData.location.split('\n')[2] || ''}
                        onChange={(e) => {
                          const lines = formData.location.split('\n')
                          lines[2] = e.target.value
                          setFormData({ ...formData, location: lines.join('\n') })
                        }}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                        placeholder="e.g. Greater London"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        Postcode/ZIP Code
                      </div>
                      <input
                        type="text"
                        value={formData.location.split('\n')[3] || ''}
                        onChange={(e) => {
                          const lines = formData.location.split('\n')
                          lines[3] = e.target.value
                          setFormData({ ...formData, location: lines.join('\n') })
                        }}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                        placeholder="e.g. SW1A 1AA"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        Country
                      </div>
                      <input
                        type="text"
                        value={formData.location.split('\n')[4] || ''}
                        onChange={(e) => {
                          const lines = formData.location.split('\n')
                          lines[4] = e.target.value
                          setFormData({ ...formData, location: lines.join('\n') })
                        }}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                        placeholder="e.g. United Kingdom"
                      />
                    </div>
                  </div>
                </div>
                {errors.location && <p className="text-red-400 text-sm mt-2">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              Job Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Due Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                />
                {errors.dueDate && <p className="text-red-400 text-sm mt-1">{errors.dueDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Estimated Hours</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  placeholder="e.g. 40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Budget (£)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  placeholder="e.g. 5000.00"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-white mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                placeholder="Any additional information or special instructions..."
              />
            </div>
          </div>

          {/* Assign Employees */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">👥</span>
              Assign Employees
            </h2>
            {employees.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No active employees found</p>
                <Link
                  href="/dashboard"
                  className="text-primary hover:underline"
                >
                  Add employees first →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {employees.map((employee) => (
                  <label
                    key={employee.id}
                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center text-white font-bold">
                        {employee.first_name[0]}{employee.last_name[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {employee.first_name} {employee.last_name}
                        </p>
                        <p className="text-sm text-gray-400">{employee.email}</p>
                      </div>
                      <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {employee.role}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.selectedEmployees.includes(employee.id)}
                      onChange={() => toggleEmployee(employee.id)}
                      className="w-6 h-6 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                  </label>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">
              {formData.selectedEmployees.length} employee{formData.selectedEmployees.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/dashboard/jobs"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating Job...' : 'Create Job'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
