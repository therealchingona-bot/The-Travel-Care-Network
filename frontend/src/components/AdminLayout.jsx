import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/admin', label: 'Overview', icon: 'tachometer-alt' },
  { path: '/admin/requests', label: 'Traveler Requests', icon: 'clipboard-list' },
  { path: '/admin/providers', label: 'Provider Applications', icon: 'user-md' },
  { path: '/admin/bookings', label: 'All Bookings', icon: 'calendar-check' },
  { path: '/admin/users', label: 'Users', icon: 'users' },
]

export default function AdminLayout({ children, title }) {
  const location = useLocation()
  
  return (
    <div className="container" style={{ padding: '40px 20px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 30, minHeight: 'calc(100vh - 200px)' }}>
      {/* Sidebar */}
      <aside>
        <h2 style={{ fontSize: 18, marginBottom: 24, color: 'var(--primary-teal)' }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 8,
                textDecoration: 'none', fontSize: 14,
                background: location.pathname === item.path ? 'var(--bg-light)' : 'transparent',
                color: location.pathname === item.path ? 'var(--primary-teal)' : 'var(--text-dark)',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            >
              <i className={`fas fa-${item.icon}`} style={{ width: 20 }}></i>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="btn btn-outline btn-sm" style={{ marginTop: 30, width: '100%', textAlign: 'center' }}>
          <i className="fas fa-arrow-left"></i> Back to Site
        </Link>
      </aside>

      {/* Main content */}
      <main>
        {title && <h1 style={{ marginBottom: 24, fontSize: 24 }}>{title}</h1>}
        {children}
      </main>
    </div>
  )
}