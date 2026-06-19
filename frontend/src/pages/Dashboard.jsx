import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../api/client'
import ClientDashboard from './ClientDashboard'
import CaregiverDashboard from './CaregiverDashboard'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState(null) // 'client' or 'caregiver'
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('carebnb_token')
    if (!token) {
      navigate('/signin')
      return
    }
    authAPI.getProfile().then(({ data }) => {
      const u = data.user || data
      setUser(u)
      // Default to their signup role, but let them toggle
      setView(u.role === 'caregiver' ? 'caregiver' : 'client')
      setLoading(false)
    }).catch(() => {
      localStorage.removeItem('carebnb_token')
      navigate('/signin')
    })
  }, [navigate])

  if (loading) return (
    <div style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading your dashboard...
    </div>
  )

  const otherView = view === 'client' ? 'caregiver' : 'client'
  const otherLabel = view === 'client' ? 'Provider View' : 'Client View'
  const otherIcon = view === 'client' ? 'fa-handshake' : 'fa-user'

  return (
    <div>
      {/* View Toggle Bar */}
      <div style={{
        background: 'var(--primary-teal)',
        padding: '8px 0',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>
            {view === 'client' ? '👤 Client Dashboard' : '🤝 Provider Dashboard'}
          </span>
          <button
            onClick={() => setView(otherView)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'white',
              padding: '6px 16px',
              borderRadius: 20,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            <i className={`fas ${otherIcon}`} style={{ marginRight: 6 }}></i>
            Switch to {otherLabel}
          </button>
        </div>
      </div>

      {/* Render the right dashboard — key forces remount on toggle */}
      {view === 'client' ? <ClientDashboard key="client" /> : <CaregiverDashboard key="caregiver" />}
    </div>
  )
}