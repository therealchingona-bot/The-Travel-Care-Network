import React from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 10 }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Last updated: June 11, 2026</p>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>1. Information We Collect</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We collect information you provide directly: name, email address, password, phone number, profile photos, service category, credentials, professional licenses, and billing information. For Providers, we collect government-issued ID documents for verification purposes. We also collect information about your use of the Platform, including bookings, messages, reviews, and interactions with other users.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>2. How We Use Your Information</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We use your information to: facilitate bookings and communications between Clients and Providers; process payments; verify identities and conduct background checks; improve our Platform and user experience; send service-related communications; comply with legal obligations; and detect and prevent fraud or abuse.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>3. HIPAA Compliance</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          The Travel Care Network takes the privacy of health information seriously. While we are not a covered entity under HIPAA, we require all Providers to comply with applicable privacy laws regarding any health information they may receive in the course of providing services. Users should not share protected health information through our messaging system. Any health information shared is done so at the user's own risk.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>4. Information Sharing</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We share information with: other users as necessary to facilitate bookings (e.g., your name and profile to Providers you book); third-party service providers who perform background checks, payment processing, and identity verification; law enforcement when required by law. We do not sell your personal information to third parties.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>5. Data Security</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We implement industry-standard security measures including encryption in transit (TLS) and at rest, secure data storage, and access controls. However, no method of electronic storage is 100% secure. We retain your information for as long as your account is active and for a reasonable period thereafter to comply with legal obligations.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>6. Your Rights</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          You have the right to: access, correct, or delete your personal information; opt out of marketing communications; request a copy of your data; and close your account. To exercise these rights, contact us at hello@thetravelcarenetwork.com.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>7. Contact</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          For privacy-related inquiries, contact us at hello@thetravelcarenetwork.com or write to The Travel Care Network Inc., 100 E. Washington St., Phoenix, AZ 85004.
        </p>
      </section>

      <Link to="/" className="btn btn-outline">Back to Home</Link>
    </div>
  )
}