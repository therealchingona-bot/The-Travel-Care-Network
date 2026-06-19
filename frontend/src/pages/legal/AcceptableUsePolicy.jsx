import React from 'react'
import LegalPage, { Section, SubSection } from './LegalPage'

export default function AcceptableUsePolicy() {
  return (
    <LegalPage title="Acceptable Use Policy">
      <Section title="1. Purpose">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          This Acceptable Use Policy ("AUP") governs the use of The Travel Care Network's platform, website, and services. This policy is designed to protect the safety, security, and integrity of our Platform and all users.
        </p>
      </Section>

      <Section title="2. Prohibited Activities">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>Users of the Platform may not engage in any of the following activities:</p>

        <SubSection title="2.1 Illegal Activities">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Violating any federal, state, or local law</li>
            <li>Engaging in fraud, theft, or deceptive practices</li>
            <li>Providing or soliciting illegal services</li>
          </ul>
        </SubSection>

        <SubSection title="2.2 Abuse and Harassment">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Harassing, threatening, or abusing any user</li>
            <li>Making discriminatory remarks</li>
            <li>Engaging in sexual harassment or misconduct</li>
            <li>Stalking or unwanted contact</li>
          </ul>
        </SubSection>

        <SubSection title="2.3 Fraud and Misrepresentation">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Providing false or misleading information</li>
            <li>Misrepresenting credentials or qualifications</li>
            <li>Impersonating any person or entity</li>
            <li>Creating fake accounts or applications</li>
          </ul>
        </SubSection>

        <SubSection title="2.4 Platform Abuse">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Circumventing the Platform's fee or payment systems</li>
            <li>Attempting to pay or receive payment outside the Platform</li>
            <li>Soliciting Platform-introduced Clients or Providers for independent arrangements</li>
            <li>Manipulating reviews, ratings, or feedback</li>
          </ul>
        </SubSection>

        <SubSection title="2.5 Safety Violations">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Arriving at a service location while under the influence</li>
            <li>Bringing unauthorized individuals to a service location</li>
            <li>Possessing weapons without lawful authority</li>
          </ul>
        </SubSection>

        <SubSection title="2.6 Privacy Violations">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Recording or photographing without consent</li>
            <li>Sharing personal or health information without authorization</li>
            <li>Violating confidentiality obligations</li>
          </ul>
        </SubSection>

        <SubSection title="2.7 Technical Abuse">
          <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Attempting to disrupt or damage the Platform</li>
            <li>Introducing viruses or malware</li>
            <li>Scraping data without authorization</li>
          </ul>
        </SubSection>
      </Section>

      <Section title="3. Provider-Specific Prohibitions">
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Cancel confirmed Bookings without valid reason and adequate notice</li>
          <li>Fail to appear for scheduled services without notice</li>
          <li>Provide services for which they are not qualified or licensed</li>
          <li>Solicit Clients for services outside the Platform</li>
          <li>Engage in conduct that would harm the reputation of The Travel Care Network</li>
        </ul>
      </Section>

      <Section title="4. Client-Specific Prohibitions">
        <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Request services that are illegal or outside the scope of the Platform</li>
          <li>Fail to provide a safe and respectful environment for Providers</li>
          <li>Make fraudulent payment claims or chargeback requests</li>
          <li>Solicit Providers for services outside the Platform</li>
          <li>Cancel Bookings without valid reason</li>
        </ul>
      </Section>

      <Section title="5. Enforcement">
        <SubSection title="5.1 Monitoring">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We reserve the right to monitor Platform activity for compliance with this policy.</p>
        </SubSection>
        <SubSection title="5.2 Reporting">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Users may report violations through our contact channels. All reports will be reviewed and investigated.</p>
        </SubSection>
        <SubSection title="5.3 Consequences">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Violations may result in warning, suspension, permanent removal from the Platform, forfeiture of payments, reporting to law enforcement, or legal action.</p>
        </SubSection>
      </Section>

      <Section title="6. Reporting Violations">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          To report a violation, please include: nature of the violation, date and time, names of individuals involved, and any supporting documentation.
        </p>
      </Section>

      <Section title="7. Cooperation with Law Enforcement">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We will cooperate fully with law enforcement authorities investigating illegal activity conducted through our Platform.
        </p>
      </Section>

      <Section title="8. Contact">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <strong>The Travel Care Network</strong><br />
          Phoenix, Arizona
        </p>
      </Section>
    </LegalPage>
  )
}