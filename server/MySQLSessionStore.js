import { Store } from 'express-session'; // Import the base Store class from express-session
import { db } from './db.js'; // Import the database connection

// Define a custom session store using MySQL
class MySQLSessionStore extends Store {
  // Constructor to initialize the session store with options
  constructor(options) {
    super(options); // Call the parent constructor
    this.db = options.db || db; // Set the database connection; use the provided one or default to the imported db
  }

  // Retrieve a session by its session ID (sid)
  async get(sid, callback) {
    try {
      // Query the sessions table for the given session ID
      const [results] = await this.db.query('SELECT * FROM sessions WHERE sid = ?', [sid]);
      if (results.length > 0) {
        // If a session is found, parse and return the session data
        callback(null, JSON.parse(results[0].data));
      } else {
        // If no session is found, return null
        callback(null, null);
      }
    } catch (err) {
      // Handle any errors by passing the error to the callback
      callback(err);
    }
  }

  // Store a session in the database
  async set(sid, session, callback) {
    const data = JSON.stringify(session); // Convert the session object to a JSON string
    const expires = session.cookie.expires ? new Date(session.cookie.expires) : null; // Get the expiration date if it exists
    const now = new Date(); // Get the current date and time
    try {
      // Insert or update the session data in the sessions table
      await this.db.query(
        'INSERT INTO sessions (sid, expires, data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE expires = VALUES(expires), data = VALUES(data), updatedAt = VALUES(updatedAt)',
        [sid, expires, data, now, now]
      );
      // Call the callback without errors on success
      callback(null);
    } catch (err) {
      // Handle any errors by passing the error to the callback
      callback(err);
    }
  }
  
  // Delete a session by its session ID
  async destroy(sid, callback) {
    try {
      // Delete the session from the sessions table
      await this.db.query('DELETE FROM sessions WHERE sid = ?', [sid]);
      // Call the callback without errors on success
      callback(null);
    } catch (err) {
      // Handle any errors by passing the error to the callback
      callback(err);
    }
  }
}

export default MySQLSessionStore; // Export the MySQLSessionStore class for use in other modules
