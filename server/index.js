const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { submissionValidation, validate } = require('./middleware/validation');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// GET /api/listings with filters
app.get('/api/listings', async (req, res) => {
  try {
    const { location, type, status, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM listings WHERE 1=1';
    const params = [];

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }
    if (type) {
      query += ' AND property_type = ?';
      params.push(type);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (minPrice) {
      query += ' AND price >= ?';
      params.push(minPrice);
    }
    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(maxPrice);
    }

    query += ' ORDER BY created_at DESC LIMIT 8';

    const [rows] = await pool.execute(query, params);
    logger.info(`Retrieved ${rows.length} listings`);
    res.json(rows);
  } catch (error) {
    logger.error('Listings error:', error);
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
});

// GET /api/reviews with filtering
app.get('/api/reviews', async (req, res) => {
  try {
    const { minRating } = req.query;
    let query = 'SELECT r.*, u.name as author FROM reviews r JOIN users u ON r.user_id = u.id';
    const params = [];

    if (minRating) {
      query += ' WHERE rating >= ?';
      params.push(minRating);
    }

    query += ' ORDER BY rating DESC, created_at DESC LIMIT 10';

    const [rows] = await pool.execute(query, params);
    logger.info(`Retrieved ${rows.length} reviews`);
    res.json(rows);
  } catch (error) {
    logger.error('Reviews error:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// POST /api/submissions with enhanced validation
app.post('/api/submissions', submissionValidation, validate, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { name, email, whatsapp, location, propertyNeed, about, need, status } = req.body;

    // Create or find user
    const [existingUser] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    let userId;
    if (existingUser.length > 0) {
      userId = existingUser[0].id;
      // Update user info
      await connection.execute(
        'UPDATE users SET name = ?, whatsapp = ? WHERE id = ?',
        [name, whatsapp, userId]
      );
    } else {
      const [result] = await connection.execute(
        'INSERT INTO users (name, email, whatsapp) VALUES (?, ?, ?)',
        [name, email, whatsapp]
      );
      userId = result.insertId;
    }

    // Create submission
    await connection.execute(
      `INSERT INTO submissions (user_id, location, property_need, about, need, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, location, propertyNeed, about, need, status]
    );

    await connection.commit();
    logger.info(`New submission created for user ${userId}`);
    res.status(201).json({ message: 'Submission successful' });
  } catch (error) {
    await connection.rollback();
    logger.error('Submission error:', error);
    res.status(500).json({ message: 'Failed to submit request' });
  } finally {
    connection.release();
  }
});

// GET /api/submissions/:id - Get submission details
app.get('/api/submissions/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT s.*, u.name, u.email, u.whatsapp 
       FROM submissions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    logger.info(`Retrieved submission ${req.params.id}`);
    res.json(rows[0]);
  } catch (error) {
    logger.error('Submission retrieval error:', error);
    res.status(500).json({ message: 'Failed to fetch submission' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
}); 