'use client'

import Link from 'next/link'

export default function ReportsPage() {
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
              <h1 className="text-4xl font-black text-white">📊 Reports & Analytics</h1>
              <p className="text-gray-400 mt-2">Business insights and performance metrics</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-20 text-center">
          <div className="text-8xl mb-6">📊</div>
          <h2 className="text-3xl font-bold text-white mb-4">Reports Coming Soon</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            We're building comprehensive analytics and reporting features including time tracking reports,
            expense analytics, employee performance metrics, and business insights.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
