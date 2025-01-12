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
  user: process.env.DB_USER || 'romsql',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'requester_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    console.log('Database config:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'romsql',
      database: process.env.DB_NAME || 'requester_db',
      port: 3306
    });
    connection.release();
    
    // Create database if it doesn't exist
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'requester_db'}`);
    
    // Use the database
    await pool.query(`USE ${process.env.DB_NAME || 'requester_db'}`);
    
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        location VARCHAR(255) NOT NULL,
        property_need VARCHAR(50) NOT NULL,
        about_you TEXT NOT NULL,
        about_need TEXT NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database and table setup completed.');
  } catch (err) {
    console.error('Database connection error:', {
      message: err.message,
      code: err.code,
      errno: err.errno,
      sqlState: err.sqlState,
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'romsql'
    });
    process.exit(1);
  }
};

// Initialize database connection and start server
const startServer = async () => {
  await testConnection();
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
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