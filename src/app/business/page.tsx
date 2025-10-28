import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { FeatureCard } from '@/components/Card'

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header variant="business" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-honeycomb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              🏢 Enterprise Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Manage Your Team with
              <span className="text-gradient block mt-2">BreezyHive Enterprise</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Complete employee management solution for tradespeople and contractors. Track time, manage expenses, assign jobs, and streamline your business operations.
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-slide-up">
              <Button href="https://enterprise.breezyhive.com/register" size="lg">
                Start Free Trial
              </Button>
              <Button href="#features" variant="secondary" size="lg">
                See Features
              </Button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Active Enterprises</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-gray-600">Managed Employees</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">£500K+</div>
              <div className="text-gray-600">Saved in Labor Costs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Everything You Need to Manage Your Business</h2>
            <p className="section-subtitle">
              Powerful tools designed specifically for trade businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="⏰"
              title="GPS Time Tracking"
              description="Employees clock in/out with GPS location verification. Automatic hours calculation with break tracking and location validation."
              color="blue"
            />
            <FeatureCard
              icon="💰"
              title="Expense Management"
              description="Track supplies, materials, and fuel expenses with receipt photos. Approve or reject claims from your dashboard with one click."
              color="green"
            />
            <FeatureCard
              icon="👥"
              title="Employee Management"
              description="Create and manage employee accounts. Set roles, permissions, and hourly rates from one centralized dashboard."
              color="purple"
            />
            <FeatureCard
              icon="📋"
              title="Job Assignment"
              description="Assign jobs to employees, set priorities, and track progress in real-time through the mobile app with notifications."
              color="yellow"
            />
            <FeatureCard
              icon="📸"
              title="Photo Documentation"
              description="Employees capture before/after photos with GPS stamps. Organize project documentation and share with customers instantly."
              color="red"
            />
            <FeatureCard
              icon="📍"
              title="Location Tracking"
              description="Optional real-time GPS tracking. See where your team is working and optimize job assignments based on proximity."
              color="indigo"
            />
            <FeatureCard
              icon="📊"
              title="Real-Time Reports"
              description="Generate detailed reports on labor costs, project profitability, employee performance, and business metrics."
              color="primary"
            />
            <FeatureCard
              icon="💳"
              title="Payroll Integration"
              description="Export timesheet data for payroll processing. Calculate overtime, breaks, and regular hours automatically."
              color="blue"
            />
            <FeatureCard
              icon="🔔"
              title="Smart Notifications"
              description="Get instant alerts for time entries, expense requests, and job updates. Stay informed without micromanaging."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get your team up and running in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Sign Up & Create Team</h3>
              <p className="text-gray-600">
                Register your business account and create employee profiles with custom credentials in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Employees Get Mobile App</h3>
              <p className="text-gray-600">
                Your team downloads the BreezyHive app and logs in. They can start tracking time and expenses immediately.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-honey text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Manage Everything Here</h3>
              <p className="text-gray-600">
                Track time, approve expenses, assign jobs, and run reports from your web dashboard or mobile app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Businesses Choose BreezyHive</h2>
            <p className="section-subtitle">
              Real results from real businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary/20">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-2xl font-bold mb-3">Reduce Labor Costs</h3>
              <p className="text-gray-600 mb-4">
                GPS time tracking eliminates time theft and buddy punching. Businesses save an average of 15% on labor costs.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">Average savings: £1,200/month per 10 employees</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary/20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Save Admin Time</h3>
              <p className="text-gray-600 mb-4">
                Automated timesheets, expense tracking, and reporting cut administrative work by 70%.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-semibold">Save 20+ hours per month on paperwork</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary/20">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-3">Increase Productivity</h3>
              <p className="text-gray-600 mb-4">
                Better job assignment and tracking helps teams complete 25% more jobs per month.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 font-semibold">Average productivity increase: 25%</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary/20">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-2xl font-bold mb-3">Improve Accountability</h3>
              <p className="text-gray-600 mb-4">
                Photo documentation and GPS tracking create transparency and trust between you and your clients.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-semibold">98% customer satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
              One flat rate. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-honey text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  MOST POPULAR
                </div>
              </div>

              <div className="text-center pt-4">
                <h3 className="text-3xl font-bold mb-2">Enterprise Plan</h3>
                <div className="mb-6">
                  <span className="text-6xl font-bold text-gray-900">£29</span>
                  <span className="text-xl text-gray-600">/month</span>
                </div>

                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Unlimited employees</strong> - No per-user fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>GPS time tracking</strong> - Location verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Expense management</strong> - Track & approve expenses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Job assignment</strong> - Assign & track jobs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Photo documentation</strong> - GPS-stamped photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Real-time reporting</strong> - Business analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Priority support</strong> - Email & chat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Mobile & web access</strong> - iOS & Android apps</span>
                  </li>
                </ul>

                <Button href="https://enterprise.breezyhive.com/register" size="lg" className="w-full mb-4">
                  Start 14-Day Free Trial
                </Button>

                <p className="text-sm text-gray-500">
                  No credit card required • Free for 14 days • Cancel anytime
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Need a custom plan for larger teams?</p>
              <Button href="#contact" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What Business Owners Say</h2>
            <p className="section-subtitle">
              Hear from contractors who transformed their operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "BreezyHive completely changed how we manage our team. The GPS time tracking alone saved us £2,000 in the first month. Best investment we've made."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-bold text-lg">James McDonald</div>
                  <div className="text-gray-500">Owner, McDonald Plumbing Ltd</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "We manage 15 electricians across 3 cities. Before BreezyHive, tracking everyone was a nightmare. Now I can see everything in real-time from my phone."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-bold text-lg">Rachel Thompson</div>
                  <div className="text-gray-500">Director, Thompson Electrical</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">How many employees can I add?</h3>
              <p className="text-gray-600">
                Unlimited! There are no per-user fees. Add as many employees as you need for one flat monthly rate of £29.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Is there really a free trial?</h3>
              <p className="text-gray-600">
                Yes! You get full access to all features for 14 days. No credit card required to start. Cancel anytime with no penalties.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">How does GPS time tracking work?</h3>
              <p className="text-gray-600">
                When employees clock in/out via the mobile app, their GPS location is recorded. You can set job site boundaries and get alerts if someone clocks in from the wrong location.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Can employees use their own phones?</h3>
              <p className="text-gray-600">
                Yes! The BreezyHive mobile app works on both iOS and Android. Employees download it for free and log in with their credentials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">What if I need help getting started?</h3>
              <p className="text-gray-600">
                We provide comprehensive onboarding support. Our team will help you set up your account, add employees, and get everyone trained on the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-honey text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of contractors saving time and money with BreezyHive
          </p>
          <Button href="https://enterprise.breezyhive.com/register" variant="secondary" size="lg">
            Start Your Free Trial
          </Button>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • 14-day trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
