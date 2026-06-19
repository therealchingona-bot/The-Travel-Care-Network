const { db } = require('../config/database');

exports.createReview = (req, res) => {
  const { booking_id, rating, comment } = req.body;
  const client_id = req.user.id;

  try {
    const booking = db.prepare('SELECT caregiver_id, status FROM bookings WHERE id = ? AND client_id = ?').get(booking_id, client_id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found or not your booking' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ error: 'Can only review completed bookings' });
    }

    const result = db.prepare(`
      INSERT INTO reviews (booking_id, client_id, caregiver_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
    `).run(booking_id, client_id, booking.caregiver_id, rating, comment);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Review submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCaregiverReviews = (req, res) => {
  const { caregiverId } = req.params;

  try {
    const reviews = db.prepare(`
      SELECT r.*, u.first_name as client_name
      FROM reviews r
      JOIN users u ON r.client_id = u.id
      WHERE r.caregiver_id = ?
    `).all(caregiverId);

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
