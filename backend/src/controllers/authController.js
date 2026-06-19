const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

exports.register = async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  try {
    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const result = db.prepare(
      'INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)'
    ).run(email, hashedPassword, first_name, last_name, role);

    const userId = result.lastInsertRowid;

    // Create profile if role is caregiver
    if (role === 'caregiver') {
      const service_category = req.body.service_category || 'certified_caregiver';
      db.prepare('INSERT INTO caregiver_profiles (user_id, service_category) VALUES (?, ?)').run(userId, service_category);
    }

    // Create token
    const token = jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: { id: userId, email, first_name, last_name, role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMe = (req, res) => {
  try {
    const user = db.prepare(`
      SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.phone,
             u.background_check_status, u.id_verified,
             cp.bio, cp.verified_badge
      FROM users u
      LEFT JOIN caregiver_profiles cp ON u.id = cp.user_id
      WHERE u.id = ?
    `).get(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
