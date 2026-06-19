import React from 'react'
import { Link } from 'react-router-dom'

export default function AcceptableUse() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 10 }}>Acceptable Use Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Last updated: June 11, 2026</p>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>1. Prohibited Conduct</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Users of The Travel Care Network agree not to: use the Platform for any illegal purpose; create false or misleading profiles; harass, threaten, or abuse other users; impersonate any person or entity; manipulate reviews or ratings; attempt to circumvent our payment system; collect user information without consent; use automated tools to access the Platform; or engage in any deceptive or fraudulent activity.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>2. Content Guidelines</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Users are solely responsible for content they post. Prohibited content includes: false or misleading information; discriminatory or hateful content; explicit or inappropriate material; spam or unsolicited advertising; content that infringes on others' rights; and personal or medical information about third parties without their consent.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>3. Enforcement</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Violation of this policy may result in: removal of content; temporary or permanent account suspension; forfeiture of earnings; and/or legal action. We reserve the right to investigate any suspected violation and cooperate with law enforcement as appropriate.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>4. Reporting Violations</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          To report a violation of this policy, contact us at abuse@carebnb.com. Reports are reviewed within 48 hours.
        </p>
      </section>

      <Link to="/" className="btn btn-outline">Back to Home</Link>
    </div>
  )
}