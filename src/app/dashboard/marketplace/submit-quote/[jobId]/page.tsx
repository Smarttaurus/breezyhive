'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  description: string
  location_address: string
  city: string
  postcode: string
  budget_min: number | null
  budget_max: number | null
  category: string
  urgency: string
  status: string
  created_at: string
}

export default function SubmitQuotePage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params?.jobId as string

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [job, setJob] = useState<Job | null>(null)
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null)

  // Form state
  const [proposedPrice, setProposedPrice] = useState('')
  const [estimatedDays, setEstimatedDays] = useState('')
  const [proposedStartDate, setProposedStartDate] = useState('')
  const [proposedStartTime, setProposedStartTime] = useState('09:00')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadJobAndCheckAuth()

    // Set default start date to 3 days from now
    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 3)
    setProposedStartDate(defaultDate.toISOString().split('T')[0])
  }, [jobId])

  const loadJobAndCheckAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/business/login')
        return
      }

      // Get enterprise
      const { data: enterprise } = await supabase
        .from('enterprises')
        .select('id, tradesperson_id')
        .eq('tradesperson_id', user.id)
        .single()

      if (!enterprise) {
        alert('Enterprise account required to submit quotes')
        router.push('/dashboard/marketplace')
        return
      }

      setEnterpriseId(enterprise.id)

      // Load job details
      const { data: jobData, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('status', 'open')
        .single()

      if (error || !jobData) {
        alert('Job not found or no longer available')
        router.push('/dashboard/marketplace')
        return
      }

      setJob(jobData)

      // Check if already submitted a quote
      const { data: existingQuote } = await supabase
        .from('job_applications')
        .select('id, proposed_price, created_at')
        .eq('job_id', jobId)
        .eq('tradesperson_id', user.id)
        .maybeSingle()

      if (existingQuote) {
        const confirmView = confirm(
          `You already submitted a quote of £${existingQuote.proposed_price} for this job on ${new Date(existingQuote.created_at).toLocaleDateString()}.\n\nYou can only submit one quote per job.\n\nClick OK to go back to marketplace.`
        )
        if (confirmView) {
          router.push('/dashboard/marketplace')
        }
      }
    } catch (error) {
      console.error('Error loading job:', error)
      alert('Failed to load job details')
      router.push('/dashboard/marketplace')
    } finally {
      setLoading(false)
    }
  }

  const calculateEarnings = () => {
    const price = parseFloat(proposedPrice)
    if (isNaN(price) || price <= 0) return { total: 0, fee: 0, earnings: 0 }

    const platformFee = price * 0.15
    const earnings = price - platformFee

    return {
      total: price,
      fee: platformFee,
      earnings: earnings
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    const price = parseFloat(proposedPrice)
    const days = parseInt(estimatedDays)

    if (isNaN(price) || price <= 0) {
      newErrors.proposedPrice = 'Please enter a valid price'
    } else if (price < 10) {
      newErrors.proposedPrice = 'Minimum quote price is £10'
    }

    if (isNaN(days) || days <= 0) {
      newErrors.estimatedDays = 'Please enter a valid number of days'
    }

    if (!proposedStartDate) {
      newErrors.proposedStartDate = 'Please select a start date'
    } else {
      const startDateTime = new Date(`${proposedStartDate}T${proposedStartTime}`)
      if (startDateTime <= new Date()) {
        newErrors.proposedStartDate = 'Start date must be in the future'
      }
    }

    if (message.trim().length < 20) {
      newErrors.message = 'Please provide a detailed message (at least 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('You must be logged in')
        return
      }

      const price = parseFloat(proposedPrice)
      const days = parseInt(estimatedDays)
      const startDateTime = new Date(`${proposedStartDate}T${proposedStartTime}`)

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          tradesperson_id: user.id,
          proposed_price: price,
          estimated_days: days,
          proposed_start_date: startDateTime.toISOString(),
          message: message.trim(),
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        if (error.code === '23505') {
          alert('You have already submitted a quote for this job')
        } else {
          console.error('Error submitting quote:', error)
          alert(`Failed to submit quote: ${error.message}`)
        }
        return
      }

      const earnings = calculateEarnings()
      alert(
        `✅ Quote Submitted!\n\n` +
        `Your quote has been sent to the customer.\n` +
        `You'll receive £${earnings.earnings.toFixed(2)} after the 15% platform fee.\n\n` +
        `The customer will be notified and can accept your quote.`
      )

      router.push('/dashboard/marketplace')
    } catch (error) {
      console.error('Error:', error)
      alert('An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!job) return null

  const earnings = calculateEarnings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6">
          <Link href="/dashboard/marketplace" className="text-gray-400 hover:text-white text-sm mb-2 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Marketplace
          </Link>
          <h1 className="text-4xl font-black text-white mt-2">Submit Quote</h1>
          <p className="text-gray-400 mt-2">Send your proposal to the customer</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Info Card */}
          <div className="bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">🛠️</span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-2">{job.description}</p>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Your Quote</h3>

            {/* Proposed Price */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Proposed Price <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-primary">
                <span className="text-2xl font-bold text-primary mr-2">£</span>
                <input
                  type="number"
                  step="0.01"
                  min="10"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  className="flex-1 bg-transparent text-2xl font-bold text-white outline-none"
                  placeholder="0.00"
                  required
                />
              </div>
              {errors.proposedPrice && <p className="text-red-400 text-sm mt-1">{errors.proposedPrice}</p>}
              <p className="text-gray-500 text-sm mt-1">Minimum £10</p>
            </div>

            {/* Estimated Days */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Estimated Duration <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-primary">
                <input
                  type="number"
                  min="1"
                  value={estimatedDays}
                  onChange={(e) => setEstimatedDays(e.target.value)}
                  className="flex-1 bg-transparent text-xl font-semibold text-white outline-none"
                  placeholder="0"
                  required
                />
                <span className="text-gray-400 font-semibold ml-2">days</span>
              </div>
              {errors.estimatedDays && <p className="text-red-400 text-sm mt-1">{errors.estimatedDays}</p>}
              <p className="text-gray-500 text-sm mt-1">How many days will this job take?</p>
            </div>

            {/* Proposed Start Date & Time */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                When Can You Start? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="date"
                    value={proposedStartDate}
                    onChange={(e) => setProposedStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <input
                    type="time"
                    value={proposedStartTime}
                    onChange={(e) => setProposedStartTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
              {errors.proposedStartDate && <p className="text-red-400 text-sm mt-1">{errors.proposedStartDate}</p>}
              <p className="text-gray-500 text-sm mt-1">Let the customer know when you can start</p>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Pitch <span className="text-red-400">*</span>
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"
                placeholder="Explain your quote, your experience with this type of work, timeline, and why you're the best fit for this job..."
                required
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              <p className="text-gray-500 text-sm mt-1">Minimum 20 characters</p>
            </div>
          </div>

          {/* Earnings Breakdown */}
          {earnings.total > 0 && (
            <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💰</span>
                <h3 className="text-xl font-bold text-green-400">Your Earnings</h3>
              </div>

              <div className="bg-white/5 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Quote Amount</span>
                  <span className="text-white font-bold text-lg">£{earnings.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Platform Fee (15%)</span>
                    <button
                      type="button"
                      onClick={() => alert('15% Platform Fee includes:\n\n• 10% BreezyHive service fee\n• 5% Payment processing\n\nThis covers secure payment processing, escrow services, platform maintenance, customer support, and marketing.')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-red-400 font-semibold">-£{earnings.fee.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">You Receive</span>
                    <span className="text-green-400 font-bold text-2xl">£{earnings.earnings.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 mt-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-400 text-sm">Funds released to you 7 days after job completion</span>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-bold text-blue-400">How It Works</h3>
            </div>

            <div className="space-y-3">
              {[
                'Submit your quote - this is the final price the customer pays',
                'Customer reviews and decides to accept',
                'Customer pays your quote price (held in escrow by BreezyHive)',
                'Your contact details are revealed to start work',
                'Complete the job and mark as complete',
                'Funds released to you after 7 days (minus 15% platform fee)'
              ].map((step, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-blue-400 font-bold">{index + 1}.</span>
                  <span className="text-gray-400 text-sm">{step}</span>
                </div>
              ))}
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mt-4 flex items-start gap-2">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-400 text-sm font-semibold">
                All payments must go through BreezyHive. Cash or direct payments violate our Terms of Service.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl py-4 px-6 font-bold text-lg transition-all shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Submit Quote
              </>
            )}
          </button>

          <p className="text-gray-500 text-sm text-center">
            By submitting this quote, you agree to BreezyHive's Terms of Service and commit to completing the job as described if your quote is accepted.
          </p>
        </form>
      </main>
    </div>
  )
}
