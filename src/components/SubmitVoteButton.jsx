import React from 'react'; // Importing React library

// SubmitVoteButton component to submit a user's vote
const SubmitVoteButton = ({ onClick, disabled }) => {
    // Render button for submitting a vote
    return (
        <button className="submit-vote-btn mt-2" onClick={onClick} disabled={disabled}>
            Submit Vote
        </button>
    );
};

export default SubmitVoteButton; // Export SubmitVoteButton component for use in other parts of the application
