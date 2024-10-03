import React, { useEffect, useState } from 'react'; // Import React and hooks
import { Navigate } from 'react-router-dom'; // Import Navigate for redirecting

// ProtectedRoute component to protect routes from unauthorized access
const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // State to check authentication

    // Check user authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_API_URL}/userinfo`, { // Fetch user info from API
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json', // Set content type for the request
                    },
                });

                if (response.ok) {
                    setIsAuthenticated(true); // User is authenticated
                } else if (response.status === 401) {
                    setIsAuthenticated(false); // User is not authenticated
                }
            } catch (error) {
                console.error('Error checking authentication:', error); // Log any errors
                setIsAuthenticated(false); // Set authentication state to false on error
            }
        };

        checkAuth(); // Call authentication check function
    }, []); // Run effect only once on mount

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show loading state while checking authentication
    }

    return isAuthenticated ? children : <Navigate to="/login" />; // Render children if authenticated, otherwise redirect to login
};

export default ProtectedRoute; // Export ProtectedRoute component for use in other parts of the application
