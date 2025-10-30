'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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
  can_create_jobs: boolean
  can_view_all_jobs: boolean
  can_approve_expenses: boolean
  is_active: boolean
  created_at: string
}

interface ViewEmployeeModalProps {
  employeeId: string
  onClose: () => void
}

export default function ViewEmployeeModal({ employeeId, onClose }: ViewEmployeeModalProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data, error } = await supabase
          .from('enterprise_employees')
          .select('*')
          .eq('id', employeeId)
          .single()

        if (error) throw error
        setEmployee(data)
      } catch (error) {
        console.error('Error fetching employee:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [employeeId])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 shadow-2xl">
          <p className="text-white">Employee not found</p>
          <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full border border-white/10 shadow-2xl my-8">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                {employee.first_name[0]}{employee.last_name[0]}
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-1">
                  {employee.first_name} {employee.last_name}
                </h3>
                <p className="text-gray-400">Employee Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            {employee.is_active ? (
              <span className="px-6 py-3 text-sm font-bold rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Active
              </span>
            ) : (
              <span className="px-6 py-3 text-sm font-bold rounded-xl bg-gray-500/20 text-gray-400 border border-gray-500/30">
                Inactive
              </span>
            )}
            <span className="text-sm text-gray-500">
              Joined {new Date(employee.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Personal Information */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                <p className="text-white text-lg">{employee.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Phone Number</label>
                <p className="text-white text-lg">{employee.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💼</span>
              Job Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Role</label>
                <span className="inline-block px-4 py-2 text-sm font-bold rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {employee.role}
                </span>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Employment Type</label>
                <p className="text-white text-lg capitalize">{employee.employment_type.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Hourly Rate</label>
                <p className="text-white text-lg">
                  {employee.hourly_rate ? `£${employee.hourly_rate.toFixed(2)}/hour` : 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Hire Date</label>
                <p className="text-white text-lg">
                  {new Date(employee.hire_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              Permissions
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    employee.can_create_jobs ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
                  }`}>
                    {employee.can_create_jobs ? '✓' : '×'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Can Create Jobs</p>
                    <p className="text-sm text-gray-400">Allow employee to create new job assignments</p>
                  </div>
                </div>
                {employee.can_create_jobs && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold">
                    Enabled
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    employee.can_view_all_jobs ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
                  }`}>
                    {employee.can_view_all_jobs ? '✓' : '×'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Can View All Jobs</p>
                    <p className="text-sm text-gray-400">Employee can see all company jobs, not just assigned ones</p>
                  </div>
                </div>
                {employee.can_view_all_jobs && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold">
                    Enabled
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    employee.can_approve_expenses ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-500'
                  }`}>
                    {employee.can_approve_expenses ? '✓' : '×'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Can Approve Expenses</p>
                    <p className="text-sm text-gray-400">Allow employee to approve expense claims from team</p>
                  </div>
                </div>
                {employee.can_approve_expenses && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold">
                    Enabled
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
