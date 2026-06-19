import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { caregiversAPI } from '../api/client'
import { SERVICE_CATEGORIES, getCategoryIcon, getCategoryLabel } from '../api/categories'

export default function CaregiverProfile() {
  const { id } = useParams()
  const [cg, setCg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await caregiversAPI.getById(id)
        setCg(data.caregiver || data)
      } catch (err) {
        setError('Failed to load profile.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>Loading profile...</div>
  if (error) return <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--error-red)' }}>{error}</div>
  if (!cg) return <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>Professional not found.</div>

  const cat = cg.service_category || cg.care_type || ''
  const icon = getCategoryIcon(cat)
  const catLabel = getCategoryLabel(cat)
  const bgStatus = cg.background_check_status || cg.verification_status
  const reviews = cg.reviews || []

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 40 }}>
        <div>
          <div style={{ width: '100%', height: 350, background: '#eee', borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: '#ccc' }}>
            <i className="fas fa-user-circle"></i>
          </div>
          
          {/* Service category badge */}
          {cat && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>{icon}</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--primary-teal)' }}>{catLabel}</span>
            </div>
          )}

          <h2 style={{ marginBottom: 4 }}>{cg.name || 'Professional'}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{cg.credentials || cat} • {cg.experience || '0'} years experience</p>
          <p style={{ color: 'var(--primary-teal)', fontWeight: 700, fontSize: '1.5rem', marginBottom: 8 }}>${cg.rate || cg.hourly_rate || 35}<span style={{ fontSize: 16, fontWeight: 400 }}>/hr</span></p>
          
          {/* Verification badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {bgStatus === 'verified' && (
              <span className="verify-badge" style={{ fontSize: 14, padding: '6px 12px' }}>
                <i className="fas fa-shield-alt"></i> Background Checked ✅
              </span>
            )}
            {bgStatus === 'pending' && (
              <span className="status-tag status-pending" style={{ fontSize: 12 }}>Background Check Pending</span>
            )}
            {bgStatus === 'failed' && (
              <span className="status-tag status-rejected" style={{ fontSize: 12 }}>Background Check Failed</span>
            )}
            {cg.identity_verified && (
              <span className="verify-badge" style={{ fontSize: 14, padding: '6px 12px' }}>
                <i className="fas fa-id-card"></i> Identity Verified
              </span>
            )}
            {cg.verification_date && (
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Verified since {new Date(cg.verification_date).toLocaleDateString()}</span>
            )}
          </div>

          <Link to={`/book/${id}`} className="btn btn-primary" style={{ width: '100%', marginBottom: 10, textAlign: 'center' }}>Book Now</Link>
          <Link to={`/messages/new?caregiver=${id}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>Send Message</Link>
        </div>
        <div>
          <h3 style={{ marginBottom: 15 }}>About</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 30, lineHeight: 1.7 }}>
            {cg.bio || cg.description || 'No bio available.'}
          </p>
          
          {cg.certifications && cg.certifications.length > 0 && (
            <>
              <h3 style={{ marginBottom: 15 }}>Certifications</h3>
              <ul style={{ marginBottom: 30, paddingLeft: 20, color: 'var(--text-muted)' }}>
                {cg.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </>
          )}
          
          {cg.languages && cg.languages.length > 0 && (
            <>
              <h3 style={{ marginBottom: 15 }}>Languages</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>{cg.languages.join(', ')}</p>
            </>
          )}

          {cg.services && cg.services.length > 0 && (
            <>
              <h3 style={{ marginBottom: 15 }}>Services</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
                {cg.services.map((s, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: 'var(--bg-light)', borderRadius: 20, fontSize: 13, color: 'var(--text-muted)' }}>{s}</span>
                ))}
              </div>
            </>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <>
              <h3 style={{ marginBottom: 15 }}>Reviews ({reviews.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                {reviews.map((r, i) => (
                  <div key={i} style={{ padding: 16, background: 'var(--bg-light)', borderRadius: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600 }}>{r.author || 'Anonymous'}</span>
                      <span style={{ color: 'var(--accent-yellow)' }}>{'★'.repeat(r.rating || 5)}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{r.text || r.comment || ''}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}