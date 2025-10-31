'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { EmployeeSupply, EmployeeFuelEntry } from '@/types/database.types'

interface ExpenseApprovalModalProps {
  expense: (EmployeeSupply | EmployeeFuelEntry) & {
    expense_type: 'supply' | 'fuel';
    employee: { first_name: string; last_name: string };
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ExpenseApprovalModal({ expense, isOpen, onClose, onSuccess }: ExpenseApprovalModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [action, setAction] = useState<'approve' | 'reject' | null>(null)

  if (!isOpen) return null

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      const table = expense.expense_type === 'supply' ? 'employee_supplies' : 'employee_fuel_entries'

      const { error } = await supabase
        .from(table)
        .update({ status: 'approved' })
        .eq('id', expense.id)

      if (error) throw error

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error approving expense:', error)
      alert('Failed to approve expense')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }

    setIsLoading(true)
    try {
      const table = expense.expense_type === 'supply' ? 'employee_supplies' : 'employee_fuel_entries'

      const { error } = await supabase
        .from(table)
        .update({
          status: 'rejected',
          notes: expense.notes ? `${expense.notes}\n\nRejection reason: ${rejectionReason}` : `Rejection reason: ${rejectionReason}`
        })
        .eq('id', expense.id)

      if (error) throw error

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error rejecting expense:', error)
      alert('Failed to reject expense')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkReimbursed = async () => {
    setIsLoading(true)
    try {
      const table = expense.expense_type === 'supply' ? 'employee_supplies' : 'employee_fuel_entries'

      const { error } = await supabase
        .from(table)
        .update({ status: 'reimbursed' })
        .eq('id', expense.id)

      if (error) throw error

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error marking expense as reimbursed:', error)
      alert('Failed to update expense')
    } finally {
      setIsLoading(false)
    }
  }

  const getReceiptUrls = (): string[] => {
    if (expense.expense_type === 'supply') {
      return (expense as EmployeeSupply).receipt_photo_urls || []
    } else {
      const url = (expense as EmployeeFuelEntry).receipt_photo_url
      return url ? [url] : []
    }
  }

  const receiptUrls = getReceiptUrls()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-transparent border-b border-orange-500/20 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {expense.expense_type === 'supply' ? '🛠️ Supply Expense' : '⛽ Fuel Expense'}
              </h2>
              <p className="text-gray-400">
                Submitted by {expense.employee.first_name} {expense.employee.last_name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 space-y-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              expense.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
              expense.status === 'approved' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
              expense.status === 'rejected' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
              'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {expense.status.toUpperCase()}
            </span>
            <span className="text-gray-400 text-sm">
              {new Date(expense.expense_type === 'supply' ? (expense as EmployeeSupply).purchase_date : (expense as EmployeeFuelEntry).fuel_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Amount */}
          <div className="bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent rounded-2xl p-6 border border-orange-500/20">
            <div className="text-sm text-gray-400 mb-2">Total Amount</div>
            <div className="text-4xl font-bold text-white">
              £{(expense.expense_type === 'supply' ? (expense as EmployeeSupply).amount : (expense as EmployeeFuelEntry).total_amount).toFixed(2)}
            </div>
            {expense.expense_type === 'supply' && (expense as EmployeeSupply).tax_amount && (
              <div className="text-sm text-gray-400 mt-2">
                Includes £{((expense as EmployeeSupply).tax_amount || 0).toFixed(2)} tax
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {expense.expense_type === 'supply' ? (
              <>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Supplier</div>
                  <div className="text-white font-semibold">{(expense as EmployeeSupply).supplier_name}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Category</div>
                  <div className="text-white font-semibold capitalize">{(expense as EmployeeSupply).category}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Quantity</div>
                  <div className="text-white font-semibold">{(expense as EmployeeSupply).quantity} {(expense as EmployeeSupply).unit}</div>
                </div>
                {(expense as EmployeeSupply).invoice_number && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xs text-gray-400 mb-1">Invoice #</div>
                    <div className="text-white font-semibold">{(expense as EmployeeSupply).invoice_number}</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Station</div>
                  <div className="text-white font-semibold">{(expense as EmployeeFuelEntry).station_name}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Fuel Type</div>
                  <div className="text-white font-semibold capitalize">{(expense as EmployeeFuelEntry).fuel_type}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Litres</div>
                  <div className="text-white font-semibold">{(expense as EmployeeFuelEntry).litres.toFixed(2)}L</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Price per Litre</div>
                  <div className="text-white font-semibold">£{(expense as EmployeeFuelEntry).price_per_litre.toFixed(3)}</div>
                </div>
                {(expense as EmployeeFuelEntry).vehicle_registration && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xs text-gray-400 mb-1">Vehicle</div>
                    <div className="text-white font-semibold">{(expense as EmployeeFuelEntry).vehicle_registration}</div>
                  </div>
                )}
                {(expense as EmployeeFuelEntry).odometer_reading && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xs text-gray-400 mb-1">Odometer</div>
                    <div className="text-white font-semibold">{(expense as EmployeeFuelEntry).odometer_reading.toLocaleString()} miles</div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Description */}
          {expense.expense_type === 'supply' && (expense as EmployeeSupply).description && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 mb-2">Description</div>
              <div className="text-white">{(expense as EmployeeSupply).description}</div>
            </div>
          )}

          {/* Notes */}
          {expense.notes && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 mb-2">Notes</div>
              <div className="text-white">{expense.notes}</div>
            </div>
          )}

          {/* Receipt Images */}
          {receiptUrls.length > 0 && (
            <div>
              <div className="text-sm text-gray-400 mb-3">Receipt Images</div>
              <div className="grid grid-cols-2 gap-4">
                {receiptUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all"
                  >
                    <img
                      src={url}
                      alt={`Receipt ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-sm font-semibold">View Full Size →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Rejection Reason Input (only visible when rejecting) */}
          {action === 'reject' && (
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <label className="block text-sm font-semibold text-red-300 mb-2">
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full bg-white/10 border border-red-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                placeholder="Explain why this expense is being rejected..."
                rows={3}
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent border-t border-gray-700/50 px-8 py-6">
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
              disabled={isLoading}
            >
              Cancel
            </button>

            {expense.status === 'pending' && (
              <>
                <button
                  onClick={() => {
                    if (action === 'reject') {
                      handleReject()
                    } else {
                      setAction('reject')
                    }
                  }}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-red-600/30"
                  disabled={isLoading}
                >
                  {isLoading && action === 'reject' ? 'Rejecting...' : action === 'reject' ? 'Confirm Reject' : 'Reject'}
                </button>
                <button
                  onClick={handleApprove}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-600/30"
                  disabled={isLoading}
                >
                  {isLoading && action !== 'reject' ? 'Approving...' : 'Approve'}
                </button>
              </>
            )}

            {expense.status === 'approved' && (
              <button
                onClick={handleMarkReimbursed}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Mark as Reimbursed'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
