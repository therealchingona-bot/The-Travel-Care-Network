import React from 'react'
import { Link } from 'react-router-dom'

export default function CookiePolicy() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 10 }}>Cookie Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Last updated: June 11, 2026</p>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>1. What Are Cookies</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Cookies are small text files stored on your device by your web browser. They help us remember your preferences, authenticate your session, and improve your experience on the Platform.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>2. How We Use Cookies</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We use the following types of cookies: Essential cookies (required for the Platform to function, including authentication and security), Functional cookies (remember your preferences and settings), Analytics cookies (help us understand how users interact with our Platform), and Marketing cookies (used to deliver relevant advertisements).
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>3. Third-Party Cookies</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We may use third-party services such as Stripe (payment processing), Google Analytics (usage analysis), and other analytics providers that may set their own cookies. These third parties have their own cookie policies governing their use of data.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>4. Managing Cookies</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Most web browsers allow you to control cookies through your browser settings. You can block or delete cookies, but doing so may affect the functionality of the Platform. To learn how to manage cookies, visit your browser's help documentation.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>5. Contact</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          For questions about our Cookie Policy, contact us at privacy@carebnb.com.
        </p>
      </section>

      <Link to="/" className="btn btn-outline">Back to Home</Link>
    </div>
  )
}