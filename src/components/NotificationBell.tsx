'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  bookingId: string | null
  jobId: string | null
  actionUrl: string | null
  read: boolean
  createdAt: string
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    loadNotifications()

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        () => {
          loadNotifications()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const loadNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      // Get notifications for this user
      const { data: notifs } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (notifs) {
        const mapped = notifs.map((n: any) => ({
          id: n.id,
          title: n.title,
          message: n.message,
          type: n.type,
          bookingId: n.booking_id,
          jobId: n.job_id,
          actionUrl: n.action_url,
          read: n.read,
          createdAt: n.created_at,
        }))

        setNotifications(mapped)
        setUnreadCount(mapped.filter(n => !n.read).length)
      }
    } catch (error) {
      console.error('Error loading notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('id', notificationId)

      // Update local state
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    if (!userId) return

    try {
      await supabase
        .from('notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('read', false)

      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`

    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
      case 'payment_received':
        return '💰'
      case 'booking':
      case 'booking_confirmed':
        return '📅'
      case 'job_completed':
        return '✅'
      case 'message':
        return '💬'
      case 'review':
        return '⭐'
      case 'alert':
        return '⚠️'
      default:
        return '🔔'
    }
  }

  const getNotificationLink = (notif: Notification) => {
    if (notif.actionUrl) return notif.actionUrl
    if (notif.bookingId) return `/dashboard/bookings/${notif.bookingId}`
    if (notif.jobId) return `/dashboard/jobs/${notif.jobId}`
    return '/dashboard/notifications'
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-3 rounded-xl hover:bg-white/5 transition-all"
      >
        <svg
          className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </div>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-[#0f1729] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary hover:text-primary/80 font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-400 text-sm mt-2">Loading...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-5xl mb-3">🔔</div>
                  <p className="text-gray-400 font-semibold">No notifications</p>
                  <p className="text-gray-500 text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notif) => (
                    <Link
                      key={notif.id}
                      href={getNotificationLink(notif)}
                      onClick={() => {
                        if (!notif.read) markAsRead(notif.id)
                        setShowDropdown(false)
                      }}
                      className={`block px-6 py-4 border-b border-white/10 transition-all hover:bg-white/5 ${
                        !notif.read ? 'bg-primary/10' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="text-3xl flex-shrink-0">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-white font-semibold text-sm line-clamp-1">
                              {notif.title}
                            </h4>
                            {!notif.read && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1"></div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                            {notif.message}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {formatDate(notif.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="bg-white/5 border-t border-white/10 p-4">
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setShowDropdown(false)}
                  className="block text-center text-primary hover:text-primary/80 font-semibold text-sm"
                >
                  View All Notifications
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
