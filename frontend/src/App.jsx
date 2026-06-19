import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CaregiverSearch from './pages/CaregiverSearch'
import CaregiverProfile from './pages/CaregiverProfile'
import CaregiverRegister from './pages/CaregiverRegister'
import BookingFlow from './pages/BookingFlow'
import Dashboard from './pages/Dashboard'
import ClientDashboard from './pages/ClientDashboard'
import CaregiverDashboard from './pages/CaregiverDashboard'
import Messaging from './pages/Messaging'
import BookingConfirmation from './pages/BookingConfirmation'

// Legal pages (from new legal/ directory)
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import ProviderAgreement from './pages/legal/ProviderAgreement'
import CookiePolicy from './pages/legal/CookiePolicy'
import AcceptableUsePolicy from './pages/legal/AcceptableUsePolicy'

// Admin pages
import AdminDashboard from './pages/AdminDashboard'
import AdminRequests from './pages/AdminRequests'
import AdminProviders from './pages/AdminProviders'
import AdminBookings from './pages/AdminBookings'
import AdminUsers from './pages/AdminUsers'

// Profile settings
import ProfileSettings from './pages/ProfileSettings'

import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/caregivers" element={<CaregiverSearch />} />
        <Route path="/caregivers/:id" element={<CaregiverProfile />} />
        <Route path="/caregivers/register" element={<CaregiverRegister />} />
        <Route path="/book/:caregiverId" element={<BookingFlow />} />
        <Route path="/booking/:id/confirmation" element={<BookingConfirmation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/client" element={<Dashboard />} />
        <Route path="/dashboard/caregiver" element={<Dashboard />} />
        <Route path="/messages/:conversationId?" element={<Messaging />} />
        <Route path="/profile" element={<ProfileSettings />} />

        {/* Legal pages */}
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/provider-agreement" element={<ProviderAgreement />} />
        <Route path="/legal/cookies" element={<CookiePolicy />} />
        <Route path="/legal/acceptable-use" element={<AcceptableUsePolicy />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/providers" element={<AdminProviders />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>
    </Routes>
  )
}

export default App