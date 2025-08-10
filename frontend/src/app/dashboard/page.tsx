'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface DashboardData {
  user: {
    id: string
    email: string
  }
  data: {
    stats: {
      totalUsers: number
      activeUsers: number
      revenue: number
      growth: number
    }
    recentActivity: {
      id: number
      action: string
      timestamp: string
      user: string
    }[]
  }
  message: string
}

export default function Dashboard() {
  const { user, session, loading: authLoading } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.access_token) return

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const response = await fetch(`${apiUrl}/api/dashboard-data`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        setError('Failed to fetch dashboard data')
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user && session) {
      fetchDashboardData()
    }
  }, [user, session])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}</p>
          </div>

          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          ) : dashboardData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {dashboardData.data.stats.totalUsers.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Users</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {dashboardData.data.stats.activeUsers.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-2xl font-bold text-gray-900">
                    ${dashboardData.data.stats.revenue.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Revenue</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-2xl font-bold text-green-600">
                    +{dashboardData.data.stats.growth}%
                  </div>
                  <div className="text-gray-600">Growth</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">User Profile</h2>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-900">{user.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">User ID:</span>
                      <span className="ml-2 text-gray-900 font-mono text-sm">{user.id}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Created:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Sign In:</span>
                      <span className="ml-2 text-gray-900">
                        {user.last_sign_in_at
                          ? new Date(user.last_sign_in_at).toLocaleString()
                          : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {dashboardData.data.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.user}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}