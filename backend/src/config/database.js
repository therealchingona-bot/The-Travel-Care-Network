const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../../data/carebnb.db');
const isDev = process.env.NODE_ENV !== 'production';
const db = new Database(dbPath, isDev ? { verbose: console.log } : {});

// Create tables
const initDb = () => {
  // Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT CHECK(role IN ('client', 'caregiver', 'admin')) NOT NULL,
      background_check_status TEXT CHECK(background_check_status IN ('not_submitted', 'pending', 'verified', 'failed')) DEFAULT 'not_submitted',
      background_check_date DATETIME,
      id_verified INTEGER DEFAULT 0,
      id_document_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);

    // Try to add new columns if they don't exist
    const userColumns = [
    { name: 'background_check_status', type: "TEXT DEFAULT 'not_submitted'" },
    { name: 'background_check_date', type: 'DATETIME' },
    { name: 'id_verified', type: 'INTEGER DEFAULT 0' },
    { name: 'id_document_path', type: 'TEXT' },
    { name: 'admin_notes', type: 'TEXT' },
    { name: 'phone', type: 'TEXT' }
    ];

    for (const col of userColumns) {
    try {
      db.exec(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type}`);
    } catch (e) {
      // Column likely already exists
    }
    }

    // Caregiver Profiles Table
    db.exec(`
    CREATE TABLE IF NOT EXISTS caregiver_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      bio TEXT,
      experience_years INTEGER,
      certifications TEXT, -- JSON array of strings
      services TEXT, -- JSON array of strings
      hourly_rate REAL,
      location TEXT,
      availability TEXT, -- JSON or text description
      liability_insurance TEXT,
      verified_badge INTEGER DEFAULT 0,
      service_category TEXT DEFAULT 'certified_caregiver', -- e.g., 'cna', 'rn', 'housekeeper', etc.
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
    `);

    const caregiverColumns = [
    { name: 'liability_insurance', type: 'TEXT' },
    { name: 'verified_badge', type: 'INTEGER DEFAULT 0' },
    { name: 'service_category', type: "TEXT DEFAULT 'certified_caregiver'" },
    { name: 'admin_notes', type: 'TEXT' }
    ];

    for (const col of caregiverColumns) {
    try {
      db.exec(`ALTER TABLE caregiver_profiles ADD COLUMN ${col.name} ${col.type}`);
    } catch (e) {
      // Column likely already exists
    }
    }

  // Bookings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      caregiver_id INTEGER, -- Nullable for admin matching
      start_date DATETIME NOT NULL,
      end_date DATETIME NOT NULL,
      status TEXT CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
      total_price REAL NOT NULL,
      payment_status TEXT CHECK(payment_status IN ('unpaid', 'escrowed', 'released', 'refunded')) DEFAULT 'unpaid',
      stripe_payment_intent_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      admin_notes TEXT,
      FOREIGN KEY (client_id) REFERENCES users (id),
      FOREIGN KEY (caregiver_id) REFERENCES users (id)
    )
  `);

  const bookingColumns = [
    { name: 'admin_notes', type: 'TEXT' }
  ];

  for (const col of bookingColumns) {
    try {
      db.exec(`ALTER TABLE bookings ADD COLUMN ${col.name} ${col.type}`);
    } catch (e) {
      // Column likely already exists
    }
  }

  // Messages Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      receiver_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings (id),
      FOREIGN KEY (sender_id) REFERENCES users (id),
      FOREIGN KEY (receiver_id) REFERENCES users (id)
    )
  `);

  // Reviews Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER NOT NULL,
      client_id INTEGER NOT NULL,
      caregiver_id INTEGER NOT NULL,
      rating INTEGER CHECK(rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings (id),
      FOREIGN KEY (client_id) REFERENCES users (id),
      FOREIGN KEY (caregiver_id) REFERENCES users (id)
    )
  `);

  // Documents Table (NDA/Waivers)
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER NOT NULL,
      type TEXT NOT NULL, -- 'nda' or 'waiver'
      content TEXT,
      signed_at DATETIME,
      client_signature TEXT, -- Could be a base64 or just a name/confirm
      caregiver_signature TEXT,
      FOREIGN KEY (booking_id) REFERENCES bookings (id)
    )
  `);

  // Traveler Requests Table (for Admin Matching)
  db.exec(`
    CREATE TABLE IF NOT EXISTS traveler_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      destination TEXT,
      start_date DATETIME,
      end_date DATETIME,
      care_type TEXT,
      care_recipient_details TEXT,
      mobility_needs TEXT,
      medical_needs TEXT, -- 'medical' or 'non-medical'
      pet_care TEXT,
      special_instructions TEXT,
      emergency_contact TEXT,
      status TEXT CHECK(status IN ('new', 'contacted', 'matched', 'booked', 'closed')) DEFAULT 'new',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Credentials Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      title TEXT,
      file_path TEXT,
      verified INTEGER DEFAULT 0,
      verified_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);
};

module.exports = {
  db,
  initDb
};
