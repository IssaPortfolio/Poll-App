import React from 'react'; // Import React library for creating components
import PollOptions from './PollOptions'; // Import PollOptions component for displaying poll options
import DeletePollButton from './DeletePollButton'; // Import DeletePollButton for poll deletion
import PollResults from './PollResults'; // Import PollResults to display results of the poll
import '../../public/styles/components/pollitem.css'; // Import CSS styles for poll item
import '../../public/styles/components/pollResults.css'; // Import CSS styles for poll results

const PollItem = ({ poll, votingPollId, selectedOptionId, votedPolls, userId, setVotingPollId, setSelectedOptionId, handleVote, handleDeletePoll }) => {
    return (
        <li className="poll-item"> {/* List item for each poll */}
            <h4 className="poll-question dashboard-h3">{poll.question}</h4> {/* Display poll question */}
            <p className="poll-creator">
                Created by: <b>{poll.creator ? poll.creator.charAt(0).toUpperCase() + poll.creator.slice(1) : 'Unknown'}</b> {/* Display poll creator */}
            </p>
            <PollOptions
                poll={poll} // Pass poll object to PollOptions
                votingPollId={votingPollId} // Current voting poll id
                selectedOptionId={selectedOptionId} // Selected option id for voting
                votedPolls={votedPolls} // Set of already voted polls
                setVotingPollId={setVotingPollId} // Setter for voting poll id
                setSelectedOptionId={setSelectedOptionId} // Setter for selected option id
                handleVote={handleVote} // Function to handle voting
            />
            {votedPolls.has(poll.poll_id) && <PollResults pollId={poll.poll_id} />} {/* Conditionally render PollResults if voted */}
            {userId === poll.user_id && (
                <DeletePollButton onClick={() => handleDeletePoll(poll.poll_id)} /> // Show delete button if the user is the creator
            )}
        </li>
    );
};

export default PollItem; // Export the PollItem component for use in other parts of the application
