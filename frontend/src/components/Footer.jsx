import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link to="/" className="footer-logo">The Travel Care Network</Link>
            <p>The marketplace for travel-related in-home care. Making the world accessible for everyone.</p>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety & Trust</a></li>
              <li><Link to="/caregivers">Find Care</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/legal/privacy">Privacy Policy</Link></li>
              <li><Link to="/legal/terms">Terms of Service</Link></li>
              <li><Link to="/legal/cookies">Cookie Policy</Link></li>
              <li><Link to="/legal/provider-agreement">Provider Agreement</Link></li>
              <li><Link to="/legal/acceptable-use">Acceptable Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2026 The Travel Care Network Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}