const { db } = require('../config/database');

// 1. Stats - GET /api/admin/stats
exports.getStats = (req, res) => {
  try {
    const stats = {};
    
    stats.totalTravelerRequests = db.prepare("SELECT COUNT(*) as count FROM traveler_requests").get().count;
    stats.pendingProviderApplications = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'caregiver' AND background_check_status = 'pending'").get().count;
    stats.activeBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'").get().count;
    
    // total commission earned (assuming 15% of total price of completed bookings)
    const revenue = db.prepare("SELECT SUM(total_price) as total FROM bookings WHERE status = 'completed'").get().total || 0;
    stats.totalCommission = revenue * 0.15;
    
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    stats.thisMonthBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE created_at >= ?").get(firstDayOfMonth).count;

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 2. Traveler requests - GET /api/admin/requests
exports.getTravelerRequests = (req, res) => {
  const { status } = req.query;
  try {
    let query = 'SELECT * FROM traveler_requests';
    const params = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    const requests = db.prepare(query).all(...params);
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTravelerRequestById = (req, res) => {
  const { id } = req.params;
  try {
    const request = db.prepare('SELECT * FROM traveler_requests WHERE id = ?').get(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTravelerRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    db.prepare('UPDATE traveler_requests SET status = ? WHERE id = ?').run(status, id);
    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addTravelerRequestNote = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  try {
    const request = db.prepare('SELECT admin_notes FROM traveler_requests WHERE id = ?').get(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    const newNotes = request.admin_notes ? request.admin_notes + '\n' + note : note;
    db.prepare('UPDATE traveler_requests SET admin_notes = ? WHERE id = ?').run(newNotes, id);
    res.json({ message: 'Note added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 3. Provider applications - GET /api/admin/providers
exports.getProviders = (req, res) => {
  const { status } = req.query;
  try {
    let query = `
      SELECT u.id, u.first_name, u.last_name, u.email, u.background_check_status, u.id_verified, u.created_at,
             cp.service_category, cp.hourly_rate, cp.location, u.admin_notes
      FROM users u
      LEFT JOIN caregiver_profiles cp ON u.id = cp.user_id
      WHERE u.role = 'caregiver'
    `;
    const params = [];
    
    if (status) {
      query += ' AND u.background_check_status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY u.created_at DESC';
    const providers = db.prepare(query).all(...params);
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProviderById = (req, res) => {
  const { id } = req.params;
  try {
    const provider = db.prepare(`
      SELECT u.*, cp.*
      FROM users u
      LEFT JOIN caregiver_profiles cp ON u.id = cp.user_id
      WHERE u.id = ? AND u.role = 'caregiver'
    `).get(id);
    
    if (!provider) return res.status(404).json({ error: 'Provider not found' });
    res.json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProviderStatus = (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  try {
    db.prepare('UPDATE users SET background_check_status = ?, admin_notes = ? WHERE id = ?').run(status, notes, id);
    
    if (status === 'verified') {
      db.prepare('UPDATE users SET id_verified = 1 WHERE id = ?').run(id);
      db.prepare('UPDATE caregiver_profiles SET verified_badge = 1 WHERE user_id = ?').run(id);
    }
    
    if (notes) {
      db.prepare('UPDATE caregiver_profiles SET admin_notes = ? WHERE user_id = ?').run(notes, id);
    }
    
    res.json({ message: 'Provider status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addProviderNote = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  try {
    const provider = db.prepare('SELECT admin_notes FROM users WHERE id = ? AND role = "caregiver"').get(id);
    if (!provider) return res.status(404).json({ error: 'Provider not found' });
    
    const newNotes = provider.admin_notes ? provider.admin_notes + '\n' + note : note;
    db.prepare('UPDATE users SET admin_notes = ? WHERE id = ?').run(newNotes, id);
    db.prepare('UPDATE caregiver_profiles SET admin_notes = ? WHERE user_id = ?').run(newNotes, id);
    
    res.json({ message: 'Note added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 4. Bookings - GET /api/admin/bookings
exports.getBookings = (req, res) => {
  const { status } = req.query;
  try {
    let query = `
      SELECT b.*, 
             u1.first_name as client_first_name, u1.last_name as client_last_name,
             u2.first_name as caregiver_first_name, u2.last_name as caregiver_last_name
      FROM bookings b
      JOIN users u1 ON b.client_id = u1.id
      LEFT JOIN users u2 ON b.caregiver_id = u2.id
    `;
    const params = [];
    if (status) {
      query += ' WHERE b.status = ?';
      params.push(status);
    }
    query += ' ORDER BY b.created_at DESC';
    const bookings = db.prepare(query).all(...params);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
    res.json({ message: 'Booking status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBookingPayment = (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  try {
    db.prepare('UPDATE bookings SET payment_status = ? WHERE id = ?').run(payment_status, id);
    res.json({ message: 'Payment status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 5. Matching - POST /api/admin/match
exports.matchProvider = (req, res) => {
  const { request_id, provider_id, total_price } = req.body;
  
  try {
    const request = db.prepare('SELECT * FROM traveler_requests WHERE id = ?').get(request_id);
    if (!request) return res.status(404).json({ error: 'Traveler request not found' });
    
    // Find client by email if not registered, or handle guest checkout
    let client = db.prepare('SELECT id FROM users WHERE email = ?').get(request.email);
    let clientId;
    
    if (client) {
      clientId = client.id;
    } else {
      // In a real app, we might create a shadow account or ask them to register.
      // For MVP matching, let's assume they might not be in users table yet if it's a lead.
      // But bookings require client_id. So we'll return error or create user.
      return res.status(400).json({ error: 'Client email not found in users. Client must register first.' });
    }

    // Start transaction
    const transaction = db.transaction(() => {
      // 1. Create booking
      const result = db.prepare(`
        INSERT INTO bookings (client_id, caregiver_id, start_date, end_date, total_price, status, payment_status)
        VALUES (?, ?, ?, ?, ?, 'confirmed', 'unpaid')
      `).run(clientId, provider_id, request.start_date, request.end_date, total_price || 0);
      
      const bookingId = result.lastInsertRowid;
      
      // 2. Update traveler request status
      db.prepare("UPDATE traveler_requests SET status = 'matched' WHERE id = ?").run(request_id);
      
      // 3. Create initial message from Admin to Client
      db.prepare(`
        INSERT INTO messages (booking_id, sender_id, receiver_id, content)
        VALUES (?, ?, ?, ?)
      `).run(bookingId, 8, clientId, `Admin has matched you with a provider for your request to ${request.destination}. You can now proceed with payment.`);
      
      return bookingId;
    });
    
    const bookingId = transaction();
    res.json({ message: 'Matched successfully', bookingId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 6. Users - GET /api/admin/users
exports.getUsers = (req, res) => {
  const { role } = req.query;
  try {
    let query = 'SELECT id, email, first_name, last_name, role, background_check_status, created_at FROM users';
    const params = [];
    if (role) {
      query += ' WHERE role = ?';
      params.push(role);
    }
    const users = db.prepare(query).all(...params);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyCredential = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('UPDATE credentials SET verified = 1, verified_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
    res.json({ message: 'Credential verified' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
