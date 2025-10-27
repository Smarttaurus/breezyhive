import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { FeatureCard } from '@/components/Card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Download Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-primary/5">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-full text-sm font-semibold mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Available on iOS & Android</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-[0.95] tracking-tight">
                Connect with
                <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  Elite Tradespeople
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                The premium marketplace for home improvement. Verified professionals, secure escrow payments, and enterprise-grade project management.
              </p>

              {/* App Store Buttons - Premium Design */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
                {/* App Store Button */}
                <a
                  href="#"
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-11 h-11 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left relative z-10">
                    <div className="text-xs opacity-70 font-medium">Download on the</div>
                    <div className="text-2xl font-bold -mt-0.5">App Store</div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-11 h-11 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left relative z-10">
                    <div className="text-xs opacity-70 font-medium">Get it on</div>
                    <div className="text-2xl font-bold -mt-0.5">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Verified Pros</div>
                    <div className="text-xs text-gray-500">Background checked</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Secure Escrow</div>
                    <div className="text-xs text-gray-500">Payment protected</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Money-Back</div>
                    <div className="text-xs text-gray-500">100% guaranteed</div>
                  </div>
                </div>
              </div>

              {/* Premium Stats */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl"></div>
                <div className="relative grid grid-cols-3 gap-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
                  <div className="text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">4.9★</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">50K+</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">£10M+</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid Out</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Premium Phone Mockup */}
            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative mx-auto max-w-sm">
                {/* Ultra Premium Floating Badge 1 */}
                <div className="absolute -top-12 -left-12 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-5 z-20 border border-gray-200/50 backdrop-blur-xl animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg">Verified</div>
                      <div className="text-sm text-gray-500 font-semibold">10,000+ Pros</div>
                    </div>
                  </div>
                </div>

                {/* Ultra Premium Floating Badge 2 */}
                <div className="absolute -bottom-12 -right-12 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-5 z-20 border border-gray-200/50 backdrop-blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg">Protected</div>
                      <div className="text-sm text-gray-500 font-semibold">£10M+ Secured</div>
                    </div>
                  </div>
                </div>

                {/* Phone Frame - Ultra Premium Design */}
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-10 flex items-end justify-center pb-1">
                    <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                  </div>

                  {/* Screen */}
                  <div className="relative bg-white rounded-[3rem] overflow-hidden aspect-[9/19.5] shadow-inner">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-gray-900 text-xs font-semibold z-10 bg-gradient-to-b from-white to-transparent">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                        <div className="w-5 h-2.5 border border-gray-900 rounded-sm relative">
                          <div className="absolute inset-0.5 bg-gray-900 rounded-sm"></div>
                          <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-gray-900 rounded-r"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content - Enhanced UI */}
                    <div className="h-full bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-12">
                      {/* Header */}
                      <div className="px-5 pt-4 pb-3">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-primary/30">
                              🐝
                            </div>
                            <div>
                              <div className="font-black text-base leading-none mb-1">BreezyHive</div>
                              <div className="text-[10px] text-gray-500 font-semibold">Find Your Pro</div>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                            </div>
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                          </div>
                        </div>

                        {/* Search Bar - Premium Design */}
                        <div className="bg-white rounded-2xl p-3.5 mb-4 shadow-md border border-gray-100">
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <div className="text-gray-400 text-xs font-medium">Search plumbers, electricians...</div>
                          </div>
                        </div>

                        {/* Category Pills */}
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                          <div className="bg-gradient-to-r from-primary to-accent text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shadow-lg shadow-primary/30">
                            🔧 Plumbing
                          </div>
                          <div className="bg-white text-gray-700 px-3.5 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shadow-md border border-gray-200">
                            ⚡ Electrical
                          </div>
                          <div className="bg-white text-gray-700 px-3.5 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap shadow-md border border-gray-200">
                            🪚 Carpentry
                          </div>
                        </div>
                      </div>

                      {/* Featured Section */}
                      <div className="px-5 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-black text-gray-900">Featured Jobs</h3>
                          <span className="text-[9px] font-bold text-primary">View All →</span>
                        </div>
                      </div>

                      {/* Job Cards - Premium Design */}
                      <div className="px-5 space-y-3 pb-20">
                        {/* Card 1 - Featured */}
                        <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-4 shadow-xl border-2 border-primary/40 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[3rem]"></div>
                          <div className="relative">
                            <div className="flex items-start justify-between mb-2.5">
                              <div className="flex items-center gap-2.5 flex-1">
                                <div className="w-11 h-11 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center text-lg shrink-0">
                                  🏠
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-black text-xs text-gray-900 leading-tight mb-0.5">Kitchen Renovation</div>
                                  <div className="text-[9px] text-gray-500 font-semibold">London, SW1 · 2h ago</div>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black shadow-lg shrink-0">
                                🔥 HOT
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-600 mb-2.5 leading-relaxed font-medium">Complete kitchen remodel including cabinets, countertops, and appliances...</p>
                            <div className="flex items-center justify-between">
                              <div className="text-primary font-black text-base">£2,500</div>
                              <div className="flex items-center gap-1.5">
                                <div className="flex items-center gap-0.5">
                                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                  </svg>
                                  <span className="text-[9px] font-bold text-gray-700">12</span>
                                </div>
                                <span className="text-[9px] text-gray-400">quotes</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2 - Verified Pro */}
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="flex items-center gap-2.5 flex-1">
                              <div className="relative">
                                <div className="w-11 h-11 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-lg">
                                  🚿
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="font-black text-xs text-gray-900 leading-tight mb-0.5">Bathroom Plumbing Fix</div>
                                <div className="text-[9px] text-gray-500 font-semibold">Manchester · 5h ago</div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-0.5">
                              <div className="flex items-center gap-0.5">
                                <span className="text-yellow-400 text-xs">★</span>
                                <span className="text-[9px] font-bold text-gray-900">4.9</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-600 mb-2.5 leading-relaxed">Shower leak and tile replacement needed urgently...</p>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-900 font-black text-sm">£800</div>
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center gap-0.5">
                                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                <span className="text-[9px] font-bold text-gray-700">8</span>
                              </div>
                              <span className="text-[9px] text-gray-400">quotes</span>
                            </div>
                          </div>
                        </div>

                        {/* Card 3 - Loading State */}
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 opacity-50">
                          <div className="flex items-start gap-2.5 mb-2.5">
                            <div className="w-11 h-11 bg-gray-200 rounded-xl animate-pulse"></div>
                            <div className="flex-1">
                              <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mb-1.5 animate-pulse"></div>
                              <div className="h-2 bg-gray-100 rounded-full w-1/2 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full w-full mb-1 animate-pulse"></div>
                          <div className="h-2 bg-gray-100 rounded-full w-4/5 animate-pulse"></div>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200">
                        <div className="flex items-center justify-around px-4 py-2.5">
                          <div className="flex flex-col items-center gap-0.5">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            <span className="text-[8px] font-bold text-primary">Home</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="text-[8px] font-semibold text-gray-400">Search</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-[8px] font-semibold text-gray-400">Post</span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 relative">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span className="text-[8px] font-semibold text-gray-400">Messages</span>
                            <div className="absolute top-0 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                          </div>
                          <div className="flex flex-col items-center gap-0.5">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-[8px] font-semibold text-gray-400">Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-700 rounded-full"></div>
                </div>

                {/* Floating Orbs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Verified Tradespeople</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Jobs Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">£2M+</div>
              <div className="text-gray-600">Paid to Tradespeople</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Built for Everyone</h2>
            <p className="section-subtitle">
              Whether you're a homeowner, tradesperson, or business owner, BreezyHive has you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-primary">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold mb-3">For Customers</h3>
              <p className="text-gray-600 mb-6">
                Post your project, receive quotes from verified tradespeople, and get the job done with complete payment protection.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Browse verified professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Compare quotes and reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Escrow payment protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>7-day satisfaction guarantee</span>
                </li>
              </ul>
              <Button href="#download" variant="outline" className="w-full">
                Get Started
              </Button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-primary">
              <div className="text-5xl mb-4">🔨</div>
              <h3 className="text-2xl font-bold mb-3">For Tradespeople</h3>
              <p className="text-gray-600 mb-6">
                Find jobs, build your portfolio, and grow your business with tools designed for professionals.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Find local jobs instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Secure, guaranteed payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Build your portfolio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">✓</span>
                  <span>Only 15% platform fee</span>
                </li>
              </ul>
              <Button href="#download" variant="outline" className="w-full">
                Start Earning
              </Button>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-white">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold mb-3">For Enterprises</h3>
              <p className="mb-6 opacity-90">
                Manage your team with powerful tools for time tracking, expense management, and job assignment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>GPS time tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Employee management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Expense tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Real-time reporting</span>
                </li>
              </ul>
              <Button href="/business" variant="secondary" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose BreezyHive?</h2>
            <p className="section-subtitle">
              Everything you need for successful home improvement projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="💳"
              title="Flexible Payment Options"
              description="Fixed price, hourly rate, milestone-based, or change orders - choose what works for your project."
              color="blue"
            />
            <FeatureCard
              icon="🔒"
              title="Escrow Protection"
              description="All payments held securely until work is completed to your satisfaction. 7-day review period included."
              color="green"
            />
            <FeatureCard
              icon="✅"
              title="Verified Professionals"
              description="Background checks, credential verification, and real customer reviews ensure quality."
              color="purple"
            />
            <FeatureCard
              icon="💬"
              title="AI-Powered Assistant"
              description="Get help writing job descriptions, understanding quotes, and managing projects with Breezy Bee."
              color="yellow"
            />
            <FeatureCard
              icon="📸"
              title="Photo Documentation"
              description="Before and after photos with GPS stamps keep everyone accountable and provide proof of work."
              color="red"
            />
            <FeatureCard
              icon="⭐"
              title="Reviews & Ratings"
              description="Transparent rating system helps you find the best professionals and helps them build their reputation."
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get your project done in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Post Your Job</h3>
              <p className="text-gray-600">
                Describe your project with AI assistance and set your budget
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Receive Quotes</h3>
              <p className="text-gray-600">
                Get competitive quotes from verified local tradespeople
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Choose & Pay</h3>
              <p className="text-gray-600">
                Select the best tradesperson and fund the job securely
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Get It Done</h3>
              <p className="text-gray-600">
                Track progress and release payment when you're satisfied
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What People Are Saying</h2>
            <p className="section-subtitle">
              Trusted by thousands of customers and tradespeople
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "BreezyHive made finding a reliable electrician so easy. The escrow payment system gave me complete peace of mind. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Homeowner</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "As a plumber, BreezyHive has transformed my business. I get steady work, fair pay, and the platform handles all the payment hassles."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold">Mike Peters</div>
                  <div className="text-sm text-gray-500">Plumber</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The enterprise features are game-changing. GPS time tracking and expense management have saved us thousands in labor costs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold">David Chen</div>
                  <div className="text-sm text-gray-500">Construction Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Download Section */}
      <section id="download" className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left side - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-full text-sm font-semibold mb-8 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Download Now</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                  Get Started with
                  <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    BreezyHive
                  </span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-medium">
                  Available on iOS and Android. Join thousands of users managing their projects seamlessly.
                </p>

                {/* Trust Indicators */}
                <div className="space-y-5 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-900">Free to download and use</div>
                      <div className="text-sm text-gray-500">No hidden charges</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-900">No credit card required</div>
                      <div className="text-sm text-gray-500">Start immediately</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-900">Start posting jobs in minutes</div>
                      <div className="text-sm text-gray-500">Quick setup process</div>
                    </div>
                  </div>
                </div>

                {/* Premium App Store Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 mb-12">
                  <a
                    href="#"
                    className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    <svg className="w-10 h-10 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left relative z-10">
                      <div className="text-xs opacity-70 font-medium">Download on the</div>
                      <div className="text-2xl font-bold -mt-0.5">App Store</div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    <svg className="w-10 h-10 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left relative z-10">
                      <div className="text-xs opacity-70 font-medium">Get it on</div>
                      <div className="text-2xl font-bold -mt-0.5">Google Play</div>
                    </div>
                  </a>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-black text-gray-900">4.9★</div>
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Rating</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">10,000+</div>
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Downloads</div>
                  </div>
                </div>
              </div>

              {/* Right side - Ultra Premium Phone Mockup */}
              <div className="relative">
                <div className="relative mx-auto max-w-xs">
                  {/* Floating Badge - Download Count */}
                  <div className="absolute -top-8 -right-8 bg-gradient-to-br from-white via-white to-primary/10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-4 z-20 border border-gray-200/50 backdrop-blur-xl animate-pulse">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">10K+</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Downloads</div>
                    </div>
                  </div>

                  {/* Floating Badge - Rating */}
                  <div className="absolute -bottom-6 -left-8 bg-gradient-to-br from-white via-white to-accent/10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-4 z-20 border border-gray-200/50 backdrop-blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl">⭐</div>
                      <div>
                        <div className="text-xl font-black text-gray-900">4.9</div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Frame - Ultra Premium */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-10 flex items-end justify-center pb-1">
                      <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                    </div>

                    {/* Screen */}
                    <div className="relative bg-white rounded-[3rem] overflow-hidden aspect-[9/19.5] shadow-inner">
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-gray-900 text-xs font-semibold z-10 bg-gradient-to-b from-white to-transparent">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                          <div className="w-5 h-2.5 border border-gray-900 rounded-sm relative">
                            <div className="absolute inset-0.5 bg-gray-900 rounded-sm"></div>
                            <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-gray-900 rounded-r"></div>
                          </div>
                        </div>
                      </div>

                      {/* App Preview - Messages View */}
                      <div className="h-full bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-12">
                        {/* Header */}
                        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                          <div className="flex items-center gap-3 mb-4">
                            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <div className="flex-1">
                              <div className="font-black text-base leading-none mb-1">Messages</div>
                              <div className="text-[10px] text-green-600 font-bold">● 5 Active Chats</div>
                            </div>
                            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-lg shadow-lg">
                              🐝
                            </div>
                          </div>
                        </div>

                        {/* Message List */}
                        <div className="px-5 py-3 space-y-3 pb-20">
                          {/* Message 1 - Active */}
                          <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border-l-4 border-primary">
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                JD
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <div className="font-black text-xs text-gray-900 leading-tight">John Davies</div>
                                  <div className="text-[9px] text-gray-500 font-semibold">Master Plumber · 4.9★</div>
                                </div>
                                <span className="text-[9px] text-gray-400 shrink-0 ml-2">2m ago</span>
                              </div>
                              <p className="text-[10px] text-gray-700 font-medium leading-relaxed">I can start your bathroom project tomorrow morning. Shall we finalize...</p>
                              <div className="mt-2 inline-flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded-lg">
                                <span className="text-[8px] font-bold">Quote: £850</span>
                              </div>
                            </div>
                          </div>

                          {/* Message 2 */}
                          <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-md">
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                SM
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <div className="font-black text-xs text-gray-900 leading-tight">Sarah Mitchell</div>
                                  <div className="text-[9px] text-gray-500 font-semibold">Electrician · 5.0★</div>
                                </div>
                                <span className="text-[9px] text-gray-400 shrink-0 ml-2">1h ago</span>
                              </div>
                              <p className="text-[10px] text-gray-700 leading-relaxed">Thanks for choosing me! I'll bring all necessary equipment for the...</p>
                            </div>
                          </div>

                          {/* Message 3 */}
                          <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-md">
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                MC
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <div className="font-black text-xs text-gray-900 leading-tight">Mike Carter</div>
                                  <div className="text-[9px] text-gray-500 font-semibold">Carpenter · 4.8★</div>
                                </div>
                                <div className="shrink-0 ml-2 flex flex-col items-end">
                                  <span className="text-[9px] text-gray-400">3h ago</span>
                                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-[8px] font-bold mt-1">2</div>
                                </div>
                              </div>
                              <p className="text-[10px] text-gray-700 leading-relaxed">I've reviewed the kitchen specs. Got a few questions about...</p>
                            </div>
                          </div>

                          {/* Message 4 - Loading */}
                          <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-md opacity-50">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse shrink-0"></div>
                            <div className="flex-1">
                              <div className="h-2.5 bg-gray-200 rounded-full w-2/3 mb-2 animate-pulse"></div>
                              <div className="h-2 bg-gray-100 rounded-full w-full mb-1 animate-pulse"></div>
                              <div className="h-2 bg-gray-100 rounded-full w-4/5 animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200">
                          <div className="flex items-center justify-around px-4 py-2.5">
                            <div className="flex flex-col items-center gap-0.5">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              <span className="text-[8px] font-semibold text-gray-400">Home</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <span className="text-[8px] font-semibold text-gray-400">Search</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <div className="w-10 h-10 -mt-5 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                                </svg>
                              </div>
                              <span className="text-[8px] font-semibold text-gray-400">Post</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                              </svg>
                              <span className="text-[8px] font-bold text-primary">Messages</span>
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-[8px] font-semibold text-gray-400">Profile</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-700 rounded-full"></div>
                  </div>

                  {/* Floating Orbs */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-honey text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and tradespeople on BreezyHive
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button href="#download" variant="secondary" size="lg">
              Download App
            </Button>
            <Button href="/business" variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Enterprise Solutions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
