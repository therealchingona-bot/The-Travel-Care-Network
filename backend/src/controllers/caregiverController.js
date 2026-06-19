const { db } = require('../config/database');

exports.getAllCaregivers = (req, res) => {
  const { location, minRate, maxRate, services, category } = req.query;
  
  let query = `
    SELECT u.id, u.first_name, u.last_name, u.background_check_status,
           cp.bio, cp.experience_years, cp.certifications, cp.services, 
           cp.hourly_rate, cp.location, cp.availability, cp.verified_badge, cp.service_category,
           (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE caregiver_id = u.id) as avg_rating
    FROM users u
    JOIN caregiver_profiles cp ON u.id = cp.user_id
    WHERE u.role = 'caregiver'
  `;
  const params = [];

  if (location) {
    query += ' AND cp.location LIKE ?';
    params.push(`%${location}%`);
  }

  if (minRate) {
    query += ' AND cp.hourly_rate >= ?';
    params.push(minRate);
  }

  if (maxRate) {
    query += ' AND cp.hourly_rate <= ?';
    params.push(maxRate);
  }

  if (category) {
    query += ' AND cp.service_category = ?';
    params.push(category);
  }

  if (services) {
    // Basic service filtering, assuming services is a comma-separated list
    const serviceList = services.split(',');
    serviceList.forEach(service => {
      query += ' AND cp.services LIKE ?';
      params.push(`%${service.trim()}%`);
    });
  }

  try {
    const caregivers = db.prepare(query).all(...params);
    
    // Parse JSON strings back to arrays
    const formattedCaregivers = caregivers.map(c => ({
      ...c,
      certifications: JSON.parse(c.certifications || '[]'),
      services: JSON.parse(c.services || '[]')
    }));

    res.json(formattedCaregivers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCaregiverById = (req, res) => {
  const { id } = req.params;

  try {
    const caregiver = db.prepare(`
      SELECT u.id, u.email, u.first_name, u.last_name, u.background_check_status,
             cp.bio, cp.experience_years, cp.certifications, cp.services, 
             cp.hourly_rate, cp.location, cp.availability, cp.verified_badge, cp.service_category,
             (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE caregiver_id = u.id) as avg_rating
      FROM users u
      JOIN caregiver_profiles cp ON u.id = cp.user_id
      WHERE u.id = ? AND u.role = 'caregiver'
    `).get(id);

    if (!caregiver) {
      return res.status(404).json({ error: 'Caregiver not found' });
    }

    const reviews = db.prepare(`
      SELECT r.*, u.first_name as client_name
      FROM reviews r
      JOIN users u ON r.client_id = u.id
      WHERE r.caregiver_id = ?
    `).all(id);

    res.json({
      ...caregiver,
      certifications: JSON.parse(caregiver.certifications || '[]'),
      services: JSON.parse(caregiver.services || '[]'),
      reviews: reviews
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = (req, res) => {
  const { bio, experience_years, certifications, services, hourly_rate, location, availability, service_category } = req.body;
  const userId = req.user.id;

  try {
    const result = db.prepare(`
      UPDATE caregiver_profiles
      SET bio = ?, experience_years = ?, certifications = ?, services = ?, 
          hourly_rate = ?, location = ?, availability = ?, service_category = ?
      WHERE user_id = ?
    `).run(
      bio, 
      experience_years, 
      Array.isArray(certifications) ? JSON.stringify(certifications) : certifications,
      Array.isArray(services) ? JSON.stringify(services) : services,
      hourly_rate, 
      location, 
      availability, 
      service_category,
      userId
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.uploadCredential = (req, res) => {
  const { type, document_url } = req.body;
  const userId = req.user.id;

  if (!type || !document_url) {
    return res.status(400).json({ error: 'Type and document_url are required' });
  }

  try {
    db.prepare(`
      INSERT INTO credentials (user_id, type, document_url, status)
      VALUES (?, ?, ?, 'pending')
    `).run(userId, type, document_url);

    res.status(201).json({ message: 'Credential uploaded and pending verification' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOwnCredentials = (req, res) => {
  const userId = req.user.id;

  try {
    const credentials = db.prepare('SELECT * FROM credentials WHERE user_id = ?').all(userId);
    res.json(credentials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
