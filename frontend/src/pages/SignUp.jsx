import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI, verificationAPI } from '../api/client'
import { SERVICE_CATEGORIES } from '../api/categories'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', 
    role: 'client', serviceCategory: '', consentBackground: false 
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.consentBackground) {
      setError('You must consent to a background check to join.')
      return
    }
    setLoading(true)
    try {
      const nameParts = form.name.trim().split(' ')
      const payload = {
        first_name: nameParts[0] || form.name,
        last_name: nameParts.slice(1).join(' ') || 'User',
        email: form.email,
        password: form.password,
        role: form.role,
      }
      if (form.role === 'caregiver' && form.serviceCategory) {
        payload.service_category = form.serviceCategory
      }
      const { data } = await authAPI.signUp(payload)
      localStorage.setItem('carebnb_token', data.token)
      try { await verificationAPI.consentBackgroundCheck() } catch (_) {}
      navigate(form.role === 'caregiver' ? '/caregivers/register' : '/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, textAlign: 'center' }}>Create Account</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 30 }}>
        Join The Travel Care Network and find everything you need for your travels.
      </p>
      {error && <div style={{ background: '#fef2f2', color: 'var(--error-red)', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14, textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input name="name" type="text" className="form-control" placeholder="Jane Doe" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" placeholder="At least 8 characters" value={form.password} onChange={handleChange} required minLength={8} />
        </div>
        <div className="form-group">
          <label className="form-label">I am a...</label>
          <select name="role" className="form-control" value={form.role} onChange={handleChange}>
            <option value="client">Traveler / Client</option>
            <option value="caregiver">Service Provider</option>
          </select>
        </div>
        {form.role === 'caregiver' && (
          <div className="form-group">
            <label className="form-label">Service Category</label>
            <select name="serviceCategory" className="form-control" value={form.serviceCategory} onChange={handleChange} required>
              <option value="">Select a category...</option>
              {SERVICE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
        )}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 14, color: 'var(--text-muted)' }}>
          <input type="checkbox" name="consentBackground" checked={form.consentBackground} onChange={handleChange} style={{ marginTop: 3 }} />
          <span>I consent to a background check as part of the platform's safety & trust process.</span>
        </label>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/signin" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>Sign In</Link>
      </p>
    </div>
  )
}