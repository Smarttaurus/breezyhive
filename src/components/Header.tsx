import Link from 'next/link'
import BeeIcon from './BeeIcon'
import Button from './Button'

interface HeaderProps {
  variant?: 'default' | 'business'
}

export default function Header({ variant = 'default' }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <BeeIcon size={40} />
          <span className="text-2xl font-bold text-gray-900">BreezyHive</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {variant === 'default' ? (
            <>
              <Link href="/#features" className="text-gray-700 hover:text-primary font-medium transition">
                Features
              </Link>
              <Link href="/#how-it-works" className="text-gray-700 hover:text-primary font-medium transition">
                How It Works
              </Link>
              <Link href="/business" className="text-gray-700 hover:text-primary font-medium transition">
                For Business
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-primary font-medium transition">
                Login
              </Link>
              <Button href="/business/register" size="sm">
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Link href="/" className="text-gray-700 hover:text-primary font-medium transition">
                Home
              </Link>
              <Link href="/business#features" className="text-gray-700 hover:text-primary font-medium transition">
                Features
              </Link>
              <Link href="/business#pricing" className="text-gray-700 hover:text-primary font-medium transition">
                Pricing
              </Link>
              <Link href="/business/login" className="text-gray-700 hover:text-primary font-medium transition">
                Login
              </Link>
              <Button href="/business/register" size="sm">
                Start Free Trial
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
