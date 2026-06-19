import React from 'react'
import { Link } from 'react-router-dom'

export default function ProviderAgreement() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 10 }}>Provider Agreement</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Last updated: June 11, 2026</p>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>1. Independent Contractor Relationship</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          This Provider Agreement ("Agreement") is between you ("Provider") and The Travel Care Network Inc. ("Company"). Provider acknowledges and agrees that they are an independent contractor and not an employee, agent, or joint venture of the Company. Provider retains sole discretion over their work schedule, rates, service methods, and whether to accept or decline bookings.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>2. Provider Obligations</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Provider agrees to: maintain accurate and current profile information; hold all required licenses, certifications, and insurance; maintain professional liability insurance coverage; provide services in a professional and competent manner; comply with all applicable laws and regulations; not share Client personal or medical information; respond to booking requests in a timely manner; and maintain a professional appearance and demeanor.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>3. Background Check Consent</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Provider consents to a background check as a condition of using the Platform. This includes identity verification, criminal record check, and credential verification. Provider agrees to submit a government-issued ID for verification purposes. Provider acknowledges that failing the background check or providing false information may result in immediate termination from the Platform.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>4. Fees and Payments</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          The Company charges a platform commission of 15% on each completed booking. Payments are processed through the Company's payment processor and held in escrow until 24 hours after the booking's check-in time. Provider agrees to the fee structure in effect at the time of booking. Founding Providers may receive reduced commission rates on their first 5 bookings.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>5. Non-Disclosure Agreement</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Provider agrees to maintain the confidentiality of all Client information, including personal details, medical information, home address, and any other information obtained through the Platform. This obligation survives the termination of this Agreement. Provider shall not use Client information for any purpose other than providing the booked services.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>6. Liability and Insurance</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Provider is solely responsible for all liabilities arising from services they provide. Provider must maintain professional liability insurance appropriate to their profession (e.g., malpractice insurance for medical providers, general liability for housekeepers, etc.). Provider agrees to indemnify and hold harmless the Company from any claims arising from Provider's services.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>7. Termination</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Either party may terminate this Agreement at any time with written notice. The Company reserves the right to remove Provider from the Platform for violations of this Agreement, negative reviews, or any conduct that the Company deems harmful to the Platform or its users.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>8. Governing Law</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          This Agreement shall be governed by the laws of the State of Arizona. Any disputes shall be resolved through binding arbitration in Phoenix, Arizona.
        </p>
      </section>

      <Link to="/" className="btn btn-outline">Back to Home</Link>
    </div>
  )
}