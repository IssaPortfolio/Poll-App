import React from 'react'; // Import React library
import PollItem from './PollItem'; // Import PollItem component to display individual polls
import '../../public/styles/components/polllist.css'; // Import styles for poll list

// PollList component to render a list of polls
const PollList = ({ polls, votingPollId, selectedOptionId, votedPolls, userId, setVotingPollId, setSelectedOptionId, handleVote, handleDeletePoll }) => {
    return (
        <div className="poll-box"> {/* Container for the poll list */}
            <ul>
                {polls.length === 0 ? ( // Check if there are no polls
                    <p className="dashboard-p">No polls available</p> // Display message if no polls
                ) : (
                    polls.map((poll) => ( // Map over each poll to render PollItem
                        <PollItem
                            key={poll.poll_id} // Unique key for each PollItem
                            poll={poll} // Pass current poll object to PollItem
                            votingPollId={votingPollId} // Current voting poll ID
                            selectedOptionId={selectedOptionId} // Selected option ID for voting
                            votedPolls={votedPolls} // Set of polls the user has voted on
                            userId={userId} // Current user's ID
                            setVotingPollId={setVotingPollId} // Setter for voting poll ID
                            setSelectedOptionId={setSelectedOptionId} // Setter for selected option ID
                            handleVote={handleVote} // Function to handle voting action
                            handleDeletePoll={handleDeletePoll} // Function to handle poll deletion
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export default PollList; // Export PollList component for use in other parts of the application
