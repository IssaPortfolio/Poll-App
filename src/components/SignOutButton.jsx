import React from 'react'; // Importing React library for building user interfaces
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

// SignOutButton component to handle user sign-out
const SignOutButton = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Function to handle sign-out action
    const handleSignOut = async () => {
        try {
            // Sending POST request to sign out the user
            const response = await fetch(`${process.env.BACKEND_API_URL}/signout`, {
                method: 'POST',
                credentials: 'include', // Include cookies with request for authentication
            });

            // Parsing the JSON response from the server
            const result = await response.json();

            if (response.ok) {
                // Check if the sign-out was successful
                if (result.success) {
                    // Clear session cookie on successful sign-out
                    document.cookie = 'session_cookie_name=; Max-Age=0; path=/; domain=localhost';
                    navigate('/login'); // Navigate to login page after sign-out
                } else {
                    // Alert user in case of an error from the server
                    alert(result.error || 'An error occurred during sign out.');
                }
            } else {
                console.error('Error response:', result); // Log error response
                alert(result.error || 'An error occurred during sign out.'); // Notify user of error
            }
        } catch (error) {
            console.error('Error:', error); // Log any fetch-related errors
            alert('An error occurred during sign out.'); // Notify user of error
        }
    };

    // Render button to trigger sign-out action
    return (
        <button onClick={handleSignOut} className="btn btn-primary">
            Sign Out
        </button>
    );
};

export default SignOutButton; // Export SignOutButton component for use in other parts of the application
