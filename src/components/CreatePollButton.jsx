import React from 'react'; // Import React library for creating components

const CreatePollButton = ({ onClick }) => {
    return (
        <div className="button-container"> {/* Container for the button */}
            <button className="create-poll-btn" onClick={onClick}> {/* Button to create a poll */}
                Create Poll
            </button>
        </div>
    );
};

export default CreatePollButton; // Export the CreatePollButton component for use in other parts of the application
