import React from 'react'
import { Link } from 'react-router-dom'

export default function LegalPage({ title, lastUpdated = 'June 2026', children }) {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 4, color: 'var(--primary-teal)' }}>{title}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30, fontSize: 14 }}>Last Updated: {lastUpdated}</p>
      <div style={{ background: 'var(--white)', borderRadius: 12, boxShadow: '0 5px 20px rgba(0,0,0,0.05)', padding: '40px 40px' }}>
        {children}
      </div>
      <div style={{ marginTop: 30 }}>
        <Link to="/" className="btn btn-outline"><i className="fas fa-arrow-left"></i> Back to Home</Link>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, color: 'var(--primary-teal)', marginBottom: 10 }}>{title}</h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: 'var(--text-dark)' }}>{title}</h3>
      {children}
    </div>
  )
}

export { Section, SubSection }