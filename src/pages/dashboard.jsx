import React, { useEffect, useState } from 'react'; // Import necessary React libraries
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Footer component
import PollModal from '../components/PollModal'; // Import PollModal component for creating and voting on polls
import PollList from '../components/PollList'; // Import PollList component to display polls
import CreatePollButton from '../components/CreatePollButton'; // Import button component to create new polls
import '../../public/styles/global.css'; // Import global styles
import '../../public/styles/pages/dashboard.css'; // Import dashboard-specific styles

const Dashboard = () => {
    const [polls, setPolls] = useState([]); // State to store the list of polls
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility for creating/voting on polls
    const [votingPollId, setVotingPollId] = useState(null); // State to store the ID of the poll being voted on
    const [selectedOptionId, setSelectedOptionId] = useState(null); // State to store the ID of the selected voting option
    const [votedPolls, setVotedPolls] = useState(new Set()); // State to track polls already voted on
    const [userId, setUserId] = useState(null); // State to store the current user's ID

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_API_URL}/userid`, 
                    { credentials: 'include' }); // Fetch the user ID from the backend
                if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
                const data = await response.json(); // Parse the response to JSON
                setUserId(data.id); // Set the user ID state
            } catch (error) {
                console.error('Error fetching user ID:', error); // Log errors fetching user ID
                window.location.href = '/login'; // Redirect to login if error occurs
            }
        };

        fetchUserId(); // Invoke the function to fetch user ID
    }, []); // Run only once when the component mounts

    const fetchPolls = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_API_URL}/polls`, { credentials: 'include' }); // Fetch polls
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const data = await response.json(); // Parse the response to JSON
            setPolls(data); // Update state with fetched polls
            const votedPollsSet = new Set(data.filter(poll => poll.voted_by && poll.voted_by.includes(userId)).map(poll => poll.poll_id)); // Identify already voted polls
            setVotedPolls(votedPollsSet); // Update the state with voted polls
        } catch (error) {
            console.error('Error fetching polls:', error); // Log errors fetching polls
            window.location.href = '/login'; // Redirect to login if error occurs
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPolls(); // Fetch polls if user ID is available
        }
    }, [userId]); // Dependency on userId state

    const handleCreatePoll = async (pollData) => {
        try {
            const response = await fetch(`${process.env.BACKEND_API_URL}/polls`, {
                method: 'POST', // Specify the POST method for creating a poll
                headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
                body: JSON.stringify(pollData), // Convert poll data to JSON
                credentials: 'include', // Include credentials for the request
            });

            if (!response.ok) throw new Error(`Error creating poll: ${response.statusText}`);

            const newPoll = await response.json(); // Parse response for the newly created poll
            newPoll.options = newPoll.options.map((option, index) => ({
                option_id: index + 1, // Assign option ID
                option_text: option, // Store option text
                votes: 0, // Initialize vote count
            }));

            const userResponse = await fetch(`${process.env.BACKEND_API_URL}/userinfo`, { credentials: 'include' }); // Fetch user info
            if (!userResponse.ok) throw new Error(`Error fetching user ID: ${userResponse.statusText}`);
            const userData = await userResponse.json(); // Parse user info response
            newPoll.creator = userData.userid; // Assign creator ID to the poll

            setPolls((prevPolls) => [...prevPolls, newPoll]); // Update polls state with the new poll
            fetchPolls(); // Refresh polls after creating a new one
            setShowModal(false); // Close modal after creating a poll
        } catch (error) {
            console.error('Error creating poll:', error); // Log errors creating poll
        }
    };

    const handleVote = async () => {
        if (!votingPollId || !selectedOptionId) return; // Ensure both poll ID and option ID are selected

        const poll = polls.find((poll) => poll.poll_id === votingPollId); // Find the current poll
        if (!poll || !poll.options.some((option) => option.option_id === selectedOptionId)) {
            console.error('Poll data not fully updated'); // Log error if poll data is not valid
            return;
        }

        try {
            const payload = { pollId: votingPollId, optionId: selectedOptionId }; // Create payload for voting
            const response = await fetch(`${process.env.BACKEND_API_URL}/polls/vote`, {
                method: 'POST', // Specify the POST method for voting
                headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
                body: JSON.stringify(payload), // Convert payload to JSON
                credentials: 'include', // Include credentials for the request
            });

            if (response.ok) {
                setPolls((prevPolls) =>
                    prevPolls.map((poll) =>
                        poll.poll_id === votingPollId
                            ? {
                                  ...poll, // Update the poll with new vote
                                  options: poll.options.map((option) =>
                                      option.option_id === selectedOptionId
                                          ? { ...option, votes: option.votes + 1 } // Increment the vote count for the selected option
                                          : option
                                  ),
                              }
                            : poll
                    )
                );
                setVotedPolls(new Set(votedPolls).add(votingPollId)); // Update voted polls state
                setVotingPollId(null); // Reset votingPollId state
                setSelectedOptionId(null); // Reset selectedOptionId state
            } else {
                const errorData = await response.json(); // Parse error response
                console.error('Error response from server:', errorData); // Log server error
                throw new Error(errorData.error || 'Error voting'); // Handle error
            }
        } catch (error) {
            console.error('Error voting:', error); // Log errors during voting
            alert('An error occurred while voting.'); // Alert user of error
        }
    };

    const handleDeletePoll = async (pollId) => {
        try {
            const response = await fetch(`${process.env.BACKEND_API_URL}/polls/${pollId}`, {
                method: 'DELETE', // Specify the DELETE method for removing a poll
                credentials: 'include', // Include credentials for the request
            });

            if (response.ok) {
                setPolls(polls.filter((poll) => poll.poll_id !== pollId)); // Update polls state to remove the deleted poll
            } else {
                throw new Error('Error deleting poll'); // Handle error if response is not OK
            }
        } catch (error) {
            console.error('Error deleting poll:', error); // Log errors during poll deletion
            alert('An error occurred while deleting the poll.'); // Alert user of error
        }
    };

    const handleSignOut = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_API_URL}/signout`, {
                method: 'POST', // Specify the POST method for signing out
                credentials: 'include', // Include credentials for the request
            });

            if (response.ok) {
                setUserId(null); // Clear user ID state on successful sign-out
                window.location.href = '/login'; // Redirect to login page
            } else {
                throw new Error('Sign-out failed'); // Handle error if response is not OK
            }
        } catch (error) {
            console.error('Error signing out:', error); // Log errors during sign-out
        }
    };

    return (
        <div className="dashboard-body"> {/* Main container for the dashboard */}
            <Navbar title="Dashboard" buttonLabel="Sign Out" buttonPath="/" onButtonClick={handleSignOut} /> {/* Navbar with sign out functionality */}
            <div className="container"> {/* Container for dashboard content */}
                <div className="col-lg-10 col-md-10"> {/* Column for responsive layout */}
                    <div className="dashboard-container"> {/* Container for poll management */}
                        <CreatePollButton onClick={() => setShowModal(true)} /> {/* Button to create a new poll */}
                        <PollList
                            polls={polls} // Pass polls to PollList component
                            votingPollId={votingPollId} // Pass votingPollId to PollList component
                            selectedOptionId={selectedOptionId} // Pass selectedOptionId to PollList component
                            votedPolls={votedPolls} // Pass votedPolls to PollList component
                            userId={userId} // Pass userId to PollList component
                            setVotingPollId={setVotingPollId} // Pass setter for votingPollId to PollList component
                            setSelectedOptionId={setSelectedOptionId} // Pass setter for selectedOptionId to PollList component
                            handleVote={handleVote} // Pass vote handler to PollList component
                            handleDeletePoll={handleDeletePoll} // Pass delete poll handler to PollList component
                        />
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer component for the dashboard */}
            {showModal && <PollModal onClose={() => setShowModal(false)} onSubmit={handleCreatePoll} />} {/* Conditional rendering for the PollModal */}
        </div>
    );
};

export default Dashboard; // Export Dashboard component
