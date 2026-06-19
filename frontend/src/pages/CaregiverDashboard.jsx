import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bookingsAPI, authAPI, verificationAPI } from '../api/client'
import { getCategoryIcon, getCategoryLabel } from '../api/categories'

export default function CaregiverDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [verification, setVerification] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const [bData, pData, vData] = await Promise.allSettled([
          bookingsAPI.list({ role: 'caregiver' }),
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

  const verifStatus = verification?.background_check_status || 'none'
  const userVerified = verification?.identity_verified || verifStatus === 'verified'

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingsAPI.updateStatus(bookingId, newStatus)
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
    } catch (_) {}
  }

  const totalEarnings = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.total_amount || 0), 0)

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed')
  const activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'in-progress')
  const completedBookings = bookings.filter(b => b.status === 'completed')

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>Caregiver Dashboard</h1>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
          {/* Verification status */}
          {verifStatus === 'verified' && (
            <span className="verify-badge" style={{ fontSize: 13, padding: '6px 14px' }}>
              <i className="fas fa-shield-alt"></i> Background Checked ✅
            </span>
          )}
          {verifStatus === 'pending' && (
            <span className="status-tag status-pending">Verification Pending</span>
          )}
          {verifStatus === 'failed' && (
            <span className="status-tag status-rejected">Verification Failed</span>
          )}
          {verifStatus === 'none' && (
            <Link to="/caregivers/register" className="btn btn-outline btn-sm">Get Verified</Link>
          )}
          <Link to="/caregivers/register" className="btn btn-primary btn-sm">Edit Profile</Link>
          <Link to="/profile" className="btn btn-outline btn-sm"><i className="fas fa-cog"></i> Settings</Link>
        </div>
      </div>

      {/* Verification progress */}
      {verifStatus !== 'verified' && (
        <div className="card" style={{ padding: 20, marginBottom: 30, display: 'flex', alignItems: 'center', gap: 15, background: '#fffbeb' }}>
          <i className="fas fa-shield-alt" style={{ fontSize: 24, color: '#92400e' }}></i>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, color: '#92400e', marginBottom: 4 }}>Complete Your Verification</p>
            <p style={{ fontSize: 13, color: '#92400e' }}>
              {verifStatus === 'none' ? 'Step 1: Upload your ID document to get verified.' :
               verifStatus === 'pending' ? 'Your ID is under review. Check back soon.' :
               'Please re-upload your ID for verification.'}
            </p>
          </div>
          <Link to="/caregivers/register" className="btn btn-outline btn-sm">{verifStatus === 'none' ? 'Upload ID' : 'Check Status'}</Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: 13 }}>Earnings</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--success-green)' }}>${totalEarnings}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: 13 }}>Active</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary-teal)' }}>{activeBookings.length}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: 13 }}>Upcoming</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent-yellow)' }}>{upcomingBookings.length}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: 13 }}>Completed</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-muted)' }}>{completedBookings.length}</p>
        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>No bookings yet.</p>
          <Link to="/caregivers/register" className="btn btn-primary">Complete Your Profile</Link>
        </div>
      )}

      <h2 style={{ marginBottom: 20 }}>My Bookings</h2>
      {bookings.map(b => (
        <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: 'var(--white)', borderRadius: 12, marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>{b.client_name || b.client?.name || 'Client'}
              {b.service_category && <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>  {getCategoryIcon(b.service_category)} {getCategoryLabel(b.service_category)}</span>}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {b.start_date && new Date(b.start_date).toLocaleDateString()} - {b.end_date && new Date(b.end_date).toLocaleDateString()}
            </p>
            {b.total_amount && <p style={{ fontWeight: 600, color: 'var(--success-green)', fontSize: 14 }}>${b.total_amount}</p>}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
              background: b.status === 'active' || b.status === 'in-progress' ? '#d4edda' : b.status === 'upcoming' || b.status === 'confirmed' ? '#cce5ff' : b.status === 'completed' ? '#f0fdf4' : '#f8f9fa',
              color: b.status === 'active' || b.status === 'in-progress' ? 'var(--success-green)' : b.status === 'upcoming' || b.status === 'confirmed' ? '#004085' : b.status === 'completed' ? 'var(--success-green)' : 'var(--text-muted)',
            }}>{b.status}</span>
            {(b.status === 'upcoming' || b.status === 'confirmed') && (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => handleStatusUpdate(b.id, 'active')}>Confirm</button>
                <button className="btn btn-outline btn-sm" onClick={() => handleStatusUpdate(b.id, 'cancelled')}>Cancel</button>
              </>
            )}
            <Link to={`/messages/${b.id}`} className="btn btn-outline btn-sm">Message</Link>
          </div>
        </div>
      ))}
    </div>
  )
}