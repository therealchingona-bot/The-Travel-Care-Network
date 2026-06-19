import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authAPI, profileAPI } from '../api/client'
import { SERVICE_CATEGORIES } from '../api/categories'

const CREDENTIAL_TYPES = [
  'CNA License', 'RN License', 'LPN License',
  'CPR Certificate', 'First Aid Certificate',
  'Degree', 'Reference Letter', 'Other',
]

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState(null)
  const [isCaregiver, setIsCaregiver] = useState(false)
  const [credentials, setCredentials] = useState([])

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    bio: '',
  })

  const [selectedServices, setSelectedServices] = useState([])

  // Upload credential modal state
  const [showUpload, setShowUpload] = useState(false)
  const [credFile, setCredFile] = useState(null)
  const [credType, setCredType] = useState('')
  const [credTitle, setCredTitle] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const pRes = await authAPI.getProfile()
        const profile = pRes.data.user || pRes.data
        setUser(profile)
        const role = profile.role
        setIsCaregiver(role === 'caregiver' || role === 'provider')

        const nameParts = (profile.name || profile.first_name + ' ' + (profile.last_name || '')).trim().split(' ')
        setForm({
          first_name: profile.first_name || nameParts[0] || '',
          last_name: profile.last_name || nameParts.slice(1).join(' ') || '',
          email: profile.email || '',
          phone: profile.phone || '',
          bio: profile.bio || '',
        })

        if (role === 'caregiver' || role === 'provider') {
          setSelectedServices(Array.isArray(profile.services) ? profile.services : [])
          try {
            const cRes = await profileAPI.getCredentials()
            setCredentials(Array.isArray(cRes.data) ? cRes.data : cRes.data.credentials || [])
          } catch (_) { setCredentials([]) }
        }
      } catch (_) { setError('Failed to load profile.') }
      finally { setLoading(false) }
    })()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleService = (svc) => {
    setSelectedServices(prev =>
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    )
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      await profileAPI.update({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        bio: form.bio,
      })
      if (isCaregiver) {
        await profileAPI.updateServices({ services: selectedServices })
      }
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.')
    } finally { setSaving(false) }
  }

  const handleUploadCredential = async (e) => {
    e.preventDefault()
    if (!credFile || !credType || !credTitle) {
      setError('Please fill in all credential fields.')
      return
    }
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', credFile)
      fd.append('credential_type', credType)
      fd.append('title', credTitle)
      const res = await profileAPI.uploadCredential(fd)
      setCredentials(prev => [...prev, res.data.credential || res.data])
      setShowUpload(false)
      setCredFile(null)
      setCredType('')
      setCredTitle('')
      setSuccess('Credential uploaded for review.')
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed.')
    } finally { setUploading(false) }
  }

  if (loading) return <div className="container" style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>Loading profile...</div>

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Profile Settings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Manage your personal information, credentials, and services.</p>

      {error && <div style={{ background: '#fef2f2', color: 'var(--error-red)', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}
      {success && <div style={{ background: '#f0fdf4', color: 'var(--success-green)', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{success}</div>}

      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 1. Personal Info */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input name="first_name" className="form-control" value={form.first_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input name="last_name" className="form-control" value={form.last_name} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" className="form-control" value={form.email} disabled style={{ background: 'var(--bg-light)' }} />
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Email cannot be changed here.</p>
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input name="phone" className="form-control" placeholder="(555) 123-4567" value={form.phone} onChange={handleChange} />
          </div>
        </div>

        {/* 2. Caregiver-only: Bio */}
        {isCaregiver && (
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 15 }}>Professional Bio</h3>
            <div className="form-group">
              <textarea name="bio" rows={4} className="form-control" placeholder="Tell clients about your experience, specialties, and what makes you unique..." value={form.bio} onChange={handleChange} style={{ resize: 'vertical' }} />
            </div>
          </div>
        )}

        {/* 3. Caregiver-only: Additional Services */}
        {isCaregiver && (
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 15 }}>Additional Services</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 15 }}>
              Select the services you offer. These will be shown on your public profile.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {SERVICE_CATEGORIES.map(cat => (
                <label key={cat.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, padding: '6px 0' }}>
                  <input type="checkbox" checked={selectedServices.includes(cat.value)} onChange={() => toggleService(cat.value)} />
                  <span>{cat.icon} {cat.label}</span>
                </label>
              ))}
              {['Meal Prep', 'Medication Reminders', 'Transportation', 'Errands', 'Light Housekeeping', 'Personal Care', 'Companionship', 'Pet Care', 'Overnight Stay'].map(svc => (
                <label key={svc} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, padding: '6px 0' }}>
                  <input type="checkbox" checked={selectedServices.includes(svc)} onChange={() => toggleService(svc)} />
                  <span>{svc}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 4. Caregiver-only: Uploaded Credentials */}
        {isCaregiver && (
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <h3 style={{ margin: 0 }}>Uploaded Credentials</h3>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowUpload(true)}>
                <i className="fas fa-upload"></i> Upload New
              </button>
            </div>

            {credentials.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No credentials uploaded yet. Upload your licenses, certificates, and degrees.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', textAlign: 'left' }}>
                    <th style={{ padding: 8, fontSize: 12 }}>Type</th>
                    <th style={{ padding: 8, fontSize: 12 }}>Title</th>
                    <th style={{ padding: 8, fontSize: 12 }}>Status</th>
                    <th style={{ padding: 8, fontSize: 12 }}>Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials.map((c, i) => (
                    <tr key={c.id || i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 8, fontSize: 13 }}>{c.credential_type || c.type || '—'}</td>
                      <td style={{ padding: 8, fontSize: 13 }}>{c.title || '—'}</td>
                      <td style={{ padding: 8, fontSize: 13 }}>
                        <span className={`status-tag status-${c.status === 'verified' ? 'verified' : c.status === 'pending' || !c.status ? 'pending' : 'rejected'}`}>
                          {c.status || 'pending'}
                        </span>
                      </td>
                      <td style={{ padding: 8, fontSize: 13 }}>{c.created_at ? new Date(c.created_at).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Save */}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14, fontSize: 16 }} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        {isCaregiver ? (
          <Link to="/dashboard/caregiver" className="btn btn-outline"><i className="fas fa-arrow-left"></i> Back to Dashboard</Link>
        ) : (
          <Link to="/dashboard/client" className="btn btn-outline"><i className="fas fa-arrow-left"></i> Back to Dashboard</Link>
        )}
      </div>

      {/* Upload Credential Modal */}
      {showUpload && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000,
        }} onClick={() => setShowUpload(false)}>
          <div style={{ background: 'white', borderRadius: 12, padding: 30, maxWidth: 480, width: '90%' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 20 }}>Upload Credential</h3>
            <form onSubmit={handleUploadCredential} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Credential Type</label>
                <select className="form-control" value={credType} onChange={e => setCredType(e.target.value)} required>
                  <option value="">Select type...</option>
                  {CREDENTIAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Title / Description</label>
                <input className="form-control" placeholder="e.g., Arizona CNA License" value={credTitle} onChange={e => setCredTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">File (PDF, JPG, PNG)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setCredFile(e.target.files[0])} required
                  style={{ fontSize: 14 }} />
                {credFile && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{credFile.name}</p>}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setShowUpload(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}