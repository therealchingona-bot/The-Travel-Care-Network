import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { bookingsAPI } from '../api/client'

export default function BookingConfirmation() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await bookingsAPI.getById(id)
        setBooking(data.booking || data)
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [id])

  if (loading) return <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>Loading confirmation...</div>

  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', color: 'var(--success-green)', marginBottom: 20 }}>✓</div>
      <h1 style={{ marginBottom: 15 }}>Booking Confirmed!</h1>
      {booking && (
        <div className="card" style={{ textAlign: 'left', marginBottom: 30 }}>
          <p><strong>Booking #:</strong> {booking.id}</p>
          <p><strong>Caregiver:</strong> {booking.caregiver_name || booking.caregiver?.name || 'Assigned'}</p>
          <p><strong>Dates:</strong> {booking.start_date && new Date(booking.start_date).toLocaleDateString()} - {booking.end_date && new Date(booking.end_date).toLocaleDateString()}</p>
          {booking.total_amount && <p><strong>Total:</strong> ${booking.total_amount}</p>}
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      )}
      <p style={{ color: 'var(--text-muted)', marginBottom: 30, fontSize: 18 }}>
        Your booking has been confirmed. Your provider has been notified and will reach out to coordinate details.
      </p>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
        Your payment is held securely and released after your service is complete.
      </p>
      <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
        <Link to="/dashboard/client" className="btn btn-primary">View My Bookings</Link>
        {booking && <Link to={`/messages/${booking.id}`} className="btn btn-outline">Send Message</Link>}
      </div>
    </div>
  )
}