import Link from 'next/link'

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl">🐝</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">BreezyHive</span>
          </Link>
          <div className="flex gap-4">
            <Link
              href="/business/login"
              className="px-6 py-2 text-gray-700 hover:text-primary font-medium transition"
            >
              Login
            </Link>
            <Link
              href="/business/login"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Team with
            <span className="text-primary"> BreezyHive Enterprise</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete employee management solution for tradespeople and contractors. Track time, manage expenses, assign jobs, and streamline your business operations.
          </p>
          <Link
            href="/business/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition text-lg"
          >
            Start Managing Your Team
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Manage Your Business</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">⏰</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Time Tracking</h3>
            <p className="text-gray-600">
              Employees clock in/out with GPS location verification. Automatic hours calculation with break tracking.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Expense Management</h3>
            <p className="text-gray-600">
              Track supplies and fuel expenses with receipt photos. Approve or reject claims from your dashboard.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Employee Management</h3>
            <p className="text-gray-600">
              Create and manage employee accounts. Set roles, permissions, and hourly rates from one dashboard.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Job Assignment</h3>
            <p className="text-gray-600">
              Assign jobs to employees, set priorities, and track progress in real-time through the mobile app.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Photo Documentation</h3>
            <p className="text-gray-600">
              Employees capture before/after photos with GPS stamps. Organize and share with customers.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📍</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Location Tracking</h3>
            <p className="text-gray-600">
              Optional real-time GPS tracking. See where your team is and optimize job assignments.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up & Create Team</h3>
              <p className="text-gray-600">
                Register your business and create employee accounts with custom passwords.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Employees Get Mobile App</h3>
              <p className="text-gray-600">
                Your team downloads the BreezyHive app and logs in with their credentials.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Manage Everything Here</h3>
              <p className="text-gray-600">
                Track time, approve expenses, assign jobs, and run reports from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          No hidden fees. Cancel anytime.
        </p>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-primary">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">£29</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Unlimited employees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Time tracking with GPS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Expense management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Job assignment & tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Photo documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Real-time reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <Link
              href="/business/login"
              className="block w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition text-center"
            >
              Start Free Trial
            </Link>
            <p className="text-sm text-gray-500 mt-4">14-day free trial. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses streamlining their operations with BreezyHive
          </p>
          <Link
            href="/business/login"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg">🐝</span>
                </div>
                <span className="text-xl font-bold text-white">BreezyHive</span>
              </div>
              <p className="text-sm">
                Enterprise solutions for modern tradespeople and contractors.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/business" className="hover:text-primary transition">Features</Link></li>
                <li><Link href="/business" className="hover:text-primary transition">Pricing</Link></li>
                <li><Link href="/business" className="hover:text-primary transition">Mobile App</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 BreezyHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
