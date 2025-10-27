'use client'

import { useState } from 'react'
import Link from 'next/link'
import BeeIcon from '@/components/BeeIcon'
import Input from '@/components/Input'
import Button from '@/components/Button'

type FormData = {
  // Step 1: Business Info
  businessName: string
  businessType: string

  // Step 2: Account Info
  firstName: string
  lastName: string
  email: string
  phone: string

  // Step 3: Password
  password: string
  confirmPassword: string

  // Step 4: Agreement
  agreeToTerms: boolean
}

export default function BusinessRegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: 'construction',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (step === 1) {
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Business name is required'
      }
      if (!formData.businessType) {
        newErrors.businessType = 'Please select a business type'
      }
    } else if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      }
    } else if (step === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    } else if (step === 4) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) {
      return
    }

    setIsLoading(true)

    // TODO: Implement actual registration
    setTimeout(() => {
      console.log('Register with:', formData)
      setIsLoading(false)
      // Redirect to dashboard or confirmation page
    }, 1000)
  }

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
        <span className="text-sm font-medium text-primary">{Math.round((step / 4) * 100)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-honey transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your business</h2>
              <p className="text-gray-600">Let's start with some basic information</p>
            </div>

            <div className="space-y-6">
              <Input
                label="Business Name"
                placeholder="e.g., Smith Construction Ltd"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                error={errors.businessName}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="input-field"
                  value={formData.businessType}
                  onChange={(e) => updateFormData('businessType', e.target.value)}
                >
                  <option value="construction">Construction</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting & Decorating</option>
                  <option value="roofing">Roofing</option>
                  <option value="hvac">HVAC</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>
                )}
              </div>

              <Button onClick={handleNext} size="lg" className="w-full">
                Continue
              </Button>
            </div>
          </>
        )

      case 2:
        return (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your contact information</h2>
              <p className="text-gray-600">We'll use this to set up your account</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                />

                <Input
                  label="Last Name"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                />
              </div>

              <Input
                type="email"
                label="Email Address"
                placeholder="john@smithconstruction.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                error={errors.email}
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                placeholder="+44 7123 456789"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                error={errors.phone}
                required
              />

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="secondary" size="lg" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} size="lg" className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          </>
        )

      case 3:
        return (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your password</h2>
              <p className="text-gray-600">Choose a strong password to secure your account</p>
            </div>

            <div className="space-y-6">
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                error={errors.password}
                helperText="At least 8 characters with uppercase, lowercase, and number"
                required
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
              />

              {/* Password strength indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Password strength:</div>
                  <div className="flex gap-2">
                    <div className={`h-2 flex-1 rounded ${formData.password.length >= 8 ? 'bg-primary' : 'bg-gray-200'}`} />
                    <div className={`h-2 flex-1 rounded ${/[A-Z]/.test(formData.password) ? 'bg-primary' : 'bg-gray-200'}`} />
                    <div className={`h-2 flex-1 rounded ${/[a-z]/.test(formData.password) ? 'bg-primary' : 'bg-gray-200'}`} />
                    <div className={`h-2 flex-1 rounded ${/\d/.test(formData.password) ? 'bg-primary' : 'bg-gray-200'}`} />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="secondary" size="lg" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} size="lg" className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          </>
        )

      case 4:
        return (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review and confirm</h2>
              <p className="text-gray-600">One last step before you start your free trial</p>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Your information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business:</span>
                    <span className="font-medium">{formData.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{formData.businessType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Trial info */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-2">14-Day Free Trial Included</h3>
                <p className="text-sm text-gray-700">
                  You'll get full access to all enterprise features for 14 days. No credit card required. Cancel anytime.
                </p>
              </div>

              {/* Terms checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    checked={formData.agreeToTerms}
                    onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="#" className="text-primary hover:text-primary-dark font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-primary hover:text-primary-dark font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-2 text-sm text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleBack} variant="secondary" size="lg" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Start Free Trial'}
                </Button>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <BeeIcon size={50} />
          <span className="text-3xl font-bold text-gray-900">BreezyHive</span>
        </Link>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              🏢 Enterprise Registration
            </div>
          </div>

          {renderProgressBar()}
          {renderStep()}

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/business/login" className="text-primary hover:text-primary-dark font-semibold">
              Sign in
            </Link>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/" className="hover:text-primary transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
