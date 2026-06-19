import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { messagesAPI, bookingsAPI } from '../api/client'

export default function Messaging() {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(null)
  const [chatbookings, setChatbookings] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    // Fetch conversations list
    (async () => {
      try {
        const { data } = await bookingsAPI.list()
        setChatbookings(Array.isArray(data) ? data : data.bookings || [])
      } catch (_) {}
    })()
  }, [])

  useEffect(() => {
    if (!conversationId) { setLoading(false); return }
    (async () => {
      setLoading(true)
      try {
        const [mData, bData] = await Promise.allSettled([
          messagesAPI.list(conversationId),
          bookingsAPI.getById(conversationId),
        ])
        if (mData.status === 'fulfilled') {
          const data = mData.value.data
          setMessages(Array.isArray(data) ? data : data.messages || [])
        }
        if (bData.status === 'fulfilled') setBooking(bData.value.data.booking || bData.value.data)
      } catch (_) {} finally { setLoading(false) }
    })()
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!newMsg.trim() || !conversationId) return
    try {
      const { data } = await messagesAPI.send(conversationId, { message: newMsg })
      setMessages(prev => [...prev, data.message || data])
      setNewMsg('')
    } catch (_) {}
  }

  return (
    <div className="container" style={{ padding: '20px 0', display: 'flex', height: 'calc(100vh - 160px)' }}>
      {/* Conversation list */}
      <div style={{ width: 300, borderRight: '1px solid var(--border-color)', paddingRight: 15, overflowY: 'auto' }}>
        <h3 style={{ marginBottom: 15, padding: '0 5px' }}>Messages</h3>
        {chatbookings.length === 0 && <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: 5 }}>No conversations yet.</p>}
        {chatbookings.map(b => {
          const otherName = b.caregiver_name || b.client_name || b.caregiver?.name || b.client?.name || `Booking #${b.id}`
          return (
            <a href={`/messages/${b.id}`} key={b.id}
              style={{ display: 'block', padding: 12, borderRadius: 8, marginBottom: 4, textDecoration: 'none', color: 'inherit',
                background: conversationId === String(b.id) ? 'var(--bg-light)' : 'transparent', cursor: 'pointer' }}>
              <p style={{ fontWeight: 600, marginBottom: 2, fontSize: 14 }}>{otherName}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.status} • {b.start_date || ''}</p>
            </a>
          )
        })}
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, paddingLeft: 20, display: 'flex', flexDirection: 'column' }}>
        {!conversationId ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            Select a conversation to start messaging
          </div>
        ) : loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            Loading messages...
          </div>
        ) : (
          <>
            {/* Header */}
            {booking && (
              <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', marginBottom: 15 }}>
                <p style={{ fontWeight: 600 }}>{booking.caregiver_name || booking.client_name || 'Conversation'}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Booking #{booking.id} • {booking.status}
                </p>
              </div>
            )}

            {/* Messages list */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 15 }}>
              {messages.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20 }}>
                  No messages yet. Start the conversation!
                </p>
              )}
              {messages.map((m, i) => {
                const isMine = m.sender_role === 'client' || m.sender_role === 'caregiver'
                return (
                  <div key={m.id || i} style={{
                    maxWidth: '70%', padding: '10px 14px', borderRadius: 12,
                    background: isMine ? 'var(--primary-teal)' : 'var(--bg-light)',
                    color: isMine ? 'white' : 'var(--text-dark)',
                    marginBottom: 8, marginLeft: isMine ? 'auto' : 0,
                  }}>
                    <p style={{ fontSize: 14 }}>{m.message || m.text || m.content}</p>
                    <p style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
                      {m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 10 }}>
              <input type="text" className="form-control" placeholder="Type a message..." value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)} style={{ flex: 1 }} />
              <button type="submit" className="btn btn-primary" disabled={!newMsg.trim()}>Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}