'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Employees', href: '/dashboard/employees', icon: '👥' },
    { name: 'Jobs', href: '/dashboard/jobs', icon: '🔧' },
    { name: 'Time Entries', href: '/dashboard/time-entries', icon: '⏰' },
    { name: 'Expenses', href: '/dashboard/expenses', icon: '💰' },
    { name: 'Wallet', href: '/dashboard/wallet', icon: '💳' },
    { name: 'Marketplace', href: '/dashboard/marketplace', icon: '🏪' },
    { name: 'Reports', href: '/dashboard/reports', icon: '📈' },
  ]

  return (
    <div className={`fixed left-0 top-0 h-screen bg-[#0f1729] border-r border-white/10 transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">🐝</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">BreezyHive</h1>
              <p className="text-gray-500 text-xs">Enterprise</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">🐝</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-semibold text-sm">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 bg-[#0f1729] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
      >
        <svg
          className={`w-3 h-3 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <Link
          href="/business/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          title={isCollapsed ? 'Logout' : undefined}
        >
          <span className="text-xl flex-shrink-0">🚪</span>
          {!isCollapsed && (
            <span className="font-semibold text-sm">Logout</span>
          )}
        </Link>
      </div>
    </div>
  )
}
