const { db } = require('../config/database');

exports.getMessagesByBooking = (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  try {
    // Check if user is part of the booking
    const booking = db.prepare('SELECT client_id, caregiver_id FROM bookings WHERE id = ?').get(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (booking.client_id !== userId && booking.caregiver_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const messages = db.prepare(`
      SELECT m.*, u.first_name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.booking_id = ?
      ORDER BY m.created_at ASC
    `).all(bookingId);

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendMessage = (req, res) => {
  const bookingId = req.params.bookingId || req.body.bookingId;
  const { content } = req.body;
  const sender_id = req.user.id;

  try {
    // Check if user is part of the booking
    const booking = db.prepare('SELECT client_id, caregiver_id FROM bookings WHERE id = ?').get(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (booking.client_id !== sender_id && booking.caregiver_id !== sender_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const receiver_id = (sender_id === booking.client_id) ? booking.caregiver_id : booking.client_id;

    const result = db.prepare(`
      INSERT INTO messages (booking_id, sender_id, receiver_id, content)
      VALUES (?, ?, ?, ?)
    `).run(bookingId, sender_id, receiver_id, content);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Message sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getConversations = (req, res) => {
  const userId = req.user.id;

  try {
    // Get all bookings for the user, and the latest message for each
    const conversations = db.prepare(`
      SELECT b.id as booking_id, 
             u1.id as client_id, u1.first_name as client_first_name, u1.last_name as client_last_name,
             u2.id as caregiver_id, u2.first_name as caregiver_first_name, u2.last_name as caregiver_last_name,
             (SELECT content FROM messages WHERE booking_id = b.id ORDER BY created_at DESC LIMIT 1) as last_message,
             (SELECT created_at FROM messages WHERE booking_id = b.id ORDER BY created_at DESC LIMIT 1) as last_message_time
      FROM bookings b
      JOIN users u1 ON b.client_id = u1.id
      JOIN users u2 ON b.caregiver_id = u2.id
      WHERE b.client_id = ? OR b.caregiver_id = ?
    `).all(userId, userId);

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
