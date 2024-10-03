import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../components/Navbar'; // Import Navbar component for navigation
import Footer from '../components/Footer'; // Import Footer component for page footer
import FormInput from '../components/FormInput'; // Import FormInput component for form fields
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles for responsive design
import '../../public/styles/global.css'; // Import global styles for the application
import '../../public/styles/pages/login-create-account-page.css'; // Import styles specific to login/create account page
import '../../public/styles/components/navbar.css'; // Import styles specific to the Navbar component
import '../../public/styles/components/footer.css'; // Import styles specific to the Footer component

// Define the LoginPage component
const LoginPage = () => {
    const navigate = useNavigate(); // Initialize navigation function
    const [emailOrUserId, setEmailOrUserId] = useState(''); // State for email or user ID input
    const [password, setPassword] = useState(''); // State for password input

    // Function to handle login form submission
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            // Send login request to the backend
            const response = await fetch(`${process.env.BACKEND_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                credentials: 'include', // Include cookies for session management
                body: JSON.stringify({ // Send email or user ID and password as JSON
                    email_or_user_id: emailOrUserId,
                    password,
                }),
            });

            const result = await response.json(); // Parse JSON response

            if (response.ok) { // Check if response is successful
                if (result.success) { // Check if login was successful
                    navigate('/dashboard'); // Redirect to dashboard on successful login
                } else {
                    alert(result.error || 'An error occurred. Please try again later.'); // Show error message if login fails
                }
            } else {
                console.error('Error response:', result); // Log error response for debugging
                alert(result.error || 'An error occurred. Please try again later.'); // Show error message for other errors
            }
        } catch (error) {
            console.error('Error:', error); // Log any caught errors
            alert('An error occurred. Please try again later.'); // Show general error message
        }
    };

    return (
        <>
            <Navbar title="Login" buttonLabel="Sign Up" buttonPath="/createAccount" /> {/* Render Navbar for login */}
            <main className="login-section"> {/* Main section for login form */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-12"> {/* Left column for image */}
                            <img src="https://poll-app.s3.us-east-2.amazonaws.com/login-image.png" alt="Login Image" className="img-fluid" /> {/* Login image */}
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12"> {/* Right column for form */}
                            <h2 className="text-center mb-4">Login</h2> {/* Login heading */}
                            <form id="loginForm" onSubmit={handleLogin}> {/* Login form */}
                                <FormInput
                                    label="Email or User ID" // Label for input field
                                    type="text" // Input type
                                    id="emailOrUserId" // Input ID
                                    value={emailOrUserId} // Input value from state
                                    onChange={(e) => setEmailOrUserId(e.target.value)} // Update state on change
                                />
                                <FormInput
                                    label="Password" // Label for input field
                                    type="password" // Input type
                                    id="password" // Input ID
                                    value={password} // Input value from state
                                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                                />
                                <button type="submit" className="btn btn-primary">Log In</button> {/* Submit button */}
                            </form>
                            <div className="text-center mt-3"> {/* Text for account creation link */}
                                <p>Don't have an account? <a href="/createAccount">Create one here</a></p> {/* Link to create account */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer /> {/* Render Footer component */}
        </>
    );
};

export default LoginPage; // Export LoginPage component for use in other parts of the application
