import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { bookingsAPI, paymentsAPI, ndaAPI, caregiversAPI, verificationAPI } from '../api/client'
import { getCategoryIcon, getCategoryLabel } from '../api/categories'

export default function BookingFlow() {
  const { caregiverId } = useParams()
  const navigate = useNavigate()
  const [cg, setCg] = useState(null)
  const [form, setForm] = useState({ startDate: '', endDate: '', notes: '' })
  const [agreedNda, setAgreedNda] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('details') // details | nda | payment | done
  const [error, setError] = useState('')
  const [bookingId, setBookingId] = useState(null)
  const [verification, setVerification] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await caregiversAPI.getById(caregiverId)
        setCg(data.caregiver || data)
      } catch (_) {}
      try {
        const { data } = await verificationAPI.getStatus()
        setVerification(data)
      } catch (_) {}
    })()
  }, [caregiverId])

  const calculateTotal = () => {
    if (!form.startDate || !form.endDate) return 0
    const start = new Date(form.startDate)
    const end = new Date(form.endDate)
    const days = Math.max(1, Math.ceil((end - start) / (1000*60*60*24)))
    const rate = cg?.rate || cg?.hourly_rate || 35
    return days * 8 * rate // 8 hours per day estimate
  }

  const handleCreateBooking = async (e) => {
    e.preventDefault()
    if (!agreedNda) { setError('Please agree to the NDA and liability waiver.'); return }
    setError('')
    setLoading(true)
    try {
      const { data } = await bookingsAPI.create({
        caregiver_id: caregiverId,
        start_date: form.startDate,
        end_date: form.endDate,
        notes: form.notes,
      })
      setBookingId(data.id || data.booking?.id)
      setStep('nda')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking.')
    } finally { setLoading(false) }
  }

  const handleSignNda = async () => {
    setLoading(true)
    try {
      await ndaAPI.signNda(bookingId)
      setStep('payment')
    } catch (err) {
      setError('Failed to sign NDA.')
    } finally { setLoading(false) }
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      await paymentsAPI.createPayment(bookingId)
      navigate(`/booking/${bookingId}/confirmation`)
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally { setLoading(false) }
  }

  const userVerified = verification?.identity_verified || verification?.background_check_status === 'verified'
  const cgVerified = cg?.background_check_status === 'verified' || cg?.identity_verified

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Book Your Service</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 10 }}>Complete the steps below to book with {cg?.name || 'your provider'}.</p>
      {cg?.service_category && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 30 }}>
          <span style={{ fontSize: 20 }}>{getCategoryIcon(cg.service_category)}</span>
          <span style={{ fontWeight: 600, color: 'var(--primary-teal)' }}>{getCategoryLabel(cg.service_category)}</span>
        </div>
      )}

      {/* Trust signals */}
      <div style={{ display: 'flex', gap: 15, marginBottom: 30, flexWrap: 'wrap' }}>
        <span className={`verify-badge ${userVerified ? '' : 'status-pending'}`} style={{ fontSize: 13 }}>
          <i className="fas fa-id-card"></i> {userVerified ? 'You: ID Verified ✅' : 'You: Not Verified'}
        </span>
        <span className={`verify-badge ${cgVerified ? '' : 'status-pending'}`} style={{ fontSize: 13 }}>
          <i className="fas fa-shield-alt"></i> {cgVerified ? 'Caregiver: Verified ✅' : 'Caregiver: Not Verified'}
        </span>
      </div>

      {error && <div style={{ background: '#fef2f2', color: 'var(--error-red)', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}

      {/* Step: Details */}
      {step === 'details' && (
        <form onSubmit={handleCreateBooking}>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ marginBottom: 20 }}>Trip Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">Check-in Date</label>
                <input type="date" className="form-control" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Check-out Date</label>
                <input type="date" className="form-control" value={form.endDate} onChange={(e) => setForm({...form, endDate: e.target.value})} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Care Requirements</label>
              <textarea rows={4} className="form-control" placeholder="Describe the care needed..." value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} style={{ resize: 'vertical' }} />
            </div>
            {form.startDate && form.endDate && (
              <div style={{ padding: 16, background: 'var(--bg-light)', borderRadius: 8, marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Rate: ${cg?.rate || 35}/hr × 8hrs/day</span>
                  <span style={{ fontWeight: 700 }}>${calculateTotal()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-muted)' }}>
                  <span>Platform fee</span>
                  <span>${Math.round(calculateTotal() * 0.1)}</span>
                </div>
                <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ddd' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--primary-teal)' }}>${calculateTotal() + Math.round(calculateTotal() * 0.1)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ marginBottom: 15 }}>NDA & Liability Waiver</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 15, lineHeight: 1.7, fontSize: 14 }}>
              By booking, you agree to our standard NDA and liability waiver. These documents protect both parties and will be sent digitally upon confirmation.
            </p>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={agreedNda} onChange={(e) => setAgreedNda(e.target.checked)} style={{ marginTop: 3 }} />
              <span>I agree to the NDA and liability waiver terms</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 16, fontSize: 18 }} disabled={loading}>
            {loading ? 'Creating booking...' : 'Proceed to NDA'}
          </button>
        </form>
      )}

      {/* Step: NDA Signature */}
      {step === 'nda' && (
        <div className="card" style={{ padding: 30 }}>
          <h3 style={{ marginBottom: 15 }}>Sign NDA & Waiver</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>
            Please review and sign the Non-Disclosure Agreement and Liability Waiver for booking #{bookingId}.
          </p>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 20, marginBottom: 20, maxHeight: 200, overflowY: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
            <p><strong>Non-Disclosure Agreement</strong></p>
            <p>Both parties agree to keep all personal and medical information confidential...</p>
            <p style={{ marginTop: 15 }}><strong>Liability Waiver</strong></p>
            <p>The caregiver is a verified independent professional. The platform facilitates the connection but is not liable for the specific services rendered...</p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSignNda} disabled={loading}>
            {loading ? 'Signing...' : 'Sign & Continue to Payment'}
          </button>
        </div>
      )}

      {/* Step: Payment */}
      {step === 'payment' && (
        <div className="card" style={{ padding: 30, textAlign: 'center' }}>
          <i className="fas fa-lock" style={{ fontSize: 48, color: 'var(--primary-teal)', marginBottom: 20 }}></i>
          <h3 style={{ marginBottom: 10 }}>Secure Payment</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 25 }}>
            Your payment of <strong>${calculateTotal() + Math.round(calculateTotal() * 0.1)}</strong> is held securely and only released to your provider after your service is complete.
          </p>
          <button className="btn btn-primary" style={{ width: '100%', padding: 16, fontSize: 18 }} onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : `Pay $${calculateTotal() + Math.round(calculateTotal() * 0.1)}`}
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 15 }}>
            <i className="fas fa-shield-alt"></i> Your payment is protected — funds only release once service is confirmed complete
          </p>
        </div>
      )}
    </div>
  )
}