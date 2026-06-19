const { db } = require('../config/database');

// Upload ID document
exports.uploadId = (req, res) => {
  const { id_document_path } = req.body;
  const userId = req.user.id;

  if (!id_document_path) {
    return res.status(400).json({ error: 'id_document_path is required' });
  }

  try {
    db.prepare('UPDATE users SET id_document_path = ?, id_verified = 0 WHERE id = ?')
      .run(id_document_path, userId);

    res.json({ message: 'ID document uploaded successfully, verification pending' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get own verification status
exports.getVerificationStatus = (req, res) => {
  const userId = req.user.id;

  try {
    const user = db.prepare(`
      SELECT background_check_status, background_check_date, id_verified, id_document_path 
      FROM users WHERE id = ?
    `).get(userId);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Submit background check consent
exports.submitBackgroundCheck = (req, res) => {
  const userId = req.user.id;

  try {
    db.prepare(`
      UPDATE users 
      SET background_check_status = 'pending', background_check_date = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(userId);

    res.json({ message: 'Background check consent submitted, status set to pending' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update own profile (generic for all users)
exports.updateProfile = (req, res) => {
  const { first_name, last_name, email, phone, bio } = req.body;
  const userId = req.user.id;

  try {
    const transaction = db.transaction(() => {
      // 1. Update user table
      const userUpdates = [];
      const userParams = [];

      if (first_name) { userUpdates.push('first_name = ?'); userParams.push(first_name); }
      if (last_name) { userUpdates.push('last_name = ?'); userParams.push(last_name); }
      if (email) { userUpdates.push('email = ?'); userParams.push(email); }
      if (phone) { userUpdates.push('phone = ?'); userParams.push(phone); }

      if (userUpdates.length > 0) {
        userParams.push(userId);
        db.prepare(`UPDATE users SET ${userUpdates.join(', ')} WHERE id = ?`).run(...userParams);
      }

      // 2. Update caregiver_profiles if bio is provided and user is caregiver
      if (bio && req.user.role === 'caregiver') {
        db.prepare('UPDATE caregiver_profiles SET bio = ? WHERE user_id = ?').run(bio, userId);
      }

      // 3. Get updated user
      const updatedUser = db.prepare(`
        SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.phone, cp.bio
        FROM users u
        LEFT JOIN caregiver_profiles cp ON u.id = cp.user_id
        WHERE u.id = ?
      `).get(userId);

      return updatedUser;
    });

    const user = transaction();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Credentials
exports.uploadCredential = (req, res) => {
  const { type, title, file_path } = req.body;
  const userId = req.user.id;

  if (!type || !file_path) {
    return res.status(400).json({ error: 'Type and file_path are required' });
  }

  try {
    db.prepare(`
      INSERT INTO credentials (user_id, type, title, file_path)
      VALUES (?, ?, ?, ?)
    `).run(userId, type, title, file_path);

    res.status(201).json({ message: 'Credential uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCredentials = (req, res) => {
  const userId = req.user.id;
  try {
    const credentials = db.prepare('SELECT * FROM credentials WHERE user_id = ?').all(userId);
    res.json(credentials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateServices = (req, res) => {
  const { services } = req.body;
  const userId = req.user.id;

  if (req.user.role !== 'caregiver') {
    return res.status(403).json({ error: 'Only caregivers can update services' });
  }

  try {
    db.prepare('UPDATE caregiver_profiles SET services = ? WHERE user_id = ?').run(
      Array.isArray(services) ? JSON.stringify(services) : services,
      userId
    );
    res.json({ message: 'Services updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Mark user as verified
exports.verifyUser = (req, res) => {
  const { id } = req.params;
  const { verified_badge } = req.body;

  try {
    const user = db.prepare('SELECT role FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    db.prepare(`
      UPDATE users 
      SET background_check_status = 'verified', id_verified = 1 
      WHERE id = ?
    `).run(id);

    if (user.role === 'caregiver') {
      db.prepare('UPDATE caregiver_profiles SET verified_badge = ? WHERE user_id = ?')
        .run(verified_badge ? 1 : 0, id);
    }

    res.json({ message: 'User verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
