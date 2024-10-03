const bcrypt = require('bcryptjs');
const { db } = require('../db');

// Controller to create a new account for the user
const createAccount = async (req, res) => {
    const { email, user_id, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Check if a user with the same email or user ID already exists
        const checkQuery = 'SELECT * FROM users WHERE email = ? OR userid = ?';
        const [checkResults] = await db.query(checkQuery, [email, user_id]);

        if (checkResults.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email or user ID' });
        }

        // Hash the user's password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (email, userid, password) VALUES (?, ?, ?)';
        await db.query(insertQuery, [email, user_id, hashedPassword]);
        
        res.status(200).json({ success: true, message: 'User successfully registered' });
    } catch (err) {
        console.error('Error inserting user into database:', err);
        res.status(500).json({ error: 'Error inserting user into database' });
    }
};

// Controller to handle user login
const login = async (req, res) => {
    const { email_or_user_id, password } = req.body;

    try {
        // Query for user by email or user ID
        const query = 'SELECT * FROM users WHERE email = ? OR userid = ?';
        const [results] = await db.query(query, [email_or_user_id, email_or_user_id]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = results[0];
        
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Save user ID in session after successful login
        req.session.userId = user.id;
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                return res.status(500).json({ error: 'Error saving session' });
            }
            res.json({ success: true, message: 'Login successful' });
        });
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Error querying database' });
    }
};

// Controller to retrieve authenticated user's info
const getUserInfo = async (req, res) => {
    const userId = req.session.userId;

    // Verify if the user is authenticated
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // Retrieve user info based on session user ID
        const query = 'SELECT userid FROM users WHERE id = ?';
        const [results] = await db.query(query, [userId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ userid: results[0].userid });
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Error querying database' });
    }
};

// Controller to sign out the user
const signOut = (req, res) => {
    // Destroy user session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ success: false, error: 'Failed to sign out.' });
        }
        res.clearCookie('session_cookie_name');
        res.json({ success: true });
    });
};

// Controller to get user ID based on session
const getUserId = async (req, res) => {
    const userId = req.session.userId;

    // Verify if the user is authenticated
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // Retrieve user ID from the database
        const query = 'SELECT id FROM users WHERE id = ?';
        const [results] = await db.query(query, [userId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ id: results[0].id });
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Error querying database' });
    }
};

module.exports = { createAccount, login, getUserInfo, signOut, getUserId };
