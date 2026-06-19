import React from 'react'
import { Link } from 'react-router-dom'

export default function CaregiverSearch() {
  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: 20 }}>🤝</div>
      <h1 style={{ marginBottom: 15 }}>Personalized Provider Matching</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 18, lineHeight: 1.7 }}>
        Our team personally reviews your needs and matches you with vetted, trusted providers.
      </p>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30, lineHeight: 1.7 }}>
        Submit a care request and we'll connect you with the best-matched professionals in our network. Whether you need a CNA, housekeeper, chef, babysitter, or companion — we handle the matching so you don't have to search.
      </p>
      <div className="card" style={{ padding: 30, textAlign: 'left', marginBottom: 20 }}>
        <h3 style={{ marginBottom: 15 }}>What to expect:</h3>
        <ol style={{ color: 'var(--text-muted)', lineHeight: 2, fontSize: 15 }}>
          <li>Tell us about your trip — destination, dates, and care needed</li>
          <li>Our team reviews your request within 24 hours</li>
          <li>We match you with a qualified, verified provider</li>
          <li>You confirm and book with confidence</li>
        </ol>
      </div>
      <Link to="/signup" className="btn btn-primary btn-lg">Get Started — Submit a Request</Link>
      <p style={{ marginTop: 15 }}>
        <Link to="/caregivers/register" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>Are you a service provider? Join our network</Link>
      </p>
    </div>
  )
}