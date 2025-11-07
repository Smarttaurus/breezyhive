'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/DashboardSidebar'

interface Wallet {
  id: string
  tradespersonId: string
  totalBalance: number
  availableBalance: number
  lockedBalance: number
  frozenBalance: number
  pendingBalance: number
  currency: string
  stripeAccountId: string | null
  stripeAccountStatus: string
  hasOutstandingDebt: boolean
}

interface Transaction {
  id: string
  type: string
  status: string
  amount: number
  description: string
  reference: string | null
  createdAt: string
  grossAmount?: number
  platformFee?: number
  netAmount?: number
}

export default function WalletPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showHelpModal, setShowHelpModal] = useState(false)

  useEffect(() => {
    loadWalletData()
  }, [])

  const loadWalletData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/business/login')
        return
      }

      // Get enterprise to find tradesperson_id
      const { data: enterprise } = await supabase
        .from('enterprises')
        .select('tradesperson_id')
        .eq('tradesperson_id', user.id)
        .single()

      if (!enterprise) {
        console.error('No enterprise found')
        setLoading(false)
        return
      }

      // Get wallet
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('tradesperson_id', enterprise.tradesperson_id)
        .maybeSingle()

      if (walletError) {
        console.error('Error loading wallet:', walletError)
      }

      if (walletData) {
        setWallet({
          id: walletData.id,
          tradespersonId: walletData.tradesperson_id,
          totalBalance: parseFloat(walletData.total_balance),
          availableBalance: parseFloat(walletData.available_balance),
          lockedBalance: parseFloat(walletData.locked_balance || 0),
          frozenBalance: parseFloat(walletData.frozen_balance),
          pendingBalance: parseFloat(walletData.pending_balance),
          currency: walletData.currency,
          stripeAccountId: walletData.stripe_account_id,
          stripeAccountStatus: walletData.stripe_account_status,
          hasOutstandingDebt: walletData.has_outstanding_debt || false,
        })

        // Get transactions
        const { data: txData } = await supabase
          .from('wallet_transactions')
          .select('*')
          .eq('tradesperson_id', enterprise.tradesperson_id)
          .order('created_at', { ascending: false })
          .limit(50)

        if (txData) {
          setTransactions(txData.map((tx: any) => ({
            id: tx.id,
            type: tx.type,
            status: tx.status,
            amount: parseFloat(tx.amount),
            description: tx.description,
            reference: tx.reference,
            createdAt: tx.created_at,
            grossAmount: tx.gross_amount ? parseFloat(tx.gross_amount) : undefined,
            platformFee: tx.platform_fee ? parseFloat(tx.platform_fee) : undefined,
            netAmount: tx.net_amount ? parseFloat(tx.net_amount) : undefined,
          })))
        }
      }
    } catch (error) {
      console.error('Error loading wallet data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: wallet?.currency || 'GBP',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment_in':
      case 'credit':
        return '💰'
      case 'debit':
      case 'payout':
        return '💸'
      case 'freeze':
        return '🔒'
      case 'unfreeze':
        return '🔓'
      case 'refund':
        return '↩️'
      case 'dispute':
        return '⚠️'
      default:
        return '💳'
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payment_in':
      case 'credit':
      case 'unfreeze':
        return 'text-green-400'
      case 'debit':
      case 'payout':
      case 'freeze':
        return 'text-red-400'
      case 'refund':
        return 'text-blue-400'
      case 'dispute':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
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
          <p className="text-xl text-gray-300 font-medium">Loading wallet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex">
      <DashboardSidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm mb-2 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">💰 Wallet</h1>
              <p className="text-gray-400">Manage your earnings and payouts</p>
            </div>
            <button
              onClick={() => setShowHelpModal(true)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
            >
              <span className="mr-2">❓</span>
              Help
            </button>
          </div>
        </div>

        {!wallet ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-20 text-center">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Wallet Found</h3>
            <p className="text-gray-400">Your wallet will be created automatically when you receive your first payment.</p>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-primary via-primary/80 to-primary/60 backdrop-blur-xl rounded-[2rem] border border-primary/30 p-10 shadow-2xl shadow-primary/20 mb-8">
              <div className="text-sm font-bold text-white/80 uppercase tracking-wider mb-2">Total Balance</div>
              <div className="text-6xl font-black text-white mb-8">{formatCurrency(wallet.totalBalance)}</div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-16 rounded-full bg-green-400"></div>
                  <div>
                    <div className="text-xs text-white/70 font-semibold mb-1">Available</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(wallet.availableBalance)}</div>
                  </div>
                </div>

                {wallet.lockedBalance > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-16 rounded-full bg-orange-400"></div>
                    <div>
                      <div className="text-xs text-white/70 font-semibold mb-1">Awaiting Completion</div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(wallet.lockedBalance)}</div>
                    </div>
                  </div>
                )}

                {wallet.pendingBalance > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-16 rounded-full bg-blue-400"></div>
                    <div>
                      <div className="text-xs text-white/70 font-semibold mb-1">Pending (7 days)</div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(wallet.pendingBalance)}</div>
                    </div>
                  </div>
                )}

                {wallet.frozenBalance > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-16 rounded-full bg-yellow-400"></div>
                    <div>
                      <div className="text-xs text-white/70 font-semibold mb-1">Frozen</div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(wallet.frozenBalance)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stripe Connect Status */}
            {!wallet.stripeAccountId || wallet.stripeAccountStatus !== 'active' ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">🏦</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Connect Your Bank Account</h3>
                    <p className="text-gray-400 mb-4">
                      {!wallet.stripeAccountId
                        ? 'Connect with Stripe to receive payouts directly to your bank account'
                        : 'Complete your Stripe verification to enable payouts'}
                    </p>
                    <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all inline-flex items-center gap-2">
                      {!wallet.stripeAccountId ? 'Connect Now' : 'Continue Setup'}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">✅</div>
                  <span className="text-green-400 font-semibold text-lg">Stripe Connected</span>
                </div>
                <button className="text-primary hover:text-primary/80 text-sm font-semibold">
                  View Dashboard →
                </button>
              </div>
            )}

            {/* Withdraw Button */}
            <div className="mb-8">
              <button
                disabled={wallet.availableBalance < 10}
                className={`w-full py-6 rounded-2xl font-bold text-xl transition-all ${
                  wallet.availableBalance >= 10
                    ? 'bg-gradient-to-r from-green-500 to-primary hover:from-green-600 hover:to-primary/90 text-white shadow-lg shadow-green-500/30'
                    : 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                💸 Withdraw Funds
                {wallet.availableBalance < 10 && (
                  <span className="text-sm font-normal ml-2">(Minimum £10.00)</span>
                )}
              </button>
            </div>

            {/* Transactions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>

              {transactions.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-white mb-2">No Transactions Yet</h3>
                  <p className="text-gray-400">
                    Your transaction history will appear here once you start receiving payments.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{getTransactionIcon(tx.type)}</div>
                          <div>
                            <div className="text-lg font-bold text-white mb-1">{tx.description}</div>
                            <div className="text-sm text-gray-400">{formatDate(tx.createdAt)}</div>
                            {tx.reference && (
                              <div className="text-xs text-gray-500 mt-1">Ref: {tx.reference}</div>
                            )}
                            {tx.status !== 'completed' && (
                              <div className="mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                  tx.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                                  'bg-gray-500/20 text-gray-300'
                                }`}>
                                  {tx.status.toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getTransactionColor(tx.type)}`}>
                            {['payment_in', 'credit', 'unfreeze'].includes(tx.type) ? '+' : ''}
                            {formatCurrency(Math.abs(tx.amount))}
                          </div>
                          {tx.platformFee && (
                            <div className="text-xs text-gray-500 mt-1">
                              Platform fee: {formatCurrency(tx.platformFee)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Help Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/20 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">About Your Wallet</h2>
                    <p className="text-gray-400">Everything you need to know about payouts and fees</p>
                  </div>
                  <button
                    onClick={() => setShowHelpModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-8 space-y-8" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                {/* Balance Types */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>📊</span>
                    Understanding Your Balance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-1 h-full rounded-full bg-green-400"></div>
                      <div>
                        <div className="font-bold text-white mb-1">Available Balance</div>
                        <div className="text-gray-400 text-sm">Funds ready to withdraw. Minimum withdrawal is £10.00.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1 h-full rounded-full bg-orange-400"></div>
                      <div>
                        <div className="font-bold text-white mb-1">Awaiting Completion</div>
                        <div className="text-gray-400 text-sm">Funds from paid jobs awaiting completion. Will move to pending once you mark the job as complete.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1 h-full rounded-full bg-blue-400"></div>
                      <div>
                        <div className="font-bold text-white mb-1">Pending Balance (7 Days)</div>
                        <div className="text-gray-400 text-sm">Payments being held for 7 days for security. Will move to available once cleared.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1 h-full rounded-full bg-yellow-400"></div>
                      <div>
                        <div className="font-bold text-white mb-1">Frozen Balance</div>
                        <div className="text-gray-400 text-sm">Temporarily held due to disputes. Released when resolved.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Fee */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🧾</span>
                    Platform Fee (15%)
                  </h3>
                  <div className="text-gray-400 text-sm space-y-2">
                    <p>BreezyHive charges a <span className="font-bold text-white">15% platform fee</span> on all job payments. This fee is automatically deducted when funds are added to your wallet.</p>
                    <p className="font-bold text-white">Example:</p>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex justify-between mb-2">
                        <span>Customer pays:</span>
                        <span className="font-bold">£100.00</span>
                      </div>
                      <div className="flex justify-between mb-2 text-red-400">
                        <span>Platform fee (15%):</span>
                        <span className="font-bold">-£15.00</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-green-400">
                        <span className="font-bold">You receive:</span>
                        <span className="font-bold">£85.00</span>
                      </div>
                    </div>
                    <p className="mt-4">The fee covers payment processing, customer support, marketplace operations, and platform maintenance.</p>
                  </div>
                </div>

                {/* 7-Day Holding */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>⏰</span>
                    7-Day Holding Period
                  </h3>
                  <div className="text-gray-400 text-sm space-y-2">
                    <p>For security and quality assurance, funds are held in <span className="font-bold text-blue-400">"Pending"</span> status for 7 days after job completion before becoming available to withdraw.</p>
                    <p className="font-bold text-white">This protects both you and your customers by allowing time for:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Customer to verify work quality</li>
                      <li>Dispute resolution if needed</li>
                      <li>Payment processing and clearance</li>
                      <li>Fraud prevention measures</li>
                    </ul>
                    <p className="mt-4">After 7 days, funds automatically move to your available balance and can be withdrawn immediately.</p>
                  </div>
                </div>

                {/* Security */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🔒</span>
                    Your Money is Safe
                  </h3>
                  <div className="text-gray-400 text-sm space-y-1">
                    <p>✓ Bank-level encryption on all transactions</p>
                    <p>✓ Stripe is PCI-DSS Level 1 certified</p>
                    <p>✓ Two-factor authentication available</p>
                    <p>✓ 24/7 fraud monitoring by Stripe</p>
                    <p>✓ Your funds are held securely until withdrawal</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent border-t border-gray-700/50 px-8 py-6">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-xl font-semibold transition-all"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
