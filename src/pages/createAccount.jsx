import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormInput from '../components/FormInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/global.css';
import '../../public/styles/pages/login-create-account-page.css';
import '../../public/styles/components/navbar.css';
import '../../public/styles/components/footer.css';

const CreateAccountPage = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate to other routes
    const [username, setUsername] = useState(''); // State to manage the username input
    const [email, setEmail] = useState(''); // State to manage the email input
    const [password, setPassword] = useState(''); // State to manage the password input
    const [confirmPassword, setConfirmPassword] = useState(''); // State to manage password confirmation input

    const handleCreateAccount = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (password !== confirmPassword) { // Check if passwords match
            alert('Passwords do not match'); // Alert user if passwords don't match
            return; // Exit the function if passwords don't match
        }
    
        try {
            const response = await fetch(`${process.env.BACKEND_API_URL}/createAccount`, { // API call to create account
                method: 'POST', // Use POST method for account creation
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                credentials: 'include', // Include credentials (cookies) with the request
                body: JSON.stringify({
                    email,
                    user_id: username,
                    password,
                    confirm_password: confirmPassword,
                }), // JSON stringify the request body
            });
    
            const result = await response.json(); // Parse the JSON response
    
            if (response.ok) { // Check if the response is successful
                if (result.success) { // Check if account creation was successful
                    navigate('/dashboard'); // Navigate to the dashboard if successful
                } else {
                    alert(result.error || 'An error occurred. Please try again later.'); // Show error message if any
                }
            } else {
                console.error('Error response:', result); // Log any error response
                alert(result.error || 'An error occurred. Please try again later.'); // Show error message
            }
        } catch (error) {
            console.error('Error:', error); // Log error
            alert('An error occurred. Please try again later.'); // Alert user of any errors
        }
    };

    return (
        <>
            <Navbar title="Create Account" buttonLabel="Login" buttonPath="/login" /> {/* Render the navigation bar */}
            <main className="create-account-section"> {/* Main section for creating an account */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-12">
                            <img src="https://poll-app.s3.us-east-2.amazonaws.com/login-image.png" alt="Create Account Image" className="img-fluid" /> {/* Image for the page */}
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12">
                            <h2 className="text-center mb-4">Create Account</h2> {/* Title for the account creation form */}
                            <form id="createAccountForm" onSubmit={handleCreateAccount}> {/* Form for creating an account */}
                                <FormInput
                                    label="Username"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} // Update username state on change
                                />
                                <FormInput
                                    label="Email"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Update email state on change
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Update password state on change
                                />
                                <FormInput
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on change
                                />
                                <button type="submit" className="btn btn-primary">Create Account</button> {/* Submit button for the form */}
                            </form>
                            <div className="text-center mt-3">
                                <p>Already have an account? <a href="/login">Login here</a></p> {/* Link to login page */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer /> {/* Render the footer */}
        </>
    );
};

export default CreateAccountPage; // Export the CreateAccountPage component
