import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { bookingsAPI } from '../api/client'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        // Derive users from bookings — backend may add dedicated endpoint later
        const { data } = await bookingsAPI.list()
        const bookings = Array.isArray(data) ? data : data.bookings || []
        const userMap = {}
        bookings.forEach(b => {
          if (b.client_id) userMap[b.client_id] = { id: b.client_id, name: b.client_name || 'Client', role: 'client', bookings: (userMap[b.client_id]?.bookings || 0) + 1 }
          if (b.caregiver_id) userMap[b.caregiver_id] = { id: b.caregiver_id, name: b.caregiver_name || 'Provider', role: 'provider', bookings: (userMap[b.caregiver_id]?.bookings || 0) + 1 }
        })
        setUsers(Object.values(userMap))
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [])

  return (
    <AdminLayout title="User Management">
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>
        View all platform users. Manage accounts and review activity.
      </p>
      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : users.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', padding: 40, textAlign: 'center' }}>No users found yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-light)', textAlign: 'left' }}>
              <th style={{ padding: 10, fontSize: 13 }}>ID</th>
              <th style={{ padding: 10, fontSize: 13 }}>Name</th>
              <th style={{ padding: 10, fontSize: 13 }}>Role</th>
              <th style={{ padding: 10, fontSize: 13 }}>Bookings</th>
              <th style={{ padding: 10, fontSize: 13 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10, fontSize: 13 }}>#{u.id?.toString().slice(0, 8)}</td>
                <td style={{ padding: 10, fontSize: 13 }}>{u.name}</td>
                <td style={{ padding: 10, fontSize: 13 }}><span className={`status-tag status-${u.role === 'provider' ? 'verified' : 'pending'}`}>{u.role}</span></td>
                <td style={{ padding: 10, fontSize: 13 }}>{u.bookings}</td>
                <td style={{ padding: 10, fontSize: 13 }}>
                  <button className="btn btn-outline btn-sm">View</button>
                  <button className="btn btn-outline btn-sm" style={{ marginLeft: 4, color: 'var(--error-red)' }}>Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}