import React from 'react'; // Import React library
import SubmitVoteButton from './SubmitVoteButton'; // Import SubmitVoteButton component

// PollOptions component to display voting options for a poll
const PollOptions = ({ poll, votingPollId, selectedOptionId, votedPolls, setVotingPollId, setSelectedOptionId, handleVote }) => {
    return (
        <ul className="poll-options"> {/* List of poll options */}
            {poll.options.map((option) => ( // Map over each option in the poll
                option.option_id ? ( // Check if option has an ID
                    <li key={`option-${poll.poll_id}-${option.option_id}`} className="poll-option"> {/* List item for each option */}
                        <label>
                            <input
                                type="radio" // Radio button for selecting options
                                name={`poll-${poll.poll_id}`} // Name attribute to group radio buttons
                                value={option.option_id} // Value of the selected option
                                onChange={() => { // Handle change event
                                    setVotingPollId(poll.poll_id); // Set the current voting poll ID
                                    setSelectedOptionId(option.option_id); // Set the selected option ID
                                }}
                                checked={selectedOptionId === option.option_id} // Check if the option is selected
                                disabled={votedPolls.has(poll.poll_id)} // Disable if the user has already voted
                            />
                            {option.option_text} {/* Display option text */}
                        </label>
                    </li>
                ) : null // Render nothing if option ID is not available
            ))}
            {votingPollId === poll.poll_id && !votedPolls.has(poll.poll_id) && ( // Check if current poll is being voted on and user hasn't voted
                <SubmitVoteButton onClick={handleVote} disabled={!selectedOptionId} /> // Show submit vote button
            )}
        </ul>
    );
};

export default PollOptions; // Export PollOptions component for use in other parts of the application
