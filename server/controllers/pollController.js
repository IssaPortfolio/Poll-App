const { db } = require('../db');

// Controller function to create a new poll
const createPoll = async (req, res) => {
    const { question, options } = req.body;
    const userId = req.session.userId;

    // Verify user authentication
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // Insert the new poll into the database
        const pollQuery = 'INSERT INTO polls (user_id, question) VALUES (?, ?)';
        const [result] = await db.query(pollQuery, [userId, question]);
        const pollId = result.insertId;

        // Validate that there is at least one option
        if (options.length === 0) {
            return res.status(400).json({ error: 'At least one option is required' });
        }

        // Insert poll options into the database
        const optionsQuery = 'INSERT INTO poll_options (poll_id, option_text) VALUES ?';
        const optionsValues = options.map(opt => [pollId, opt]);

        await db.query(optionsQuery, [optionsValues]);
        res.status(201).json({ poll_id: pollId, question, options });
    } catch (err) {
        console.error('Error creating poll:', err);
        res.status(500).json({ error: 'Error creating poll' });
    }
};

// Controller function to get all polls with their options and creators
const getAllPolls = async (req, res) => {
    try {
        // Query to fetch all polls with options and related data (creator, voters)
        const query = `
            SELECT 
                polls.poll_id, 
                polls.user_id, 
                polls.question, 
                poll_options.option_id, 
                poll_options.option_text, 
                user_responses.user_id AS voted_by,
                users.userid AS creator
            FROM polls
            LEFT JOIN poll_options ON polls.poll_id = poll_options.poll_id
            LEFT JOIN user_responses ON polls.poll_id = user_responses.poll_id
            LEFT JOIN users ON polls.user_id = users.id
        `;
        const [results] = await db.query(query);

        // Group the results into a structured format for each poll
        const polls = results.reduce((acc, row) => {
            const poll = acc.find(poll => poll.poll_id === row.poll_id);
            if (poll) {
                if (row.option_id && !poll.options.some(option => option.option_id === row.option_id)) {
                    poll.options.push({ option_id: row.option_id, option_text: row.option_text });
                }
                if (row.voted_by && !poll.voted_by.includes(row.voted_by)) {
                    poll.voted_by.push(row.voted_by);
                }
            } else {
                acc.push({
                    poll_id: row.poll_id,
                    user_id: row.user_id,
                    creator: row.creator,
                    question: row.question,
                    options: row.option_id ? [{ option_id: row.option_id, option_text: row.option_text }] : [],
                    voted_by: row.voted_by ? [row.voted_by] : []
                });
            }
            return acc;
        }, []);

        res.json(polls);
    } catch (err) {
        console.error('Error fetching polls:', err);
        res.status(500).json({ error: 'Error fetching polls' });
    }
};

// Controller function to record user responses for a poll
const recordUserResponse = async (req, res) => {
    const { pollId, optionId } = req.body;
    const userId = req.session.userId;

    // Verify user authentication
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // Check if the user has already voted in the poll
        const checkQuery = 'SELECT * FROM user_responses WHERE user_id = ? AND poll_id = ?';
        const [existingResponse] = await db.query(checkQuery, [userId, pollId]);

        if (existingResponse.length > 0) {
            return res.status(400).json({ error: 'User has already voted in this poll' });
        }

        // Validate the selected poll option
        const optionCheckQuery = 'SELECT * FROM poll_options WHERE option_id = ? AND poll_id = ?';
        const [optionExists] = await db.query(optionCheckQuery, [optionId, pollId]);

        if (optionExists.length === 0) {
            console.error('Invalid option_id:', optionId, 'for pollId:', pollId);
            return res.status(400).json({ error: 'Invalid option_id' });
        }

        // Insert the user's response
        const insertQuery = 'INSERT INTO user_responses (user_id, poll_id, option_id) VALUES (?, ?, ?)';
        await db.query(insertQuery, [userId, pollId, optionId]);

        // Update poll results by incrementing the votes
        const updateQuery = `
            INSERT INTO poll_results (poll_id, option_id, votes)
            VALUES (?, ?, 1)
            ON DUPLICATE KEY UPDATE votes = votes + 1
        `;
        await db.query(updateQuery, [pollId, optionId]);

        res.status(201).json({ message: 'Response recorded successfully' });
    } catch (err) {
        console.error('Error recording response:', err);
        res.status(500).json({ error: 'Error recording response' });
    }
};

// Controller function to retrieve poll results
const getPollResults = async (req, res) => {
    const { pollId } = req.params;

    try {
        // Query to fetch poll results by poll ID
        const query = `
            SELECT 
                poll_options.option_id,
                poll_options.option_text,
                COALESCE(SUM(poll_results.votes), 0) AS votes
            FROM poll_options
            LEFT JOIN poll_results ON poll_options.option_id = poll_results.option_id AND poll_options.poll_id = poll_results.poll_id
            WHERE poll_options.poll_id = ?
            GROUP BY poll_options.option_id
        `;
        const [results] = await db.query(query, [pollId]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        res.json(results);
    } catch (err) {
        console.error('Error fetching poll results:', err);
        res.status(500).json({ error: 'Error fetching poll results' });
    }
};

// Controller function to delete a poll
const deletePoll = async (req, res) => {
    const { pollId } = req.params;
    const userId = req.session.userId;

    // Verify user authentication
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // Check if the user is the poll creator
        const checkQuery = 'SELECT user_id FROM polls WHERE poll_id = ?';
        const [result] = await db.query(checkQuery, [pollId]);

        if (result.length === 0 || result[0].user_id !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        // Start a transaction to delete the poll and related data
        await db.query('START TRANSACTION');

        const deleteResponsesQuery = 'DELETE FROM user_responses WHERE poll_id = ?';
        await db.query(deleteResponsesQuery, [pollId]);

        const deleteResultsQuery = 'DELETE FROM poll_results WHERE poll_id = ?';
        await db.query(deleteResultsQuery, [pollId]);

        const deleteOptionsQuery = 'DELETE FROM poll_options WHERE poll_id = ?';
        await db.query(deleteOptionsQuery, [pollId]);

        const deleteQuery = 'DELETE FROM polls WHERE poll_id = ?';
        await db.query(deleteQuery, [pollId]);

        // Commit the transaction if all queries succeed
        await db.query('COMMIT');

        res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (err) {
        // Rollback the transaction in case of error
        await db.query('ROLLBACK');
        console.error('Error deleting poll:', err);
        res.status(500).json({ error: 'Error deleting poll' });
    }
};

module.exports = { createPoll, getAllPolls, recordUserResponse, deletePoll, getPollResults };
