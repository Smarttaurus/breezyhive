'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AddEmployeeModalProps {
  enterpriseId: string
  onClose: () => void
  onSuccess: () => void
}

interface EmployeeFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: string
  employmentType: string
  hourlyRate: string
  hireDate: string
  canCreateJobs: boolean
  canViewAllJobs: boolean
  canApproveExpenses: boolean
}

export default function AddEmployeeModal({ enterpriseId, onClose, onSuccess }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
    employmentType: 'full_time',
    hourlyRate: '',
    hireDate: new Date().toISOString().split('T')[0],
    canCreateJobs: false,
    canViewAllJobs: false,
    canApproveExpenses: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // Multi-step form
  const [justChangedStep, setJustChangedStep] = useState(false) // Prevent auto-submit after step change

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {}

    if (formData.hourlyRate && isNaN(parseFloat(formData.hourlyRate))) {
      newErrors.hourlyRate = 'Please enter a valid hourly rate'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    console.log('📍 handleNext called, current step:', step)
    if (step === 1 && validateStep1()) {
      console.log('✅ Validation passed, moving to step 2')
      setErrors({}) // Clear any previous errors when moving to step 2
      setJustChangedStep(true)
      setStep(2)

      // Clear the flag after a short delay to allow user to interact with step 2
      setTimeout(() => {
        setJustChangedStep(false)
        console.log('🔓 Step change cooldown ended - can now submit')
      }, 500)
    } else {
      console.log('❌ Validation failed or not on step 1')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // CRITICAL: Only allow submission on step 2
    if (step !== 2) {
      console.log('❌ Blocked submission - not on step 2. Current step:', step)
      return
    }

    // CRITICAL: Prevent auto-submit immediately after changing to step 2
    if (justChangedStep) {
      console.log('❌ Blocked submission - step just changed, cooldown active')
      return
    }

    console.log('Creating employee with data:', formData)

    if (!validateStep2()) {
      console.log('Step 2 validation failed')
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      console.log('🚀 [v2.0] Starting employee creation...')
      console.log('Enterprise ID:', enterpriseId)

      // Get the current user's session token
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session check:', session ? '✅ Valid' : '❌ No session')

      if (!session) {
        throw new Error('You must be logged in to create employees')
      }

      // Call the edge function to create employee (bypasses RLS issues)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const edgeFunctionUrl = `${supabaseUrl}/functions/v1/create-employee`
      console.log('🎯 Edge function URL:', edgeFunctionUrl)
      console.log('📦 Request payload:', {
        enterpriseId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      })

      console.log('🌐 Making POST request to edge function...')
      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          enterpriseId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          employmentType: formData.employmentType,
          hourlyRate: formData.hourlyRate,
          hireDate: formData.hireDate,
          canCreateJobs: formData.canCreateJobs,
          canViewAllJobs: formData.canViewAllJobs,
          canApproveExpenses: formData.canApproveExpenses,
        }),
      })

      console.log('📡 Response status:', response.status, response.statusText)
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

      const result = await response.json()
      console.log('📥 Edge function response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create employee')
      }

      console.log('✅ Employee created successfully!')

      // Success!
      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('❌ Failed to create employee:', error)
      console.error('Error details:', error)

      // Show user-friendly error
      let errorMessage = 'Failed to create employee. Please try again.'

      if (error.message?.includes('already registered')) {
        errorMessage = 'This email is already registered. Please use a different email.'
      } else if (error.message) {
        errorMessage = error.message
      }

      // Go back to step 1 to show the error
      setTimeout(() => {
        setStep(1)
        setErrors({
          email: errorMessage
        })
      }, 100)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-2xl w-full border border-white/10 shadow-2xl my-8">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-3xl font-black text-white">Add New Employee</h3>
              <span className="text-xs text-gray-500 font-mono">v2.0-edge-function</span>
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

          {/* Progress Steps */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-primary text-white' : 'bg-white/10 text-gray-500'
              }`}>
                1
              </div>
              <span className={`text-sm font-semibold ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>
                Personal Info
              </span>
            </div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`}></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-primary text-white' : 'bg-white/10 text-gray-500'
              }`}>
                2
              </div>
              <span className={`text-sm font-semibold ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>
                Job Details
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log('⚠️ Form submit triggered')
            if (step === 2) {
              handleSubmit(e)
            } else {
              console.log('🚫 Form submit blocked - not on step 2')
            }
          }}
          onKeyDown={(e) => {
            // Completely prevent Enter key from doing anything in the form
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              console.log('🚫 Enter key blocked to prevent auto-submission')
              return false
            }
          }}
          className="p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john.doe@company.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="+44 7700 900000"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Min. 8 characters"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-blue-200">
                    The employee will receive these login credentials to access the BreezyHive mobile app.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="employee">Employee</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Hourly Rate (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    placeholder="15.50"
                  />
                  {errors.hourlyRate && <p className="text-red-400 text-sm mt-1">{errors.hourlyRate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Hire Date
                  </label>
                  <input
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Permissions</h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.canCreateJobs}
                      onChange={(e) => setFormData({ ...formData, canCreateJobs: e.target.checked })}
                      className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-white font-semibold">Can Create Jobs</span>
                      <p className="text-sm text-gray-400">Allow employee to create new job assignments</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.canViewAllJobs}
                      onChange={(e) => setFormData({ ...formData, canViewAllJobs: e.target.checked })}
                      className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-white font-semibold">Can View All Jobs</span>
                      <p className="text-sm text-gray-400">Employee can see all company jobs, not just assigned ones</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.canApproveExpenses}
                      onChange={(e) => setFormData({ ...formData, canApproveExpenses: e.target.checked })}
                      className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-white font-semibold">Can Approve Expenses</span>
                      <p className="text-sm text-gray-400">Allow employee to approve expense claims from team</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
            {step === 1 ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Next Step →
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setErrors({}) // Clear errors when going back
                    setStep(1)
                  }}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all border border-white/10"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Employee...' : 'Create Employee'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
