import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI, caregiversAPI, verificationAPI } from '../api/client'
import { SERVICE_CATEGORIES } from '../api/categories'

export default function CaregiverRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    serviceCategory: '', credentials: 'CNA', rate: 35, bio: '',
    location: '', languages: '', services: '',
    consentBackground: false,
  })

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.consentBackground) { setError('You must consent to a background check.'); return }
    if (!form.serviceCategory) { setError('Please select a service category.'); return }
    setLoading(true)
    try {
      const nameParts = form.name.trim().split(' ')
      const { data } = await authAPI.signUp({
        first_name: nameParts[0] || form.name,
        last_name: nameParts.slice(1).join(' ') || 'Caregiver',
        email: form.email, password: form.password,
        role: 'caregiver',
        service_category: form.serviceCategory,
      })
      localStorage.setItem('carebnb_token', data.token)
      await verificationAPI.consentBackgroundCheck()
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.')
    } finally { setLoading(false) }
  }

  const handleProfile = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await caregiversAPI.updateProfile({
        service_category: form.serviceCategory,
        credentials: form.credentials,
        hourly_rate: parseFloat(form.rate),
        bio: form.bio,
        location: form.location,
        languages: form.languages.split(',').map(s => s.trim()).filter(Boolean),
        services: form.services.split(',').map(s => s.trim()).filter(Boolean),
      })
      setStep(3)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile.')
    } finally { setLoading(false) }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('id_document', file)
      await verificationAPI.uploadId(fd)
      navigate('/dashboard/caregiver')
    } catch (err) {
      setError('Upload failed. Try a PDF, JPG, or PNG file under 10MB.')
    } finally { setLoading(false) }
  }

  const selectedCat = SERVICE_CATEGORIES.find(c => c.value === form.serviceCategory)
  const isMedical = ['CNA', 'RN', 'LPN', 'Certified Caregiver'].includes(form.serviceCategory)

  const stepCount = isMedical ? 3 : 3 // same steps for all

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Become a Service Provider</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Join our network of verified service professionals.</p>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 30 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? 'var(--primary-teal)' : '#eee' }} />
        ))}
      </div>

      {error && <div style={{ background: '#fef2f2', color: 'var(--error-red)', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}

      {/* Step 1: Account */}
      {step === 1 && (
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ marginBottom: 10 }}>Create Your Account</h2>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required minLength={8} />
          </div>
          <div className="form-group">
            <label className="form-label">Service Category</label>
            <select name="serviceCategory" className="form-control" value={form.serviceCategory} onChange={handleChange} required>
              <option value="">Select a category...</option>
              {SERVICE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
          <label style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--text-muted)', cursor: 'pointer' }}>
            <input type="checkbox" name="consentBackground" checked={form.consentBackground} onChange={handleChange} />
            <span>I consent to a background check as part of the verification process</span>
          </label>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>Create Account</button>
        </form>
      )}

      {/* Step 2: Profile */}
      {step === 2 && (
        <form onSubmit={handleProfile} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ marginBottom: 10 }}>Your Profile {selectedCat && `— ${selectedCat.icon} ${selectedCat.label}`}</h2>
          <div className="form-group">
            <label className="form-label">{isMedical ? 'License / Certification' : 'Credentials'}</label>
            <select name="credentials" className="form-control" value={form.credentials} onChange={handleChange}>
              {isMedical ? (
                <>
                  <option>CNA</option><option>RN</option><option>LPN</option><option>Certified Caregiver</option>
                </>
              ) : form.serviceCategory === 'Private Chef' ? (
                <>
                  <option>Private Chef</option><option>Sous Chef</option><option>Pastry Chef</option><option>Personal Cook</option>
                </>
              ) : form.serviceCategory === 'Housekeeper' ? (
                <>
                  <option>Housekeeper</option><option>Maid Service</option><option>Deep Cleaning</option><option>Eco-Friendly Cleaner</option>
                </>
              ) : form.serviceCategory === 'Babysitter' ? (
                <>
                  <option>Babysitter</option><option>Nanny</option><option>Childcare Specialist</option>
                </>
              ) : (
                <>
                  <option>Companion</option><option>Senior Companion</option><option>Care Aide</option>
                </>
              )}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Hourly Rate ($)</label>
            <input name="rate" type="number" className="form-control" value={form.rate} onChange={handleChange} min={10} />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input name="location" className="form-control" placeholder="City, State" value={form.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea name="bio" rows={4} className="form-control" placeholder="Describe your experience and specialties..." value={form.bio} onChange={handleChange} style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Languages (comma-separated)</label>
            <input name="languages" className="form-control" placeholder="English, Spanish" value={form.languages} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Services Offered (comma-separated)</label>
            <input name="services" className="form-control" placeholder={isMedical ? 'Elder Care, Post-Surgery, etc.' : form.serviceCategory === 'Private Chef' ? 'Italian, Pastry, Meal Prep, etc.' : form.serviceCategory === 'Housekeeper' ? 'Cleaning, Laundry, Organizing, etc.' : form.serviceCategory === 'Babysitter' ? 'Tutoring, Crafts, Homework Help, etc.' : 'Companionship, Errands, etc.'} value={form.services} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>Save Profile</button>
        </form>
      )}

      {/* Step 3: Verify Identity */}
      {step === 3 && (
        <div>
          <h2 style={{ marginBottom: 10 }}>Verify Your Identity</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 25, fontSize: 14 }}>
            To keep our community safe, upload a government-issued ID. Data is encrypted and never shared.
          </p>
          <div className="upload-area" style={{ marginBottom: 20 }} onClick={() => document.getElementById('id-upload').click()}>
            <i className="fas fa-file-upload" style={{ fontSize: '2.5rem', color: 'var(--primary-teal)', marginBottom: 15, display: 'block' }}></i>
            <div style={{ fontWeight: 700 }}>Upload Passport or Driver's License</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 5 }}>PDF, JPG, or PNG (Max 10MB)</p>
            <input id="id-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={handleUpload} />
          </div>
          {loading && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Uploading...</p>}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-muted)' }}>
            <i className="fas fa-lock" style={{ marginTop: 3 }}></i>
            <p>Your document is stored securely and processed in compliance with HIPAA and privacy regulations.</p>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: 20 }} onClick={() => navigate('/dashboard/caregiver')}>Skip for now</button>
        </div>
      )}
    </div>
  )
}