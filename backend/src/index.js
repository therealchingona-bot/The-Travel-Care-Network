const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./config/database');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database
initDb();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://thetravelcarenetwork.com', 'https://www.thetravelcarenetwork.com', 'https://travelcarenetwork.com', 'https://www.travelcarenetwork.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Routes Placeholder
app.use('/api/auth', require('./routes/auth'));
app.use('/api/caregivers', require('./routes/caregivers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// SPA support: serve index.html for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
