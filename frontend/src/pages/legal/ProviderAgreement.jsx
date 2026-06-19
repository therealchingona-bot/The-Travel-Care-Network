import React from 'react'
import LegalPage, { Section, SubSection } from './LegalPage'

export default function ProviderAgreement() {
  return (
    <LegalPage title="Provider Agreement">
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
        This Provider Agreement ("Agreement") is between you ("Provider," "you," "your") and The Travel Care Network ("Company," "we," "us," "our"). By submitting an application to become a Provider, you agree to the terms of this Agreement.
      </p>

      <Section title="1. Independent Contractor Relationship">
        <SubSection title="1.1 Independent Status">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider is an independent contractor, not an employee, agent, joint venturer, partner, or franchisee of the Company. This Agreement does not create an employment relationship.</p>
        </SubSection>
        <SubSection title="1.2 No Control">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>The Company does not control the manner or means by which Provider performs services. Provider retains sole discretion over work schedule, methods, whether to accept or decline Clients, and equipment used.</p>
        </SubSection>
        <SubSection title="1.3 No Benefits">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider is not entitled to health insurance, retirement plans, workers' compensation, unemployment insurance, paid time off, or overtime pay.</p>
        </SubSection>
        <SubSection title="1.4 Tax Responsibility">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider is solely responsible for all federal, state, and local taxes, including self-employment tax. The Company will not withhold taxes. Provider will receive a Form 1099-NEC for payments received if required by law.</p>
        </SubSection>
      </Section>

      <Section title="2. Provider Obligations">
        <SubSection title="2.1 Qualifications">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider represents they are at least 18, have legal authorization to work in the US, possess required licenses/certifications, have necessary skills and qualifications, and will maintain current credentials throughout the Agreement term.</p>
        </SubSection>
        <SubSection title="2.2 Background Check">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider agrees to consent to background checks, provide accurate information for verification, consent to identity/credential verification, report changes in background, and authorize ongoing monitoring. The Company may reject or terminate Provider based on results.</p>
        </SubSection>
        <SubSection title="2.3 Insurance">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider represents they carry appropriate liability insurance for the services they provide and will maintain such insurance throughout the Agreement term.</p>
        </SubSection>
        <SubSection title="2.4 Professional Conduct">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider agrees to provide services with reasonable care and skill, respect Client privacy, maintain professional boundaries, not engage in discriminatory conduct, comply with applicable laws, arrive on time, and communicate promptly about schedule changes.</p>
        </SubSection>
        <SubSection title="2.5 Confidentiality">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider agrees to keep all Client information confidential, not use Client information for purposes other than providing services, comply with privacy laws including HIPAA where applicable, and sign a separate NDA if requested.</p>
        </SubSection>
        <SubSection title="2.6 Compliance with Laws">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Provider agrees to comply with all applicable federal, state, and local laws, including licensing requirements, health and safety regulations, privacy laws, and anti-discrimination laws.</p>
        </SubSection>
      </Section>

      <Section title="3. Platform Fees and Payment">
        <SubSection title="3.1 Platform Fee">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 600 }}>Standard Platform Fee: 15% of the total Booking amount, deducted before disbursement.</p>
        </SubSection>
        <SubSection title="3.2 Fee Modifications">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>The Company reserves the right to modify Platform Fees with 30 days' written notice.</p>
        </SubSection>
        <SubSection title="3.3 Founding Provider Program">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Eligible Providers may receive a reduced Platform Fee on their first 5 Bookings at the Company's discretion.</p>
        </SubSection>
        <SubSection title="3.4 Payment Terms">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Payments will be disbursed after service completion and Client payment clearance via Stripe. Provider is responsible for providing accurate payment information.</p>
        </SubSection>
      </Section>

      <Section title="4. Client Relationships">
        <SubSection title="4.1 Platform-Introduced Clients">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>For 12 months after the last introduction, Provider agrees not to solicit Clients outside the Platform, accept payment outside the Platform, or circumvent the Platform's payment system for Platform-introduced relationships.</p>
        </SubSection>
      </Section>

      <Section title="5. Termination">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 10 }}>Either party may terminate this Agreement at any time. The Company may terminate for cause including violation of this Agreement, fraud, criminal conduct, failure to maintain credentials, or Client complaints. Upon termination, Provider's access is revoked and outstanding payments for completed services will be processed.</p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW: The Company's total liability shall not exceed total Platform Fees paid in the 12 months preceding the claim. The Company is not liable for indirect, incidental, or consequential damages, or for any acts or omissions of Clients.
        </p>
      </Section>

      <Section title="7. Indemnification">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Provider agrees to indemnify and hold harmless the Company from any claims arising out of Provider's provision of services, violation of this Agreement, violation of law, or any injury caused by Provider's actions.
        </p>
      </Section>

      <Section title="8. Dispute Resolution">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Parties agree to attempt informal resolution before legal action. If unsuccessful, parties agree to mediate in Maricopa County, Arizona. This Agreement is governed by the laws of the State of Arizona.
        </p>
      </Section>

      <Section title="9. Entire Agreement">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          This Agreement, together with the Terms of Service and Privacy Policy, constitutes the entire agreement between Provider and the Company.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 16, fontStyle: 'italic' }}>
          By submitting an application and accepting Bookings through the Platform, Provider acknowledges they have read, understood, and agreed to be bound by this Provider Agreement.
        </p>
      </Section>
    </LegalPage>
  )
}