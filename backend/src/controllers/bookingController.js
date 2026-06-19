const { db } = require('../config/database');

exports.createBooking = (req, res) => {
  const { caregiver_id, start_date, end_date, total_price } = req.body;
  const client_id = req.user.id;

  try {
    const result = db.prepare(`
      INSERT INTO bookings (client_id, caregiver_id, start_date, end_date, total_price, status, payment_status)
      VALUES (?, ?, ?, ?, ?, 'pending', 'unpaid')
    `).run(client_id, caregiver_id, start_date, end_date, total_price);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Booking request created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookings = (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  try {
    let query = `
      SELECT b.*, 
             u1.first_name as client_first_name, u1.last_name as client_last_name,
             u2.first_name as caregiver_first_name, u2.last_name as caregiver_last_name
      FROM bookings b
      JOIN users u1 ON b.client_id = u1.id
      JOIN users u2 ON b.caregiver_id = u2.id
    `;

    if (role === 'client') {
      query += ' WHERE b.client_id = ?';
    } else if (role === 'caregiver') {
      query += ' WHERE b.caregiver_id = ?';
    }

    const bookings = db.prepare(query).all(userId);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookingById = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const booking = db.prepare(`
      SELECT b.*, 
             u1.first_name as client_first_name, u1.last_name as client_last_name,
             u2.first_name as caregiver_first_name, u2.last_name as caregiver_last_name
      FROM bookings b
      JOIN users u1 ON b.client_id = u1.id
      JOIN users u2 ON b.caregiver_id = u2.id
      WHERE b.id = ?
    `).get(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Permission check
    if (role === 'caregiver' && booking.caregiver_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (role === 'client' && booking.client_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Permission check
    if (role === 'caregiver' && booking.caregiver_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (role === 'client' && booking.client_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Business logic for status changes
    if (status === 'confirmed' && role !== 'caregiver') {
      return res.status(403).json({ error: 'Only caregivers can confirm bookings' });
    }

    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
    res.json({ message: `Booking status updated to ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
