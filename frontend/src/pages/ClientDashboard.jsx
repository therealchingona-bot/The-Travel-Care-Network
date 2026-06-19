import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bookingsAPI, authAPI, verificationAPI } from '../api/client'
import { getCategoryIcon, getCategoryLabel } from '../api/categories'

export default function ClientDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [verification, setVerification] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const [bData, pData, vData] = await Promise.allSettled([
          bookingsAPI.list({ role: 'client' }),
          authAPI.getProfile(),
          verificationAPI.getStatus(),
        ])
        if (bData.status === 'fulfilled') {
          const data = bData.value.data
          setBookings(Array.isArray(data) ? data : data.bookings || [])
        }
        if (pData.status === 'fulfilled') setProfile(pData.value.data.user || pData.value.data)
        if (vData.status === 'fulfilled') setVerification(vData.value.data)
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [])

  const userVerified = verification?.identity_verified || verification?.background_check_status === 'verified'
  const verifStatus = verification?.background_check_status || 'none'

  const upcoming = bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed')
  const active = bookings.filter(b => b.status === 'active' || b.status === 'in-progress')
  const past = bookings.filter(b => b.status === 'completed' || b.status === 'past')

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>My Dashboard</h1>
        {/* Verification status */}
        {verification && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {userVerified ? (
              <span className="verify-badge" style={{ fontSize: 13, padding: '6px 14px' }}>
                <i className="fas fa-shield-alt"></i> ID Verified
              </span>
            ) : (
              <Link to="/dashboard/client" className="btn btn-outline btn-sm" style={{ fontSize: 12 }}>
                Get Verified
              </Link>
            )}
            <Link to="/profile" className="btn btn-outline btn-sm"><i className="fas fa-cog"></i> Settings</Link>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Upcoming</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary-teal)' }}>{upcoming.length}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Active</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--secondary-coral)' }}>{active.length}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Completed</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--success-green)' }}>{past.length}</p>
        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>No bookings yet.</p>
          <Link to="/caregivers" className="btn btn-primary">Find a Caregiver</Link>
        </div>
      )}

      {bookings.map(b => (
        <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: 'var(--white)', borderRadius: 12, marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>{b.caregiver_name || b.caregiver?.name || 'Professional'}
              {b.service_category && <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>  {getCategoryIcon(b.service_category)} {getCategoryLabel(b.service_category)}</span>}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {b.start_date && new Date(b.start_date).toLocaleDateString()} - {b.end_date && new Date(b.end_date).toLocaleDateString()}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
              background: b.status === 'active' || b.status === 'in-progress' ? '#d4edda' : b.status === 'upcoming' || b.status === 'confirmed' ? '#cce5ff' : '#f8f9fa',
              color: b.status === 'active' || b.status === 'in-progress' ? 'var(--success-green)' : b.status === 'upcoming' || b.status === 'confirmed' ? '#004085' : 'var(--text-muted)',
            }}>{b.status}</span>
            <Link to={`/messages/${b.id}`} className="btn btn-outline btn-sm">Message</Link>
          </div>
        </div>
      ))}
    </div>
  )
}