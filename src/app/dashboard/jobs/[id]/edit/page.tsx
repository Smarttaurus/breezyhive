'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
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

export default function EditJobPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params?.id as string

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
    dueDate: '',
    estimatedHours: '',
    budget: '',
    notes: '',
    selectedEmployees: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (jobId) {
      loadData()
    }
  }, [jobId])

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

      // Load job data
      const { data: jobData, error: jobError } = await supabase
        .from('enterprise_jobs')
        .select('*')
        .eq('id', jobId)
        .eq('enterprise_id', enterprise.id)
        .single()

      if (jobError || !jobData) {
        console.error('Error loading job:', jobError)
        router.push('/dashboard/jobs')
        return
      }

      // Load assigned employees
      const { data: assignmentsData } = await supabase
        .from('enterprise_job_assignments')
        .select('employee_id')
        .eq('job_id', jobId)

      const assignedEmployeeIds = assignmentsData?.map(a => a.employee_id) || []

      // Set form data from job
      setFormData({
        title: jobData.title || '',
        description: jobData.description || '',
        location: jobData.location || '',
        status: jobData.status || 'pending',
        priority: jobData.priority || 'medium',
        dueDate: jobData.due_date ? jobData.due_date.split('T')[0] : '',
        estimatedHours: jobData.estimated_hours?.toString() || '',
        budget: jobData.budget?.toString() || '',
        notes: jobData.notes || '',
        selectedEmployees: assignedEmployeeIds,
      })

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

    if (!validateForm()) {
      return
    }

    if (!enterpriseId) {
      return
    }

    setSubmitting(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        alert('You must be logged in')
        return
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

      const payload = {
        jobId,
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

      const response = await fetch(`${supabaseUrl}/functions/v1/update-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update job')
      }

      alert('Job updated successfully!')
      router.push(`/dashboard/jobs/${jobId}`)
    } catch (error: any) {
      console.error('Error updating job:', error)
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
              href={`/dashboard/jobs/${jobId}`}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Job</h1>
              <p className="text-gray-400">Update job details</p>
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
                <label className="block text-sm font-semibold text-white mb-2">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  placeholder="e.g. 42 Oak Street, London, SW1A 1AA"
                />
                {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
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
                <label className="block text-sm font-semibold text-white mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

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
              href={`/dashboard/jobs/${jobId}`}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Updating Job...' : 'Update Job'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
