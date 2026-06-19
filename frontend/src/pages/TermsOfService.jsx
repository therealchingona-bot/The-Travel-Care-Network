import React from 'react'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 10 }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Last updated: June 11, 2026</p>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>1. Introduction</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Welcome to The Travel Care Network ("the Platform"). These Terms of Service ("Terms") govern your access to and use of the The Travel Care Network marketplace platform, website, and mobile application. The Platform connects travelers ("Clients") with independent service providers ("Providers") including but not limited to CNAs, RNs, LPNs, certified caregivers, housekeepers, private chefs, babysitters, and companion care professionals.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 10 }}>
          By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform. The Travel Care Network Inc. ("we," "us," or "our") reserves the right to update these Terms at any time.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>2. Marketplace Platform — Not a Care Provider</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          The Travel Care Network is a marketplace platform that facilitates connections between Clients and independent Providers. We are not a home health agency, staffing agency, or medical provider. We do not employ, supervise, or direct Providers. All services are provided by independent contractors who are solely responsible for their own actions, credentials, and the quality of services rendered.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 10 }}>
          Clients are responsible for verifying that a Provider's credentials, licensing, and qualifications meet their specific needs. We conduct background checks as described in our Privacy Policy, but we make no guarantees regarding the accuracy or completeness of Provider-provided information.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>3. Independent Contractor Status</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          All Providers on the Platform are independent contractors, not employees, agents, or joint ventures of The Travel Care Network. Providers have sole discretion over their schedule, rates, service offerings, and methods of providing services. The Travel Care Network does not set schedules, require exclusivity, or control the manner in which Providers perform their services.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>4. User Accounts and Registration</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          You must create an account to use the Platform. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your login credentials. You must be at least 18 years old to use the Platform. We reserve the right to suspend or terminate accounts that violate these Terms.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>5. Background Checks and Verification</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          All Providers consent to background checks as a condition of using the Platform. Background checks are conducted by third-party services and may include identity verification, criminal record checks, and credential verification. The Travel Care Network does not guarantee that background checks will reveal all relevant information. Clients should exercise their own judgment when selecting a Provider.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>6. Booking and Payments</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          All bookings are between Clients and Providers. The Travel Care Network processes payments as a limited agent and holds funds in escrow until 24 hours after check-in, at which point funds are released to the Provider. The Platform charges a service fee of 15% on each completed booking. Clients may cancel bookings according to the cancellation policy specified at the time of booking. Providers may cancel bookings subject to our provider cancellation policy.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>7. Limitation of Liability</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, CARE B&B SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO THE USE OF THE PLATFORM OR SERVICES PROVIDED THROUGH THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID BY THE CLIENT FOR THE SPECIFIC BOOKING GIVING RISE TO THE CLAIM.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>8. Dispute Resolution</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Any disputes arising out of these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Phoenix, Arizona. Both parties agree to waive their right to a jury trial and class action.
        </p>
      </section>

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, fontSize: 18 }}>9. Contact</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          For questions about these Terms, contact us at hello@thetravelcarenetwork.com or write to The Travel Care Network Inc., 100 E. Washington St., Phoenix, AZ 85004.
        </p>
      </section>

      <Link to="/" className="btn btn-outline">Back to Home</Link>
    </div>
  )
}