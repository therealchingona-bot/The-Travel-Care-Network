import React from 'react'
import LegalPage, { Section, SubSection } from './LegalPage'

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service">
      <Section title="1. Introduction">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 10 }}>
          Welcome to The Travel Care Network ("we," "us," "our"). These Terms of Service ("Terms") govern your access to and use of our website, platform, and services (collectively, the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 600 }}>
          The Travel Care Network is a marketplace platform only. We connect travelers ("Clients") with independent service providers ("Providers") who offer care and support services. We do not employ, supervise, or direct any Provider. We are not a home care agency, medical agency, or staffing agency.
        </p>
      </Section>

      <Section title="2. Definitions">
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>"Platform"</strong> means the website, mobile site, and all related services operated by The Travel Care Network.</li>
          <li><strong>"Client"</strong> means any individual who submits a request for services through the Platform.</li>
          <li><strong>"Provider"</strong> means any independent professional who applies to offer services through the Platform.</li>
          <li><strong>"Services"</strong> means the care, support, and assistance services listed on the Platform, which may include but are not limited to: personal care, companionship, nursing services, pet care, childcare, and other travel support services.</li>
          <li><strong>"Booking"</strong> means an arrangement between a Client and a Provider facilitated through the Platform.</li>
          <li><strong>"Platform Fee"</strong> means the fee charged by The Travel Care Network for facilitating a Booking.</li>
        </ul>
      </Section>

      <Section title="3. Platform Role and Disclaimers">
        <SubSection title="3.1 Marketplace Only">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>The Travel Care Network operates as a marketplace connecting Clients with independent Providers. We are not a party to any agreement between a Client and a Provider. We do not provide care services ourselves.</p>
        </SubSection>
        <SubSection title="3.2 No Employment Relationship">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Providers are independent contractors, not employees, agents, or representatives of The Travel Care Network. We do not control the manner or method by which Providers perform their services. Providers are solely responsible for their own actions, taxes, insurance, licenses, and compliance with applicable laws.</p>
        </SubSection>
        <SubSection title="3.3 No Warranty of Services">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We do not warrant the quality, safety, or legality of any services provided by Providers. We do not endorse any Provider. All Providers are independent and we make no representations about their qualifications, credentials, or suitability.</p>
        </SubSection>
        <SubSection title="3.4 Verification Limitations">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>While we may conduct background checks, credential verification, and identity verification as part of our provider application process, we make no guarantee regarding the accuracy, completeness, or currentness of any verification. Background checks and verification have inherent limitations and may not reveal all relevant information.</p>
        </SubSection>
      </Section>

      <Section title="4. Client Terms">
        <SubSection title="4.1 Eligibility">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>To use the Platform as a Client, you must be at least 18 years of age and capable of forming a legally binding contract.</p>
        </SubSection>
        <SubSection title="4.2 Service Requests">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>When you submit a service request through the Platform: you agree to provide accurate information; you understand we will review your request and attempt to match you with an appropriate Provider; we do not guarantee a Provider will be available; you acknowledge Providers are independent.</p>
        </SubSection>
        <SubSection title="4.3 Payment">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Payment terms will be communicated at the time of Booking. Full payment may be required before services commence. Payments are processed securely through our third-party payment processor.</p>
        </SubSection>
        <SubSection title="4.4 Cancellation and Refunds">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Cancellation and refund policies will be provided at the time of Booking. Clients may cancel subject to the Provider's cancellation policy. Refunds will be processed minus any Platform Fees already incurred.</p>
        </SubSection>
        <SubSection title="4.5 Client Responsibilities">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>As a Client, you agree to: provide a safe and respectful environment; not request illegal activities; not circumvent the Platform to pay Providers directly; report concerns promptly.</p>
        </SubSection>
      </Section>

      <Section title="5. Provider Terms">
        <SubSection title="5.1 Eligibility">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>To apply as a Provider, you must be at least 18 years of age, have legal authorization to work in the United States, possess required licenses/certifications, consent to background checks, and not have been convicted of a disqualifying criminal offense.</p>
        </SubSection>
        <SubSection title="5.2 Application and Approval">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Submitting an application does not guarantee acceptance. We reserve the right to reject any application. Approved Providers must maintain accurate profile information.</p>
        </SubSection>
        <SubSection title="5.3 Independent Contractor Status">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Providers expressly acknowledge they are independent contractors, not employees. They are solely responsible for all taxes, are not entitled to employee benefits, and have complete discretion over their schedule and methods.</p>
        </SubSection>
        <SubSection title="5.4 Platform Fees">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>The standard Platform Fee is 15% of the total Booking amount. Fees are deducted before disbursement to Provider. Founding Providers may receive reduced fees on their first 5 Bookings.</p>
        </SubSection>
        <SubSection title="5.5 Provider Responsibilities">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Provide services with reasonable care and skill</li>
            <li>Maintain all required licenses, certifications, and credentials</li>
            <li>Carry appropriate liability insurance</li>
            <li>Maintain professional boundaries with Clients</li>
            <li>Not discriminate against any Client</li>
            <li>Report changes in background or legal status</li>
          </ul>
        </SubSection>
        <SubSection title="5.6 Background Check and Verification">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>By applying as a Provider, you consent to background checks, identity verification, credential verification, reference checks, and ongoing monitoring where permitted by law.</p>
        </SubSection>
        <SubSection title="5.7 Confidentiality">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Providers must keep all Client information strictly confidential, not disclose to third parties without consent, and comply with applicable privacy laws.</p>
        </SubSection>
      </Section>

      <Section title="6. Prohibited Conduct">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 8 }}>All users agree not to:</p>
        <ol style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Use the Platform for any illegal purpose</li>
          <li>Circumvent the Platform's fee structure or payment systems</li>
          <li>Harass, abuse, or harm any other user</li>
          <li>Provide false or misleading information</li>
          <li>Attempt to access another user's account without authorization</li>
          <li>Use the Platform to solicit services outside of the Platform</li>
          <li>Engage in any fraudulent activity</li>
          <li>Violate any third-party rights</li>
          <li>Interfere with the proper functioning of the Platform</li>
        </ol>
      </Section>

      <Section title="7. Limitation of Liability">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 600 }}>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>The Travel Care Network provides the Platform on an "AS IS" and "AS AVAILABLE" basis</li>
          <li>We make no warranties, express or implied, regarding the Platform or any services facilitated through it</li>
          <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
          <li>Our total liability to any user shall not exceed the total Platform Fees paid by that user in the 12 months preceding the claim</li>
          <li>We are not liable for any acts or omissions of any Provider or Client</li>
        </ul>
      </Section>

      <Section title="8. Indemnification">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>You agree to indemnify and hold harmless The Travel Care Network from any claims arising out of your use of the Platform, violation of these Terms, violation of third-party rights, or provision/receipt of services.</p>
      </Section>

      <Section title="9. Dispute Resolution">
        <SubSection title="9.1 Informal Resolution">Before filing any legal action, you agree to attempt to resolve disputes informally within 30 days.</SubSection>
        <SubSection title="9.2 Governing Law">These Terms shall be governed by the laws of the State of Arizona.</SubSection>
        <SubSection title="9.3 Venue">Any legal action shall be brought in the courts of Maricopa County, Arizona.</SubSection>
      </Section>

      <Section title="10. Termination">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We may suspend or terminate access to the Platform at any time, with or without cause or notice. Upon termination, all licenses and rights granted under these Terms immediately cease.</p>
      </Section>

      <Section title="11. Changes to Terms">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or through the Platform. Continued use after changes constitutes acceptance.</p>
      </Section>

      <Section title="12. Contact Information">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <strong>The Travel Care Network</strong><br />
          Phoenix, Arizona<br />
          By using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </p>
      </Section>
    </LegalPage>
  )
}