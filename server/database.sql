-- Create a database for the project if it doesn't already exist
CREATE DATABASE IF NOT EXISTS Project;

-- Use the newly created or existing database
USE Project;

-- Table to store users' information
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each user
  email VARCHAR(255) NOT NULL UNIQUE, -- Email address (must be unique)
  userid VARCHAR(255) NOT NULL UNIQUE, -- Unique user ID
  password VARCHAR(255) NOT NULL -- Hashed password for authentication
);

-- Table to manage session data (used for persistent login)
CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(36) NOT NULL PRIMARY KEY, -- Unique session identifier
  expires BIGINT(20) UNSIGNED NOT NULL, -- Expiration time for the session
  data TEXT DEFAULT NULL, -- Session data (stored as text)
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when session is created
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Auto-updated timestamp on modification
);

-- Table to store poll information
CREATE TABLE IF NOT EXISTS polls (
  poll_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique poll ID
  user_id INT, -- ID of the user who created the poll
  question VARCHAR(255) NOT NULL, -- The poll's question
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Poll creation time
  FOREIGN KEY (user_id) REFERENCES users(id) -- Link to the user who created the poll
);

-- Table to store poll options for each poll
CREATE TABLE IF NOT EXISTS poll_options (
  option_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique option ID
  poll_id INT, -- Poll to which the option belongs
  option_text VARCHAR(255) NOT NULL, -- The text of the poll option
  FOREIGN KEY (poll_id) REFERENCES polls(poll_id) -- Link to the corresponding poll
);

-- Table to store user responses to polls
CREATE TABLE IF NOT EXISTS user_responses (
  response_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique response ID
  user_id INT, -- ID of the user responding to the poll
  poll_id INT, -- The poll to which the response belongs
  option_id INT, -- The option selected by the user
  FOREIGN KEY (user_id) REFERENCES users(id), -- Link to the user
  FOREIGN KEY (poll_id) REFERENCES polls(poll_id), -- Link to the poll
  FOREIGN KEY (option_id) REFERENCES poll_options(option_id), -- Link to the selected option
  UNIQUE(user_id, poll_id)  -- Ensures that a user can only respond to a poll once
);

-- Table to store the results of each poll
CREATE TABLE IF NOT EXISTS poll_results (
  poll_id INT, -- The poll to which the results belong
  option_id INT, -- The option for which the votes are counted
  votes INT DEFAULT 0, -- Count of votes for the option
  PRIMARY KEY (poll_id, option_id), -- Composite primary key to ensure uniqueness
  FOREIGN KEY (poll_id) REFERENCES polls(poll_id), -- Link to the poll
  FOREIGN KEY (option_id) REFERENCES poll_options(option_id) -- Link to the option
);
