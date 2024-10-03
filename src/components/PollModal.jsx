import React, { useState } from 'react'; // Import React and useState hook
import '../../public/styles/components/pollModal.css'; // Import styles for poll modal

// PollModal component to create a new poll
const PollModal = ({ onSubmit, onClose }) => {
    const [question, setQuestion] = useState(''); // State for the poll question
    const [options, setOptions] = useState(['', '']); // Initialize with two empty options

    // Function to add a new option input field
    const handleAddOption = () => {
        setOptions([...options, '']); // Add an empty string to options
    };

    // Function to handle changes to option input fields
    const handleOptionChange = (index, value) => {
        const newOptions = [...options]; // Create a copy of the options array
        newOptions[index] = value; // Update the specific option
        setOptions(newOptions); // Set the new options array
    };

    // Function to handle form submission
    const handleSubmit = () => {
        const pollData = {
            question, // Poll question from state
            options: options.filter(opt => opt.trim() !== '') // Filter out empty options
        };
        onSubmit(pollData); // Call onSubmit with poll data
        onClose(); // Close the modal after submission
    };

    return (
        <div className="modal show"> {/* Modal container */}
            <div className="modal-content"> {/* Content of the modal */}
                <div className="modal-header">
                    <h2>Create Poll</h2> {/* Modal title */}
                </div>
                <div className="modal-body"> {/* Modal body */}
                    <label>
                        Question:
                        <input
                            type="text" // Input type for question
                            value={question} // Bind question state to input value
                            onChange={(e) => setQuestion(e.target.value)} // Update question on change
                            className="modal-input" // Input styling
                        />
                    </label>
                    {options.map((option, index) => ( // Map over option inputs
                        <div key={index}>
                            <label>
                                Option {index + 1}:
                                <input
                                    type="text" // Input type for poll options
                                    value={option} // Bind option state to input value
                                    onChange={(e) => handleOptionChange(index, e.target.value)} // Update option on change
                                    className="modal-input" // Input styling
                                />
                            </label>
                        </div>
                    ))}
                    <button onClick={handleAddOption} className="modal-button add-option-btn">Add Option</button> {/* Button to add an option */}
                </div>
                <div className="modal-footer"> {/* Modal footer */}
                    <button onClick={handleSubmit} className="modal-button submit-btn">Submit</button> {/* Submit button */}
                    <button onClick={onClose} className="modal-button close-btn">Close</button> {/* Close button */}
                </div>
            </div>
        </div>
    );
};

export default PollModal; // Export PollModal component for use in other parts of the application
