import React from 'react'; // Import React library for creating components

const FormInput = ({ type, label, value, onChange }) => (
    <div className="form-group"> {/* Container for form input group */}
        <label>{label}</label> {/* Label for the input field */}
        <input
            type={type} // Input type (e.g., text, email, password)
            className="form-control" // Bootstrap class for styling the input
            value={value} // Value controlled by state
            onChange={onChange} // Event handler for change events
            required // Indicate that the input is required
        />
    </div>
);

export default FormInput; // Export the FormInput component for use in other parts of the application
