import React from 'react'; // Import React library for creating components

const FormWrapper = ({ children }) => (
    <div className="container"> {/* Main container for the form wrapper */}
        <div className="row justify-content-center"> {/* Center the content horizontally */}
            {children} {/* Render child components passed to FormWrapper */}
        </div>
    </div>
);

export default FormWrapper; // Export the FormWrapper component for use in other parts of the application
