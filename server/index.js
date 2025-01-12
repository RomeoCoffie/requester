const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'requester_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    console.log('Database config:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'requester_db'
    });
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit if we can't connect to the database
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submission endpoint
app.post('/api/submissions', async (req, res) => {
  try {
    console.log('Received submission:', req.body);

    const {
      location,
      propertyNeed,
      aboutYou,
      aboutNeed,
      name,
      email,
      whatsapp,
      status
    } = req.body;

    // Input validation
    if (!location || !propertyNeed || !aboutYou || !aboutNeed || !name || !email || !whatsapp || !status) {
      console.log('Validation failed - missing fields:', {
        location: !!location,
        propertyNeed: !!propertyNeed,
        aboutYou: !!aboutYou,
        aboutNeed: !!aboutNeed,
        name: !!name,
        email: !!email,
        whatsapp: !!whatsapp,
        status: !!status
      });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Insert into database
    const [result] = await pool.execute(
      `INSERT INTO submissions 
       (location, property_need, about_you, about_need, name, email, whatsapp, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [location, propertyNeed, aboutYou, aboutNeed, name, email, whatsapp, status]
    );

    console.log('Submission successful:', result);

    res.status(201).json({
      message: 'Submission successful',
      submissionId: result.insertId
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 