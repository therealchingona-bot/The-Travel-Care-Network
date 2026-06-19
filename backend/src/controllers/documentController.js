const { db } = require('../config/database');

exports.signDocument = (req, res) => {
  const { id } = req.params; // booking id
  const { type, signature } = req.body; // type: 'nda' or 'waiver'
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.client_id !== userId && booking.caregiver_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check if document entry exists for this booking and type
    let document = db.prepare('SELECT * FROM documents WHERE booking_id = ? AND type = ?').get(id, type);

    if (!document) {
      // Create new document entry
      const insertQuery = role === 'client' 
        ? 'INSERT INTO documents (booking_id, type, client_signature, signed_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)'
        : 'INSERT INTO documents (booking_id, type, caregiver_signature, signed_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
      
      db.prepare(insertQuery).run(id, type, signature);
    } else {
      // Update existing document entry
      const updateQuery = role === 'client'
        ? 'UPDATE documents SET client_signature = ?, signed_at = CURRENT_TIMESTAMP WHERE id = ?'
        : 'UPDATE documents SET caregiver_signature = ?, signed_at = CURRENT_TIMESTAMP WHERE id = ?';
      
      db.prepare(updateQuery).run(signature, document.id);
    }

    res.json({ message: `${type.toUpperCase()} signed successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
