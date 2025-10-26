import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl">🐝</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">BreezyHive</span>
          </div>
          <div className="flex gap-6">
            <Link href="/business" className="text-gray-700 hover:text-primary font-medium transition">
              For Business
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-primary font-medium transition">
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Connect with Skilled
          <span className="text-primary"> Tradespeople</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Find trusted professionals for your projects. Manage your team with enterprise solutions.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/business"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            Enterprise Solutions
          </Link>
          <Link
            href="#download"
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition border border-gray-200"
          >
            Download App
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👷</span>
            </div>
            <h3 className="text-xl font-bold mb-2">For Customers</h3>
            <p className="text-gray-600">
              Find and hire skilled tradespeople for your projects with confidence.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔨</span>
            </div>
            <h3 className="text-xl font-bold mb-2">For Tradespeople</h3>
            <p className="text-gray-600">
              Grow your business, manage jobs, and get paid securely.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-bold mb-2">For Business</h3>
            <p className="text-gray-600">
              Manage your team, track time, expenses, and streamline operations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses managing their teams with BreezyHive
          </p>
          <Link
            href="/business"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-lg">🐝</span>
            </div>
            <span className="text-xl font-bold text-white">BreezyHive</span>
          </div>
          <p>© 2025 BreezyHive. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
