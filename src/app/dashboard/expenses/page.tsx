'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ExpenseApprovalModal } from '@/components/ExpenseApprovalModal'
import type { EmployeeSupply, EmployeeFuelEntry, ExpenseStatus } from '@/types/database.types'

type CombinedExpense = (EmployeeSupply | EmployeeFuelEntry) & {
  expense_type: 'supply' | 'fuel';
  employee: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
  };
  job?: {
    title: string;
    location: string;
  };
}

export default function ExpensesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null)
  const [expenses, setExpenses] = useState<CombinedExpense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<CombinedExpense[]>([])
  const [selectedExpense, setSelectedExpense] = useState<CombinedExpense | null>(null)

  // Filters
  const [statusFilter, setStatusFilter] = useState<ExpenseStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'supply' | 'fuel'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<'all' | '7days' | '30days' | '90days'>('all')

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    reimbursed: 0,
    totalAmount: 0,
    pendingAmount: 0,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (enterpriseId) {
      loadExpenses()
    }
  }, [enterpriseId])

  useEffect(() => {
    applyFilters()
  }, [expenses, statusFilter, typeFilter, searchQuery, dateRange])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/business/login')
        return
      }

      // Get enterprise
      const { data: enterprise, error } = await supabase
        .from('enterprises')
        .select('id')
        .eq('tradesperson_id', user.id)
        .single()

      if (error || !enterprise) {
        console.error('No enterprise found:', error)
        router.push('/business/register')
        return
      }

      setEnterpriseId(enterprise.id)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/business/login')
    }
  }

  const loadExpenses = async () => {
    if (!enterpriseId) return

    setLoading(true)
    try {
      // Load supplies
      const { data: supplies, error: suppliesError } = await supabase
        .from('employee_supplies')
        .select(`
          *,
          employee:enterprise_employees!employee_supplies_employee_id_fkey (
            first_name,
            last_name,
            email,
            avatar_url
          ),
          job:enterprise_jobs!employee_supplies_job_id_fkey (
            title,
            location
          )
        `)
        .eq('enterprise_id', enterpriseId)
        .order('purchase_date', { ascending: false })

      if (suppliesError) throw suppliesError

      // Load fuel entries
      const { data: fuelEntries, error: fuelError } = await supabase
        .from('employee_fuel_entries')
        .select(`
          *,
          employee:enterprise_employees!employee_fuel_entries_employee_id_fkey (
            first_name,
            last_name,
            email,
            avatar_url
          ),
          job:enterprise_jobs!employee_fuel_entries_job_id_fkey (
            title,
            location
          )
        `)
        .eq('enterprise_id', enterpriseId)
        .order('fuel_date', { ascending: false })

      if (fuelError) throw fuelError

      // Combine and type
      const combinedExpenses: CombinedExpense[] = [
        ...(supplies || []).map(s => ({
          ...s,
          expense_type: 'supply' as const,
          employee: Array.isArray(s.employee) ? s.employee[0] : s.employee,
          job: Array.isArray(s.job) ? s.job[0] : s.job,
        })),
        ...(fuelEntries || []).map(f => ({
          ...f,
          expense_type: 'fuel' as const,
          employee: Array.isArray(f.employee) ? f.employee[0] : f.employee,
          job: Array.isArray(f.job) ? f.job[0] : f.job,
        }))
      ]

      // Sort by date
      combinedExpenses.sort((a, b) => {
        const dateA = new Date(a.expense_type === 'supply' ? (a as EmployeeSupply).purchase_date : (a as EmployeeFuelEntry).fuel_date)
        const dateB = new Date(b.expense_type === 'supply' ? (b as EmployeeSupply).purchase_date : (b as EmployeeFuelEntry).fuel_date)
        return dateB.getTime() - dateA.getTime()
      })

      setExpenses(combinedExpenses)
      calculateStats(combinedExpenses)
    } catch (error) {
      console.error('Error loading expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (expensesList: CombinedExpense[]) => {
    const stats = {
      total: expensesList.length,
      pending: expensesList.filter(e => e.status === 'pending').length,
      approved: expensesList.filter(e => e.status === 'approved').length,
      rejected: expensesList.filter(e => e.status === 'rejected').length,
      reimbursed: expensesList.filter(e => e.status === 'reimbursed').length,
      totalAmount: expensesList.reduce((sum, e) => sum + getExpenseAmount(e), 0),
      pendingAmount: expensesList
        .filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + getExpenseAmount(e), 0),
    }
    setStats(stats)
  }

  const getExpenseAmount = (expense: CombinedExpense): number => {
    return expense.expense_type === 'supply'
      ? (expense as EmployeeSupply).amount
      : (expense as EmployeeFuelEntry).total_amount
  }

  const getExpenseDate = (expense: CombinedExpense): Date => {
    return new Date(expense.expense_type === 'supply'
      ? (expense as EmployeeSupply).purchase_date
      : (expense as EmployeeFuelEntry).fuel_date)
  }

  const applyFilters = () => {
    let filtered = [...expenses]

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter)
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(e => e.expense_type === typeFilter)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(e => {
        const employeeName = `${e.employee.first_name} ${e.employee.last_name}`.toLowerCase()
        const description = e.expense_type === 'supply'
          ? (e as EmployeeSupply).supplier_name.toLowerCase()
          : (e as EmployeeFuelEntry).station_name.toLowerCase()

        return employeeName.includes(query) || description.includes(query)
      })
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date()
      const daysMap = { '7days': 7, '30days': 30, '90days': 90 }
      const days = daysMap[dateRange as keyof typeof daysMap]
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

      filtered = filtered.filter(e => getExpenseDate(e) >= cutoffDate)
    }

    setFilteredExpenses(filtered)
  }

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Type',
      'Employee',
      'Description',
      'Amount (£)',
      'Status',
      'Job',
    ]

    const rows = filteredExpenses.map(e => [
      getExpenseDate(e).toLocaleDateString('en-GB'),
      e.expense_type === 'supply' ? 'Supply' : 'Fuel',
      `${e.employee.first_name} ${e.employee.last_name}`,
      e.expense_type === 'supply'
        ? (e as EmployeeSupply).supplier_name
        : (e as EmployeeFuelEntry).station_name,
      getExpenseAmount(e).toFixed(2),
      e.status,
      e.job?.title || 'N/A',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading expenses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">💰 Expenses</h1>
              <p className="text-gray-400">Manage and approve employee expense claims</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={exportToCSV}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-600/30"
              >
                📥 Export CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent rounded-2xl p-4 border border-blue-500/20">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Claims</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/10 via-yellow-500/5 to-transparent rounded-2xl p-4 border border-yellow-500/20">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.pending}</div>
              <div className="text-sm text-gray-400">Pending</div>
              <div className="text-xs text-yellow-400 mt-1">£{stats.pendingAmount.toFixed(2)}</div>
            </div>
            <div className="bg-gradient-to-br from-green-600/10 via-green-500/5 to-transparent rounded-2xl p-4 border border-green-500/20">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-3xl font-bold text-white mb-1">{stats.approved}</div>
              <div className="text-sm text-gray-400">Approved</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent rounded-2xl p-4 border border-orange-500/20">
              <div className="text-2xl mb-1">💷</div>
              <div className="text-3xl font-bold text-white mb-1">£{stats.totalAmount.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Total Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="all" className="bg-gray-800">All Statuses</option>
                <option value="pending" className="bg-gray-800">Pending</option>
                <option value="approved" className="bg-gray-800">Approved</option>
                <option value="rejected" className="bg-gray-800">Rejected</option>
                <option value="reimbursed" className="bg-gray-800">Reimbursed</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="all" className="bg-gray-800">All Types</option>
                <option value="supply" className="bg-gray-800">Supplies</option>
                <option value="fuel" className="bg-gray-800">Fuel</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="all" className="bg-gray-800">All Time</option>
                <option value="7days" className="bg-gray-800">Last 7 Days</option>
                <option value="30days" className="bg-gray-800">Last 30 Days</option>
                <option value="90days" className="bg-gray-800">Last 90 Days</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Search</label>
              <input
                type="text"
                placeholder="Employee or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-400">
          Showing {filteredExpenses.length} of {expenses.length} expenses
        </div>

        {/* Expenses Table */}
        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Job</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((expense) => (
                    <tr
                      key={`${expense.expense_type}-${expense.id}`}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedExpense(expense)}
                    >
                      <td className="px-6 py-4 text-sm text-white">
                        {getExpenseDate(expense).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                            {expense.employee.first_name[0]}{expense.employee.last_name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {expense.employee.first_name} {expense.employee.last_name}
                            </div>
                            <div className="text-xs text-gray-400">{expense.employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          expense.expense_type === 'supply'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {expense.expense_type === 'supply' ? '🛠️ Supply' : '⛽ Fuel'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {expense.expense_type === 'supply'
                          ? (expense as EmployeeSupply).supplier_name
                          : (expense as EmployeeFuelEntry).station_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        £{getExpenseAmount(expense).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          expense.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          expense.status === 'approved' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          expense.status === 'rejected' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {expense.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {expense.job?.title || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedExpense(expense)
                          }}
                          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold transition-all"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Expense Approval Modal */}
      {selectedExpense && (
        <ExpenseApprovalModal
          expense={selectedExpense}
          isOpen={!!selectedExpense}
          onClose={() => setSelectedExpense(null)}
          onSuccess={() => {
            setSelectedExpense(null)
            loadExpenses()
          }}
        />
      )}
    </div>
  )
}
