import React from 'react'; // Import React library for creating components

const DeletePollButton = ({ onClick }) => {
    return (
        <button className="delete-poll-btn" onClick={onClick}> {/* Button to delete a poll */}
            Delete Poll
        </button>
    );
};

export default DeletePollButton; // Export the DeletePollButton component for use in other parts of the application
