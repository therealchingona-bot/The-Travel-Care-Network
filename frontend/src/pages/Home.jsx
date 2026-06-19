import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Travel with confidence. Care wherever you go.<br/><span style={{fontSize:'1.5rem', color:'var(--secondary-coral)'}}>Serving Phoenix Metro and beyond.</span></h1>
              <p>Find trusted professionals for your travels — CNAs, chefs, housekeepers, babysitters, drivers, and more. The Travel Care Network connects you with everything you need, wherever you're headed.</p>
              <div className="cta-buttons">
                <Link to="/caregivers" className="btn btn-primary btn-lg">Find a Provider</Link>
                <Link to="/caregivers/register" className="btn btn-secondary btn-lg">Offer Your Services</Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/hero.png" alt="Happy traveler with caregiver" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <p className="trust-label">TRUSTED BY TRAVELERS AND FAMILIES WORLDWIDE</p>
          <div className="trust-logos">
            <span><i className="fas fa-shield-alt"></i> HIPAA Compliant</span>
            <span><i className="fas fa-certificate"></i> Verified CNAs</span>
            <span><i className="fas fa-lock"></i> Escrow Payments</span>
            <span><i className="fas fa-user-check"></i> Background Checked</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Why The Travel Care Network?</h2>
            <p>We make it easy to find professional care, wherever your journey takes you.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card card">
              <div className="feature-icon"><i className="fas fa-user-check"></i></div>
              <h3>Verified Professionals</h3>
              <p>Every caregiver on our platform undergoes rigorous background checks and credential verification.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon"><i className="fas fa-lock"></i></div>
              <h3>Secure & Simple</h3>
              <p>From secure messaging to escrowed payments, we handle the logistics so you can focus on your trip.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon"><i className="fas fa-heartbeat"></i></div>
              <h3>Personalized Care</h3>
              <p>Find caregivers who match your specific medical needs, language preferences, and personality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
          </div>
          
          <div className="step-grid">
            <div className="step-content">
              <span className="step-number">1</span>
              <h3>Search by Destination</h3>
              <p>Enter your travel dates and destination. Filter by the level of care required (CNA, RN, or Certified Caregiver).</p>
            </div>
            <div className="step-image">
              <img src="/caregiver-working.png" alt="Searching for caregiver" />
            </div>
          </div>

          <div className="step-grid">
            <div className="step-image step-placeholder">
              <div className="placeholder-icon">
                <i className="fas fa-comments"></i>
              </div>
            </div>
            <div className="step-content">
              <span className="step-number">2</span>
              <h3>Book and Connect</h3>
              <p>Message potential caregivers, review their profiles, and book directly on the platform. All NDAs and waivers are handled digitally.</p>
            </div>
          </div>

          <div className="step-grid">
            <div className="step-content">
              <span className="step-number">3</span>
              <h3>Travel with Peace of Mind</h3>
              <p>Enjoy your trip knowing your care is scheduled and confirmed. Payments are released only after service is completed.</p>
            </div>
            <div className="step-image step-placeholder">
              <div className="placeholder-icon">
                <i className="fas fa-plane-departure"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}