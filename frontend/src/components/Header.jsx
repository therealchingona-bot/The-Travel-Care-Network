import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../api/client'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('carebnb_token')

  useEffect(() => {
    if (token) {
      authAPI.getProfile().then(({ data }) => {
        setUser(data.user || data)
      }).catch(() => {
        localStorage.removeItem('carebnb_token')
        setUser(null)
      })
    }
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('carebnb_token')
    setUser(null)
    navigate('/')
  }

  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="The Travel Care Network Logo" onError={(e) => { e.target.style.display = 'none' }} />
            The Travel Care Network
          </Link>
          <ul className="nav-links">
            <li><a href="/#how-it-works">How it Works</a></li>
            <li><Link to="/caregivers">Browse Services</Link></li>
            <li><a href="/#features">Why Us</a></li>
          </ul>
          <div className="cta-buttons">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline btn-sm">
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline">Sign In</Link>
                <Link to="/caregivers" className="btn btn-primary">Find Help</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}