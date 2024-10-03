const express = require('express');
const { getUserInfo, signOut, createAccount, login, getUserId } = require('../controllers/userController');
const { createPoll, getAllPolls, deletePoll, getPollResults, recordUserResponse } = require('../controllers/pollController');

const router = express.Router(); // Initialize the express router

// User-related routes

// Route for user registration (creating a new account)
router.post('/createAccount', createAccount);

// Route for user login
router.post('/login', login);

// Route to fetch authenticated user's information
router.get('/userinfo', getUserInfo);

// Route to log out a user and destroy their session
router.post('/signout', signOut);

// Route to retrieve the current user's ID based on their session
router.get('/userid', getUserId);

// Poll-related routes

// Route to create a new poll (requires authentication)
router.post('/polls', createPoll);

// Route to get all available polls
router.get('/polls', getAllPolls);

// Route to fetch the results of a specific poll
router.get('/polls/:pollId/results', getPollResults);

// Route to delete a poll (only the poll owner should be able to delete their poll)
router.delete('/polls/:pollId', deletePoll);

// Route for recording a user's response (vote) on a poll
router.post('/polls/vote', recordUserResponse);

module.exports = router; // Export the router so it can be used in the main server
