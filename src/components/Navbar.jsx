import React from 'react'; // Import React library for creating components
import { useNavigate, useLocation } from 'react-router-dom'; // Import hooks for navigation and location
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import '../../public/styles/components/navbar.css'; // Import CSS styles for the navbar
import UserGreeting from '../components/UserGreeting'; // Import UserGreeting component
import SignOutButton from './SignOutButton'; // Import SignOutButton component

const Navbar = ({ title, buttonLabel, buttonPath }) => {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const location = useLocation(); // Get the current location

    const handleButtonClick = () => {
        navigate(buttonPath); // Navigate to the specified button path
    };

    // Determine whether to display UserGreeting based on the current route
    const showGreeting = location.pathname === '/dashboard'; // Show greeting only on dashboard route

    return (
        <nav className="navbar custom-navbar fixed-top"> {/* Navbar container */}
            <div className="container-fluid"> {/* Fluid container for responsive navbar */}
                <a className="navbar-brand text-white me-3" href="/"> {/* Brand link with logo */}
                    <img 
                        src="https://poll-app.s3.us-east-2.amazonaws.com/Logo.png" // Direct link to the logo image
                        width="30" 
                        height="30" 
                        alt="Logo" // Alt text for accessibility
                    /> 
                    {title} {/* Navbar title */}
                </a>
                <div className="d-flex align-items-center"> {/* Flex container for alignment */}
                    {showGreeting && <UserGreeting />} {/* Conditionally render UserGreeting */}
                    <form className="d-flex ms-auto"> {/* Flex form for button */}
                        {buttonLabel === 'Sign Out' ? (
                            <SignOutButton /> // Use SignOutButton for sign out action
                        ) : (
                            <button onClick={handleButtonClick} className="btn btn-primary" type="button">
                                {buttonLabel} {/* Button label based on props */}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; // Export the Navbar component for use in other parts of the application
