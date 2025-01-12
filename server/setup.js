const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  try {
    // Create connection without database selected
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log('Connected to MySQL server');

    // Read and execute init-db.sql
    const sqlFile = await fs.readFile(path.join(__dirname, 'init-db.sql'), 'utf8');
    const statements = sqlFile.split(';').filter(stmt => stmt.trim());

    for (let statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }

    console.log('Database setup completed successfully');
    await connection.end();
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 