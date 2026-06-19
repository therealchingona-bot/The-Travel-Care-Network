import React from 'react'
import LegalPage, { Section, SubSection } from './LegalPage'

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy">
      <Section title="1. Introduction">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          The Travel Care Network ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and services.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <SubSection title="2.1 Information You Provide">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 8 }}>We collect information you voluntarily provide when you:</p>
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 10 }}>
            <li><strong>Submit a care request:</strong> Name, email, phone, travel destination, care dates, care type, care recipient details, special instructions, emergency contact</li>
            <li><strong>Apply as a Provider:</strong> Full name, email, phone, address, professional credentials, certifications, licenses, work history, references, background check consent, ID documents, profile photos</li>
            <li><strong>Create an account:</strong> Email, password, name, role</li>
            <li><strong>Communicate with us:</strong> Any information shared in messages, support requests, or feedback</li>
            <li><strong>Complete a booking:</strong> Payment information (processed through third-party processor — we do not store full payment card details)</li>
          </ul>
        </SubSection>

        <SubSection title="2.2 Information Collected Automatically">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>When you access our Platform, we may automatically collect device information (browser type, operating system, IP address), usage data (pages visited, time spent, links clicked), and referring website or application.</p>
        </SubSection>

        <SubSection title="2.3 Cookies and Tracking Technologies">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We use cookies and similar tracking technologies to maintain your session, analyze Platform usage, improve user experience, and prevent fraud. For more information, see our Cookie Policy.</p>
        </SubSection>
      </Section>

      <Section title="3. How We Use Your Information">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 10 }}>We use collected information for:</p>
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Platform Operations:</strong> Process requests and applications, facilitate matches, process payments, communicate with users</li>
          <li><strong>Verification and Safety:</strong> Background checks, identity verification, credential verification, dispute resolution</li>
          <li><strong>Legal and Compliance:</strong> Comply with legal obligations, enforce Terms of Service, prevent fraud</li>
          <li><strong>Platform Improvement:</strong> Analyze usage patterns, improve services, develop new features</li>
          <li><strong>Communications:</strong> Send service-related communications, respond to inquiries, send administrative information</li>
        </ul>
      </Section>

      <Section title="4. How We Share Your Information">
        <SubSection title="4.1 Between Clients and Providers">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>To facilitate services, we share necessary information between matched Clients and Providers, including contact information and service needs.</p>
        </SubSection>
        <SubSection title="4.2 Service Providers">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We may share information with third parties who perform services on our behalf: payment processors (Stripe), background check providers, email/communication services, cloud storage, and analytics providers.</p>
        </SubSection>
        <SubSection title="4.3 Legal Requirements">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We may disclose information if required by law, court order, or to protect our rights or the safety of any person.</p>
        </SubSection>
        <SubSection title="4.4 Business Transfers">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.</p>
        </SubSection>
      </Section>

      <Section title="5. HIPAA Considerations">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          While The Travel Care Network is not a covered entity under HIPAA, we recognize the sensitive nature of health-related information. We limit collection of health information, implement reasonable safeguards, and encourage users to limit sharing of detailed medical information. Providers who receive health information are independently responsible for complying with applicable privacy laws.
        </p>
      </Section>

      <Section title="6. Data Security">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We implement reasonable security measures including SSL/TLS encryption for data in transit, secure data storage, access controls, and regular security assessments. However, no method of transmission or storage is 100% secure.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We retain your information for as long as necessary to provide Platform services, comply with legal obligations, resolve disputes, and enforce our agreements. When no longer needed, we will securely delete or anonymize it.
        </p>
      </Section>

      <Section title="8. Your Rights and Choices">
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Access and Portability:</strong> Request access to your personal information</li>
          <li><strong>Correction:</strong> Request correction of inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion subject to legal retention requirements</li>
          <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
          <li><strong>Cookie Preferences:</strong> Manage through browser settings</li>
        </ul>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 10 }}>To exercise these rights, contact us using the information below.</p>
      </Section>

      <Section title="9. Third-Party Services">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Our Platform may contain links to third-party websites. We are not responsible for their privacy practices. Payment processing is handled by Stripe, Inc. — your payment information is subject to Stripe's privacy policy.
        </p>
      </Section>

      <Section title="10. Children's Privacy">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Our Platform is not intended for individuals under 18. We do not knowingly collect information from children under 18.
        </p>
      </Section>

      <Section title="11. International Users">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Our Platform is operated in the United States. If you access from outside the US, your information may be transferred to, stored, and processed in the United States.
        </p>
      </Section>

      <Section title="12. California Privacy Rights">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          California residents may have additional rights under the CCPA, including requesting information about collected personal information and deletion of personal information (subject to exceptions). We do not sell your personal information.
        </p>
      </Section>

      <Section title="13. Contact Information">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <strong>The Travel Care Network</strong><br />
          Phoenix, Arizona<br />
          By using our Platform, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
        </p>
      </Section>
    </LegalPage>
  )
}