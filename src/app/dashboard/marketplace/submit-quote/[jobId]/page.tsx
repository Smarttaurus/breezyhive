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
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
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
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <div className="bg-black/60 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <Link href="/dashboard/marketplace" className="text-gray-400 hover:text-white text-sm mb-3 inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Marketplace
          </Link>
          <h1 className="text-5xl font-black text-white tracking-tight">Submit Your Quote</h1>
          <p className="text-gray-400 mt-2 text-lg">Send your proposal to the customer</p>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
          {/* Left Column - Job Details (3/5) */}
          <div className="xl:col-span-3 space-y-8">
            {/* Job Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-3xl border border-white/10 p-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-primary/20">
                    <span className="text-4xl">🛠️</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        job.urgency === 'urgent' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                        job.urgency === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        {job.urgency}
                      </span>
                      <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        {job.category}
                      </span>
                    </div>
                    <h2 className="text-4xl font-black text-white mb-4 leading-tight">{job.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Posted {new Date(job.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Job Description</h3>
              <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Budget & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Budget */}
              {(job.budget_min || job.budget_max) && (
                <div className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent rounded-3xl border border-green-500/20 p-8">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <span className="text-3xl">💰</span>
                      </div>
                      <div>
                        <div className="text-xs font-black text-green-400 uppercase tracking-widest">Customer Budget</div>
                        <div className="text-xs text-gray-400 mt-0.5">Expected range</div>
                      </div>
                    </div>
                    <div className="text-5xl font-black text-white mb-3">
                      £{job.budget_min || 0} - £{job.budget_max || 0}
                    </div>
                    <p className="text-xs text-gray-400">You can quote above or below this range</p>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-black text-blue-400 uppercase tracking-widest">Approximate Location</div>
                    <div className="text-xs text-gray-400 mt-0.5">Privacy protected</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-bold text-xl">{job.city || 'City'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    </svg>
                    <span className="text-gray-300 font-semibold">{job.postcode || 'Postcode'}</span>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-yellow-400 text-xs font-bold leading-relaxed">
                        Exact address revealed after quote acceptance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quote Form (2/5) */}
          <div className="xl:col-span-2">
            <form onSubmit={handleSubmit} className="sticky top-28 space-y-6">
              {/* Quote Form */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <h3 className="text-2xl font-black text-white mb-8">Your Quote</h3>

                {/* Price */}
                <div className="mb-8">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                    Proposed Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-primary">£</span>
                    <input
                      type="number"
                      step="0.01"
                      min="10"
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(e.target.value)}
                      className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-3xl font-black text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  {errors.proposedPrice && <p className="text-red-400 text-xs mt-2 font-semibold">{errors.proposedPrice}</p>}
                  <p className="text-gray-500 text-xs mt-2">Minimum £10</p>
                </div>

                {/* Duration */}
                <div className="mb-8">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                    Estimated Duration *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={estimatedDays}
                      onChange={(e) => setEstimatedDays(e.target.value)}
                      className="flex-1 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-2xl font-black text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all"
                      placeholder="0"
                      required
                    />
                    <span className="text-gray-400 font-black text-xl">DAYS</span>
                  </div>
                  {errors.estimatedDays && <p className="text-red-400 text-xs mt-2 font-semibold">{errors.estimatedDays}</p>}
                </div>

                {/* Start Date */}
                <div className="mb-8">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                    Start Date & Time *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={proposedStartDate}
                      onChange={(e) => setProposedStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:outline-none focus:border-primary transition-all"
                      required
                    />
                    <input
                      type="time"
                      value={proposedStartTime}
                      onChange={(e) => setProposedStartTime(e.target.value)}
                      className="px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold focus:outline-none focus:border-primary transition-all"
                      required
                    />
                  </div>
                  {errors.proposedStartDate && <p className="text-red-400 text-xs mt-2 font-semibold">{errors.proposedStartDate}</p>}
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                    Your Pitch *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-primary resize-none transition-all leading-relaxed"
                    placeholder="Explain your quote, experience, and why you're the best fit..."
                    required
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-2 font-semibold">{errors.message}</p>}
                  <p className="text-gray-500 text-xs mt-2">Minimum 20 characters</p>
                </div>
              </div>

              {/* Earnings */}
              {earnings.total > 0 && (
                <div className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent rounded-3xl border border-green-500/20 p-8">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl">💰</span>
                      <h3 className="text-xl font-black text-green-400">Your Earnings</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-gray-300 font-semibold">Quote Amount</span>
                        <span className="text-white font-black text-xl">£{earnings.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-gray-400 text-sm">Platform Fee (15%)</span>
                        <span className="text-red-400 font-bold">-£{earnings.fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-white font-black text-lg">You Receive</span>
                        <span className="text-green-400 font-black text-3xl">£{earnings.earnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/90 hover:to-accent/90 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-2xl py-6 px-8 font-black text-xl transition-all shadow-2xl shadow-primary/20 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-4"
              >
                {submitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    SUBMITTING...
                  </>
                ) : (
                  <>
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    SUBMIT QUOTE
                  </>
                )}
              </button>

              <p className="text-gray-500 text-xs text-center leading-relaxed">
                By submitting, you agree to BreezyHive's Terms of Service
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
