import React, { useEffect, useState } from 'react'; // Importing React and hooks for state management

// UserGreeting component to greet the user
const UserGreeting = () => {
  const [userId, setUserId] = useState('Loading...'); // State to store user ID or loading message

  // Fetch user information when component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Sending GET request to fetch user info
        const response = await fetch(`${process.env.BACKEND_API_URL}/userinfo`, {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies) with the request
          headers: {
            'Content-Type': 'application/json', // Set content type for the request
          },
        });
    
        // Check for errors in response
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please log in.'); // Handle unauthorized access
          } else {
            throw new Error('Network response was not ok'); // Handle other errors
          }
        }
    
        // Parse the JSON response
        const data = await response.json();
    
        if (data.userid) {
          // Capitalize the first letter of user ID for greeting
          const capitalizedUserId = data.userid.charAt(0).toUpperCase() + data.userid.slice(1);
          setUserId(`Hello, ${capitalizedUserId}!`); // Set greeting message
        } else {
          throw new Error('User ID not found in response'); // Handle missing user ID
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error); // Log any fetch errors
        alert('An error occurred. Please try again later.'); // Notify user of error
        setUserId('Error loading user information'); // Update state to reflect error
      }
    };

    fetchUserInfo(); // Call function to fetch user info
  }, []); // Run effect only once on mount

  // Render user greeting or loading message
  return <div id="userId" className="me-4">{userId}</div>;
};

export default UserGreeting; // Export UserGreeting component for use in other parts of the application
