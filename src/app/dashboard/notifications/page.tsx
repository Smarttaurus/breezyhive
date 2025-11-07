'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/DashboardSidebar'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  bookingId: string | null
  jobId: string | null
  actionUrl: string | null
  read: boolean
  readAt: string | null
  createdAt: string
}

export default function NotificationsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    loadNotifications()
  }, [])

  useEffect(() => {
    filterNotifications()
  }, [filter, typeFilter, notifications])

  const loadNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/business/login')
        return
      }

      const { data: notifs } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

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
          readAt: n.read_at,
          createdAt: n.created_at,
        }))

        setNotifications(mapped)
        setFilteredNotifications(mapped)
      }
    } catch (error) {
      console.error('Error loading notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterNotifications = () => {
    let filtered = notifications

    // Filter by read status
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.read)
    } else if (filter === 'read') {
      filtered = filtered.filter(n => n.read)
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === typeFilter)
    }

    setFilteredNotifications(filtered)
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('id', notificationId)

      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true, readAt: new Date().toISOString() } : n)
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase
        .from('notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('read', false)

      setNotifications(prev => prev.map(n => ({ ...n, read: true, readAt: new Date().toISOString() })))
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)

      setNotifications(prev => prev.filter(n => n.id !== notificationId))
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
    return '#'
  }

  const notificationTypes = Array.from(new Set(notifications.map(n => n.type)))
  const unreadCount = notifications.filter(n => !n.read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-300 font-medium">Loading notifications...</p>
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
              <h1 className="text-4xl font-black text-white mb-2">🔔 Notifications</h1>
              <p className="text-gray-400">Stay updated on payments, bookings, and job updates</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
              >
                Mark All as Read ({unreadCount})
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Total Notifications</div>
            <div className="text-3xl font-bold text-white">{notifications.length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Unread</div>
            <div className="text-3xl font-bold text-primary">{unreadCount}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Read</div>
            <div className="text-3xl font-bold text-green-400">{notifications.filter(n => n.read).length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Types</option>
                {notificationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-20 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Notifications</h3>
            <p className="text-gray-400">
              {filter === 'unread' ? 'You have no unread notifications' : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notif) => {
              const link = getNotificationLink(notif)
              const isClickable = link !== '#'

              return (
                <div
                  key={notif.id}
                  className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 transition-all ${
                    !notif.read ? 'border-primary/50 bg-primary/5' : 'border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex gap-6">
                    <div className="text-5xl flex-shrink-0">{getNotificationIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{notif.title}</h3>
                          <p className="text-gray-400 text-sm">{notif.message}</p>
                        </div>
                        {!notif.read && (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-xs font-bold text-primary uppercase">New</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-xs text-gray-500">{formatDate(notif.createdAt)}</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-500 px-2 py-1 bg-white/5 rounded">{notif.type}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {isClickable && (
                        <Link
                          href={link}
                          onClick={() => {
                            if (!notif.read) markAsRead(notif.id)
                          }}
                          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all text-sm text-center"
                        >
                          View Details
                        </Link>
                      )}
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all text-sm"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg font-semibold transition-all text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
