import React from 'react'; // Import React library for creating components
import FormInput from './FormInput'; // Import the FormInput component for input fields

const AccountForm = ({
    onSubmit,
    email,
    setEmail,
    userId,
    setUserId,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    submitLabel,
    linkText,
    linkPath,
}) => (
    <div className="col-lg-4 col-xs-10 col-md-8"> {/* Container for the form with responsive classes */}
        <form id="accountForm" onSubmit={onSubmit}> {/* Form element with submit handler */}
            <FormInput
                label="Email" // Label for the email input
                type="email" // Input type for email
                id="email" // HTML id for the input
                value={email} // Value controlled by email state
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
            />
            <FormInput
                label="User ID" // Label for the user ID input
                type="text" // Input type for user ID
                id="user_id" // HTML id for the input
                value={userId} // Value controlled by userId state
                onChange={(e) => setUserId(e.target.value)} // Update userId state on change
            />
            <FormInput
                label="Create Password" // Label for the password input
                type="password" // Input type for password
                id="password" // HTML id for the input
                value={password} // Value controlled by password state
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
            <FormInput
                label="Confirm Password" // Label for confirming password input
                type="password" // Input type for password confirmation
                id="confirm-password" // HTML id for the input
                value={confirmPassword} // Value controlled by confirmPassword state
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on change
            />
            <button type="submit" className="btn btn-primary">{submitLabel}</button> {/* Submit button with dynamic label */}
        </form>
        <div className="text-center mt-3"> {/* Centered link for navigation */}
            <p>{linkText} <a href={linkPath}>Login here</a></p> {/* Conditional link for navigation */}
        </div>
    </div>
);

export default AccountForm; // Export the AccountForm component for use in other parts of the application
