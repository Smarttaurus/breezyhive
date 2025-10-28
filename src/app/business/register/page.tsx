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
  companySize: string
  address: string
  city: string
  postcode: string

  // Step 2: Account Info
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string

  // Step 3: Password
  password: string
  confirmPassword: string

  // Step 4: Agreement
  agreeToTerms: boolean
  agreeToMarketing: boolean
}

export default function BusinessRegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: 'construction',
    companySize: '1-10',
    address: '',
    city: '',
    postcode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false,
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
      if (!formData.companySize) {
        newErrors.companySize = 'Please select company size'
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Business address is required'
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required'
      }
      if (!formData.postcode.trim()) {
        newErrors.postcode = 'Postcode is required'
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
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = 'Job title is required'
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

  const renderProgressBar = () => {
    const steps = [
      { num: 1, label: 'Business' },
      { num: 2, label: 'Contact' },
      { num: 3, label: 'Security' },
      { num: 4, label: 'Review' },
    ]

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-900">Step {step} of 4</span>
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {Math.round((step / 4) * 100)}% Complete
          </span>
        </div>

        {/* Desktop Progress Steps */}
        <div className="hidden md:flex items-center justify-between mb-4">
          {steps.map((s, index) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step > s.num
                      ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg'
                      : step === s.num
                      ? 'bg-gradient-to-br from-primary to-accent text-white shadow-xl scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span
                  className={`text-xs mt-2 font-semibold ${
                    step >= s.num ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ${
                      step > s.num ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient transition-all duration-500 shadow-lg"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6">
                <span className="text-2xl">🏢</span>
                <span className="text-sm font-bold text-primary">Business Information</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Tell us about your business</h2>
              <p className="text-lg text-gray-600">Let's start with some basic information</p>
            </div>

            <div className="space-y-8">
              <div>
                <Input
                  label="Business Name"
                  placeholder="e.g., Smith Construction Ltd"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  error={errors.businessName}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'construction', label: 'Construction', icon: '🏗️' },
                    { value: 'plumbing', label: 'Plumbing', icon: '🔧' },
                    { value: 'electrical', label: 'Electrical', icon: '⚡' },
                    { value: 'carpentry', label: 'Carpentry', icon: '🪚' },
                    { value: 'painting', label: 'Painting', icon: '🎨' },
                    { value: 'roofing', label: 'Roofing', icon: '🏠' },
                    { value: 'hvac', label: 'HVAC', icon: '❄️' },
                    { value: 'landscaping', label: 'Landscaping', icon: '🌳' },
                    { value: 'flooring', label: 'Flooring', icon: '🪵' },
                    { value: 'masonry', label: 'Masonry', icon: '🧱' },
                    { value: 'glazing', label: 'Glazing', icon: '🪟' },
                    { value: 'other', label: 'Other', icon: '📋' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => updateFormData('businessType', type.value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.businessType === type.value
                          ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg transform scale-105'
                          : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className={`text-sm font-semibold ${
                        formData.businessType === type.value ? 'text-primary' : 'text-gray-700'
                      }`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.businessType && (
                  <p className="mt-2 text-sm text-red-500 font-medium">{errors.businessType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { value: '1-10', label: '1-10', icon: '👤' },
                    { value: '11-50', label: '11-50', icon: '👥' },
                    { value: '51-200', label: '51-200', icon: '👨‍👩‍👧‍👦' },
                    { value: '201-500', label: '201-500', icon: '🏢' },
                    { value: '500+', label: '500+', icon: '🏙️' },
                  ].map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => updateFormData('companySize', size.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.companySize === size.value
                          ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      <span className="text-2xl">{size.icon}</span>
                      <span className={`text-sm font-bold ${
                        formData.companySize === size.value ? 'text-primary' : 'text-gray-700'
                      }`}>
                        {size.label}
                      </span>
                      <span className="text-xs text-gray-500">employees</span>
                    </button>
                  ))}
                </div>
                {errors.companySize && (
                  <p className="mt-2 text-sm text-red-500 font-medium">{errors.companySize}</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Business Location</h3>
                <div className="space-y-5">
                  <Input
                    label="Business Address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    error={errors.address}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      placeholder="London"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      error={errors.city}
                      required
                    />

                    <Input
                      label="Postcode"
                      placeholder="SW1A 1AA"
                      value={formData.postcode}
                      onChange={(e) => updateFormData('postcode', e.target.value)}
                      error={errors.postcode}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleNext} size="lg" className="w-full mt-8">
                Continue to Contact Information →
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

              <Input
                label="Job Title"
                placeholder="e.g., Managing Director, Operations Manager"
                value={formData.jobTitle}
                onChange={(e) => updateFormData('jobTitle', e.target.value)}
                error={errors.jobTitle}
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
                    <span className="text-gray-600">Company Size:</span>
                    <span className="font-medium">{formData.companySize} employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{formData.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{formData.city}, {formData.postcode}</span>
                  </div>
                  <div className="border-t border-gray-300 my-2 pt-2"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Title:</span>
                    <span className="font-medium">{formData.jobTitle}</span>
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
              <div className="space-y-4">
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
                      </Link>{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-2 text-sm text-red-500">{errors.agreeToTerms}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      checked={formData.agreeToMarketing}
                      onChange={(e) => updateFormData('agreeToMarketing', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600">
                      I would like to receive marketing communications about BreezyHive products, services, and events (optional)
                    </span>
                  </label>
                </div>
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
