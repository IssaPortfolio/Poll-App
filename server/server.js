const express = require('express'); // Import express for creating the server
const session = require('express-session'); // Import express-session for managing sessions
const MySQLStore = require('express-mysql-session')(session); // Import MySQLStore for session storage in MySQL
const cors = require('cors'); // Import CORS for handling cross-origin requests
const apiRouter = require('./routes/index.js'); // Import the API routes
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an instance of an Express application

// Combine FRONTEND_URL and ALLOWED_ORIGINS into a single array
const allowedOrigins = [process.env.FRONTEND_URL, ...process.env.ALLOWED_ORIGINS.split(',')];

// Configure CORS middleware to allow requests from specified origins
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Check if the origin is in the allowed origins list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true); // Allow the request
    } else {
      return callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers in requests
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Configure MySQL session store with connection options
const sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST, // MySQL host from environment variables
  user: process.env.MYSQL_USER, // MySQL user from environment variables
  password: process.env.MYSQL_PASSWORD, // MySQL password from environment variables
  database: process.env.MYSQL_DATABASE, // MySQL database name from environment variables
  expiration: 86400000, // Session expiration time (1 day in milliseconds)
  createDatabaseTable: true, // Automatically create the sessions table if it doesn't exist
  schema: { // Define the schema for the sessions table
    tableName: 'sessions', // Name of the sessions table
    columnNames: { // Column names for the table
      session_id: 'session_id', // Column name for session ID
      expires: 'expires', // Column name for expiration time
      data: 'data' // Column name for session data
    }
  }
});

// Configure session middleware for the application
app.use(session({
  key: 'session_cookie_name', // Name of the session ID cookie
  secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
  store: sessionStore, // Use the MySQL session store
  resave: false, // Do not save the session if it was never modified
  saveUninitialized: false, // Do not save uninitialized sessions
  cookie: { secure: false, httpOnly: true, sameSite: 'lax' } // Cookie settings
}));

const path = require('path'); // Import path for handling file paths
app.use('/robots.txt', express.static(path.join(__dirname, 'robots.txt'))); // Serve robots.txt file

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// Use API routes defined in the index router
app.use('/api', apiRouter);

// Start the server and listen on port 4000
app.listen(4000, () => {
  console.log('Server running on port 4000'); // Log the server status
});
