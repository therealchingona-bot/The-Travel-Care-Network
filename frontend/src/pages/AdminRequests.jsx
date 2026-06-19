import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { bookingsAPI } from '../api/client'

export default function AdminRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await bookingsAPI.list({ status: 'pending' })
        setRequests(Array.isArray(data) ? data : data.bookings || [])
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [])

  const handleAssign = async (id, caregiverId) => {
    try {
      await bookingsAPI.updateStatus(id, 'confirmed')
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'confirmed' } : r))
    } catch (_) {}
  }

  return (
    <AdminLayout title="Traveler Requests">
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>
        Review and manually match travelers with suitable providers. These bookings need admin approval.
      </p>
      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : requests.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', padding: 40, textAlign: 'center' }}>No pending requests.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {requests.map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: 'var(--white)', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Booking #{r.id?.toString().slice(0, 8)}</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {r.client_name || r.client?.name || 'Client'} wants {r.caregiver_name || r.caregiver?.name || 'a provider'}
                  {' · '}{r.start_date?.slice(0, 10)} to {r.end_date?.slice(0, 10)}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <select className="form-control" style={{ width: 180, fontSize: 13 }} defaultValue="">
                  <option value="" disabled>Assign provider...</option>
                </select>
                <button className="btn btn-primary btn-sm" onClick={() => handleAssign(r.id)}>Confirm Match</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}