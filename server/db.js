const mysql = require('mysql2/promise'); // Import MySQL promise-based library
const dotenv = require('dotenv'); // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from .env file

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST, // MySQL host (from environment variables)
  user: process.env.MYSQL_USER, // MySQL username (from environment variables)
  password: process.env.MYSQL_PASSWORD, // MySQL password (from environment variables)
  database: 'Project', // Name of the database to use
});

module.exports = { db: pool }; // Export the connection pool to be used in other modules
