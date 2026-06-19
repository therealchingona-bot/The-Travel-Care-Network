import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api/client'

export default function SignIn() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await authAPI.signIn(form)
      localStorage.setItem('carebnb_token', data.token)
      const role = data.user?.role || 'client'
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: 450, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, textAlign: 'center' }}>Welcome Back</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 30 }}>
        Sign in to manage your bookings and messages.
      </p>
      {error && <div style={{ background: '#fef2f2', color: 'var(--error-red)', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 14, textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>Sign Up</Link>
      </p>
    </div>
  )
}