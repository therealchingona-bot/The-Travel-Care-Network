import React from 'react'
import LegalPage, { Section, SubSection } from './LegalPage'

export default function CookiePolicy() {
  return (
    <LegalPage title="Cookie Policy">
      <Section title="1. What Are Cookies">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit a website. They help the website recognize your device and remember information about your visit.
        </p>
      </Section>

      <Section title="2. How We Use Cookies">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 12 }}>The Travel Care Network uses cookies and similar tracking technologies for the following purposes:</p>
        
        <SubSection title="2.1 Essential Cookies">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>These cookies are necessary for the Platform to function properly. They enable user authentication, session management, secure login, and load balancing. Without these cookies, the Platform cannot operate properly.</p>
        </SubSection>
        
        <SubSection title="2.2 Functional Cookies">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>These cookies enhance your experience by remembering your preferences, settings, previously entered information, and language preferences.</p>
        </SubSection>
        
        <SubSection title="2.3 Analytics Cookies">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>We use analytics cookies to understand how users interact with our Platform, including pages visited, time spent, navigation patterns, and error messages. This helps us improve our Platform.</p>
        </SubSection>
        
        <SubSection title="2.4 Security Cookies">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>These cookies help protect the Platform by detecting unusual activity, preventing fraud, and protecting against unauthorized access.</p>
        </SubSection>
      </Section>

      <Section title="3. Third-Party Cookies">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We may allow certain third-party service providers to place cookies on your device, including Stripe (for payment processing) and analytics providers (for usage analysis). We do not control these third-party cookies.
        </p>
      </Section>

      <Section title="4. Your Cookie Choices">
        <SubSection title="4.1 Browser Controls">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Most web browsers allow you to control cookies through settings. You can view, delete, or block cookies from specific or all websites.</p>
        </SubSection>
        <SubSection title="4.2 Impact of Disabling Cookies">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>If you disable essential cookies, some or all Platform features may not function properly, including login, authentication, and form submissions.</p>
        </SubSection>
        <SubSection title="4.3 Do Not Track">
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>Our Platform does not currently respond to "Do Not Track" signals from web browsers.</p>
        </SubSection>
      </Section>

      <Section title="5. Types of Cookies We Use">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-muted)', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-light)', textAlign: 'left' }}>
                <th style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Type</th>
                <th style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Purpose</th>
                <th style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Session cookies</td><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Maintain your session during a visit</td><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Until browser is closed</td></tr>
              <tr><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Persistent cookies</td><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Remember preferences across visits</td><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Up to 12 months</td></tr>
              <tr><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Security cookies</td><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Protect against fraud</td><td style={{ padding: 10, borderBottom: '1px solid var(--border-color)' }}>Varies</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="6. Updates to This Policy">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date.
        </p>
      </Section>

      <Section title="7. Contact">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <strong>The Travel Care Network</strong><br />
          Phoenix, Arizona
        </p>
      </Section>
    </LegalPage>
  )
}