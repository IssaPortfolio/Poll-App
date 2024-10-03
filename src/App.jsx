import React from 'react'; // Import React to use JSX syntax
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components from React Router
import HomePage from './pages/homepage'; // Import the HomePage component
import CreateAccountPage from './pages/createAccount'; // Import the CreateAccountPage component
import LoginPage from './pages/loginPage'; // Import the LoginPage component
import AboutPage from './pages/about'; // Import the AboutPage component
import ContactPage from './pages/contact'; // Import the ContactPage component
import DashboardPage from './pages/dashboard'; // Import the DashboardPage component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component for route protection

const App = () => {
    return (
        <Router> {/* Wrap the application in Router to enable routing */}
            <Routes> {/* Define application routes */}
                <Route path="/" element={<HomePage />} /> {/* Route for the home page */}
                <Route path="/createAccount" element={<CreateAccountPage />} /> {/* Route for creating a new account */}
                <Route path="/login" element={<LoginPage />} /> {/* Route for user login */}
                <Route path="/about" element={<AboutPage />} /> {/* Route for the about page */}
                <Route path="/contact" element={<ContactPage />} /> {/* Route for the contact page */}
                <Route path="/dashboard" element={ // Protected route for the dashboard
                    <ProtectedRoute>
                        <DashboardPage /> {/* Render DashboardPage only if the user is authenticated */}
                    </ProtectedRoute>
                } />
                {/* Additional routes can be defined as necessary */}
            </Routes>
        </Router>
    );
};

export default App; // Export the App component for use in other modules
