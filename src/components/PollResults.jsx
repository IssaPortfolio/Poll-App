import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests
import '../../public/styles/components/pollResults.css'; // Import styles for poll results

// PollResults component to display the results of a poll
const PollResults = ({ pollId }) => {
    const [results, setResults] = useState([]); // State to store poll results
    const [error, setError] = useState(null); // State to store any error messages

    // Fetch poll results when the component mounts or pollId changes
    useEffect(() => {
        const fetchPollResults = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_API_URL}/polls/${pollId}/results`); // Fetch results from API
                setResults(response.data); // Set results in state
            } catch (err) {
                setError('Error fetching poll results'); // Set error message
                console.error(err); // Log error to the console
            }
        };

        fetchPollResults(); // Call fetch function
    }, [pollId]); // Dependency array to run effect when pollId changes

    if (error) {
        return <div>{error}</div>; // Render error message if an error occurred
    }

    // Calculate total votes across all options
    const totalVotes = results.reduce((sum, result) => sum + Number(result.votes), 0);

    return (
        <div>
            <h2>Poll Results</h2> {/* Header for poll results */}
            {results.length > 0 ? ( // Check if there are results to display
                <ul>
                    {results.map((result, index) => ( // Map over each result
                        <li key={index}>
                            {result.option_text}: {result.votes} votes {/* Display option text and votes */}
                            <div className="result-bar-container"> {/* Container for the result bar */}
                                <div
                                    className="result-bar" // Style for the result bar
                                    style={{ width: `${totalVotes > 0 ? (result.votes / totalVotes) * 100 : 0}%` }} // Calculate width based on votes
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results available</p> // Message when there are no results
            )}
        </div>
    );
};

export default PollResults; // Export PollResults component for use in other parts of the application
