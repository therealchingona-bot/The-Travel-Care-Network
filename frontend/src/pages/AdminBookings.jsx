import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { bookingsAPI } from '../api/client'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await bookingsAPI.list()
        setBookings(Array.isArray(data) ? data : data.bookings || [])
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [])

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingsAPI.updateStatus(id, status)
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    } catch (_) {}
  }

  const filtered = filter ? bookings.filter(b => b.status === filter) : bookings

  return (
    <AdminLayout title="All Bookings">
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <select className="form-control" style={{ width: 200 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <span style={{ color: 'var(--text-muted)', fontSize: 14, alignSelf: 'center' }}>{filtered.length} bookings</span>
      </div>
      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', padding: 40, textAlign: 'center' }}>No bookings found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-light)', textAlign: 'left' }}>
              <th style={{ padding: 10, fontSize: 13 }}>ID</th>
              <th style={{ padding: 10, fontSize: 13 }}>Client</th>
              <th style={{ padding: 10, fontSize: 13 }}>Provider</th>
              <th style={{ padding: 10, fontSize: 13 }}>Category</th>
              <th style={{ padding: 10, fontSize: 13 }}>Dates</th>
              <th style={{ padding: 10, fontSize: 13 }}>Amount</th>
              <th style={{ padding: 10, fontSize: 13 }}>Status</th>
              <th style={{ padding: 10, fontSize: 13 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10, fontSize: 13 }}>#{b.id?.toString().slice(0, 8)}</td>
                <td style={{ padding: 10, fontSize: 13 }}>{b.client_name || b.client?.name || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>{b.caregiver_name || b.caregiver?.name || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>{b.service_category || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>{b.start_date?.slice(0, 10) || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>${b.total_amount || 0}</td>
                <td style={{ padding: 10, fontSize: 13 }}>
                  <span className={`status-tag status-${b.status === 'completed' || b.status === 'active' ? 'verified' : b.status === 'pending' || b.status === 'upcoming' ? 'pending' : 'rejected'}`}>{b.status}</span>
                </td>
                <td style={{ padding: 10, fontSize: 13 }}>
                  {(b.status === 'pending' || b.status === 'confirmed') && (
                    <button className="btn btn-primary btn-sm" onClick={() => handleStatusUpdate(b.id, 'active')}>Activate</button>
                  )}
                  {b.status === 'active' && (
                    <button className="btn btn-outline btn-sm" onClick={() => handleStatusUpdate(b.id, 'completed')}>Complete</button>
                  )}
                  {(b.status === 'pending' || b.status === 'upcoming') && (
                    <button className="btn btn-outline btn-sm" style={{ marginLeft: 4 }} onClick={() => handleStatusUpdate(b.id, 'cancelled')}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}