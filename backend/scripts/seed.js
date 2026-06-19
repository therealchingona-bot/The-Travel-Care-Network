const bcrypt = require('bcryptjs');
const { db, initDb } = require('../src/config/database');

const seed = async () => {
  console.log('Seeding database...');

  // Drop tables to ensure schema updates (like constraints) are applied
  db.exec('DROP TABLE IF EXISTS traveler_requests');
  db.exec('DROP TABLE IF EXISTS documents');
  db.exec('DROP TABLE IF EXISTS reviews');
  db.exec('DROP TABLE IF EXISTS messages');
  db.exec('DROP TABLE IF EXISTS bookings');
  db.exec('DROP TABLE IF EXISTS caregiver_profiles');
  db.exec('DROP TABLE IF EXISTS users');

  // Initialize DB tables
  initDb();

  const salt = await bcrypt.genSalt(10);
  const hashedCaregiverPassword = await bcrypt.hash('caregiver123', salt);
  const hashedClientPassword = await bcrypt.hash('client123', salt);
  const hashedAdminPassword = await bcrypt.hash('admin123', salt);

  // Sample Providers (Various categories)
  const providers = [
    {
      email: 'jane.smith@example.com',
      password: hashedCaregiverPassword,
      first_name: 'Jane',
      last_name: 'Smith',
      role: 'caregiver',
      phone: '555-1001',
      service_category: 'cna',
      bio: 'Experienced CNA with 10 years of elder care experience.',
      experience_years: 10,
      certifications: JSON.stringify(['CNA', 'CPR']),
      services: JSON.stringify(['In-home care', 'Medication management', 'Meal prep']),
      hourly_rate: 35.0,
      location: 'Miami, FL',
      availability: 'Mon-Fri, 8am-6pm'
    },
    {
      email: 'john.doe@example.com',
      password: hashedCaregiverPassword,
      first_name: 'John',
      last_name: 'Doe',
      role: 'caregiver',
      service_category: 'rn',
      bio: 'Licensed Nurse specializing in pediatric care.',
      experience_years: 5,
      certifications: JSON.stringify(['RN', 'PALS']),
      services: JSON.stringify(['Pediatric care', 'Complex medical needs']),
      hourly_rate: 50.0,
      location: 'Orlando, FL',
      availability: 'Weekends'
    },
    {
      email: 'maria.garcia@example.com',
      password: hashedCaregiverPassword,
      first_name: 'Maria',
      last_name: 'Garcia',
      role: 'caregiver',
      service_category: 'housekeeper',
      bio: 'Professional housekeeper with a focus on deep cleaning and organization.',
      experience_years: 8,
      certifications: JSON.stringify(['Home Safety Certified']),
      services: JSON.stringify(['Deep cleaning', 'Laundry', 'Organization']),
      hourly_rate: 25.0,
      location: 'Miami, FL',
      availability: 'Mon, Wed, Fri'
    },
    {
      email: 'carlos.mendez@example.com',
      password: hashedCaregiverPassword,
      first_name: 'Carlos',
      last_name: 'Mendez',
      role: 'caregiver',
      service_category: 'chef',
      bio: 'Private chef specialized in healthy, dietary-restricted meal planning.',
      experience_years: 12,
      certifications: JSON.stringify(['Culinary Arts Degree', 'Food Safety']),
      services: JSON.stringify(['Meal planning', 'Private dining', 'Grocery shopping']),
      hourly_rate: 65.0,
      location: 'Fort Lauderdale, FL',
      availability: 'Evenings and weekends'
    },
    {
      email: 'lisa.park@example.com',
      password: hashedCaregiverPassword,
      first_name: 'Lisa',
      last_name: 'Park',
      role: 'caregiver',
      service_category: 'babysitter',
      bio: 'Energetic babysitter with experience in early childhood education.',
      experience_years: 4,
      certifications: JSON.stringify(['First Aid', 'Early Childhood Ed']),
      services: JSON.stringify(['Toddler care', 'Homework help', 'Creative play']),
      hourly_rate: 20.0,
      location: 'Tampa, FL',
      availability: 'Flexible'
    },
    {
      email: 'robert.chen@example.com',
      password: hashedCaregiverPassword,
      first_name: 'Robert',
      last_name: 'Chen',
      role: 'caregiver',
      service_category: 'elderly_care',
      bio: 'Elderly care companion with a focus on mental stimulation and safety.',
      experience_years: 6,
      certifications: JSON.stringify(['Senior Care Certified']),
      services: JSON.stringify(['Companionship', 'Light chores', 'Appointment escort']),
      hourly_rate: 30.0,
      location: 'Miami, FL',
      availability: 'Flexible'
    }
  ];

  for (const p of providers) {
    const background_status = p.email === 'robert.chen@example.com' || p.email === 'lisa.park@example.com' ? 'pending' : 'not_submitted';
    
    const result = db.prepare(
      'INSERT INTO users (email, password, first_name, last_name, role, background_check_status, phone) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(p.email, p.password, p.first_name, p.last_name, p.role, background_status, p.phone || null);

    const userId = result.lastInsertRowid;

    db.prepare(`
      INSERT INTO caregiver_profiles (user_id, service_category, bio, experience_years, certifications, services, hourly_rate, location, availability)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, p.service_category, p.bio, p.experience_years, p.certifications, p.services, p.hourly_rate, p.location, p.availability);
  }

  // Sample Client
  const client = {
    email: 'alice.jones@example.com',
    password: hashedClientPassword,
    first_name: 'Alice',
    last_name: 'Jones',
    role: 'client'
  };

  db.prepare(
    'INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)'
  ).run(client.email, client.password, client.first_name, client.last_name, client.role);

  // Sample Admin
  const admin = {
    email: 'admin@carebnb.com',
    password: hashedAdminPassword,
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin'
  };

  db.prepare(
    'INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)'
  ).run(admin.email, admin.password, admin.first_name, admin.last_name, admin.role);

  // Sample Traveler Requests
  const travelerRequests = [
    {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '555-0101',
      destination: 'Phoenix, AZ',
      start_date: '2026-07-01',
      end_date: '2026-07-10',
      care_type: 'Elderly Care',
      care_recipient_details: 'Father, 82, early stage dementia',
      mobility_needs: 'Uses a walker',
      medical_needs: 'non-medical',
      pet_care: 'No pets',
      special_instructions: 'Needs help with morning routine and meal prep',
      emergency_contact: 'Michael Brown (Son) - 555-0102',
      status: 'new'
    },
    {
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      phone: '555-0202',
      destination: 'Scottsdale, AZ',
      start_date: '2026-08-15',
      end_date: '2026-08-20',
      care_type: 'Post-Op Recovery',
      care_recipient_details: 'Self, 45, knee replacement',
      mobility_needs: 'Wheelchair/Crutches',
      medical_needs: 'medical',
      pet_care: 'Small dog (poodle)',
      special_instructions: 'Medication reminders and physical therapy exercise assistance',
      emergency_contact: 'James Wilson (Husband) - 555-0203',
      status: 'contacted'
    },
    {
      name: 'Alice Jones',
      email: 'alice.jones@example.com',
      phone: '555-0303',
      destination: 'Sedona, AZ',
      start_date: '2026-09-10',
      end_date: '2026-09-15',
      care_type: 'Companion',
      care_recipient_details: 'Self, traveling for solo vacation',
      mobility_needs: 'None',
      medical_needs: 'non-medical',
      pet_care: 'No pets',
      special_instructions: 'Looking for someone to join for hiking and dining',
      emergency_contact: 'Bob Jones - 555-0304',
      status: 'new'
    }
  ];

  for (const req of travelerRequests) {
    db.prepare(`
      INSERT INTO traveler_requests (name, email, phone, destination, start_date, end_date, care_type, care_recipient_details, mobility_needs, medical_needs, pet_care, special_instructions, emergency_contact, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.name, req.email, req.phone, req.destination, req.start_date, req.end_date, req.care_type, req.care_recipient_details, req.mobility_needs, req.medical_needs, req.pet_care, req.special_instructions, req.emergency_contact, req.status);
  }

  console.log('Database seeded successfully!');
};

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
