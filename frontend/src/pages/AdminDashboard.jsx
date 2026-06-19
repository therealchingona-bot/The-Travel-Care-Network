import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { bookingsAPI, caregiversAPI } from '../api/client'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0, activeBookings: 0,
    pendingRequests: 0, totalProviders: 0,
    totalUsers: 0, revenue: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const [bData, pData] = await Promise.allSettled([
          bookingsAPI.list(),
          caregiversAPI.list(),
        ])
        const bookings = bData.status === 'fulfilled'
          ? (Array.isArray(bData.value.data) ? bData.value.data : bData.value.data.bookings || [])
          : []
        const providers = pData.status === 'fulfilled'
          ? (Array.isArray(pData.value.data) ? pData.value.data : pData.value.data.caregivers || [])
          : []

        setStats({
          totalBookings: bookings.length,
          activeBookings: bookings.filter(b => b.status === 'active' || b.status === 'in-progress').length,
          pendingRequests: bookings.filter(b => b.status === 'pending' || b.status === 'upcoming').length,
          totalProviders: providers.length,
          totalUsers: new Set(bookings.map(b => b.client_id || b.client?.id).filter(Boolean)).size + providers.length,
          revenue: bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.total_amount || 0), 0) * 0.15,
        })
        setRecentBookings(bookings.slice(0, 5))
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [])

  const statCards = [
    { label: 'Total Bookings', value: stats.totalBookings, color: 'var(--primary-teal)' },
    { label: 'Active Now', value: stats.activeBookings, color: 'var(--success-green)' },
    { label: 'Pending Requests', value: stats.pendingRequests, color: 'var(--accent-yellow)' },
    { label: 'Providers', value: stats.totalProviders, color: 'var(--secondary-coral)' },
    { label: 'Total Users', value: stats.totalUsers, color: 'var(--text-dark)' },
    { label: 'Revenue (est.)', value: `$${Math.round(stats.revenue)}`, color: 'var(--success-green)' },
  ]

  return (
    <AdminLayout title="Dashboard Overview">
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading stats...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
            {statCards.map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center', padding: 24 }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: 13 }}>{s.label}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginBottom: 16, fontSize: 18 }}>Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No bookings yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-light)', textAlign: 'left' }}>
                  <th style={{ padding: 10, fontSize: 13 }}>ID</th>
                  <th style={{ padding: 10, fontSize: 13 }}>Client</th>
                  <th style={{ padding: 10, fontSize: 13 }}>Provider</th>
                  <th style={{ padding: 10, fontSize: 13 }}>Dates</th>
                  <th style={{ padding: 10, fontSize: 13 }}>Status</th>
                  <th style={{ padding: 10, fontSize: 13 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 10, fontSize: 13 }}>#{b.id?.toString().slice(0, 8)}</td>
                    <td style={{ padding: 10, fontSize: 13 }}>{b.client_name || b.client?.name || '—'}</td>
                    <td style={{ padding: 10, fontSize: 13 }}>{b.caregiver_name || b.caregiver?.name || '—'}</td>
                    <td style={{ padding: 10, fontSize: 13 }}>{b.start_date?.slice(0, 10) || '—'}</td>
                    <td style={{ padding: 10, fontSize: 13 }}><span className={`status-tag status-${b.status === 'active' || b.status === 'in-progress' ? 'verified' : b.status === 'completed' ? 'verified' : 'pending'}`}>{b.status}</span></td>
                    <td style={{ padding: 10, fontSize: 13 }}>${b.total_amount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </AdminLayout>
  )
}