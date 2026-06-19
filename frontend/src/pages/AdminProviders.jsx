import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { caregiversAPI } from '../api/client'

export default function AdminProviders() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await caregiversAPI.list()
        setProviders(Array.isArray(data) ? data : data.caregivers || [])
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [])

  return (
    <AdminLayout title="Provider Applications">
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 14 }}>
        Review and manage provider applications. Verify credentials and approve or deny.
      </p>
      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : providers.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', padding: 40, textAlign: 'center' }}>No provider applications yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-light)', textAlign: 'left' }}>
              <th style={{ padding: 10, fontSize: 13 }}>Name</th>
              <th style={{ padding: 10, fontSize: 13 }}>Category</th>
              <th style={{ padding: 10, fontSize: 13 }}>Rate</th>
              <th style={{ padding: 10, fontSize: 13 }}>Location</th>
              <th style={{ padding: 10, fontSize: 13 }}>Background Check</th>
              <th style={{ padding: 10, fontSize: 13 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10, fontSize: 13 }}>{p.name || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>{p.service_category || p.care_type || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>${p.rate || p.hourly_rate || 0}/hr</td>
                <td style={{ padding: 10, fontSize: 13 }}>{p.location || '—'}</td>
                <td style={{ padding: 10, fontSize: 13 }}>
                  <span className={`status-tag status-${p.background_check_status === 'verified' ? 'verified' : p.background_check_status === 'pending' ? 'pending' : 'rejected'}`}>
                    {p.background_check_status || 'none'}
                  </span>
                </td>
                <td style={{ padding: 10, fontSize: 13 }}>
                  <button className="btn btn-primary btn-sm" style={{ marginRight: 6 }}>Approve</button>
                  <button className="btn btn-outline btn-sm">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}