import React from 'react'; // Importing React library
import Navbar from '../components/Navbar'; // Importing Navbar component
import Footer from '../components/Footer'; // Importing Footer component
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import '../../public/styles/global.css'; // Importing global styles
import '../../public/styles/pages/contact.css'; // Importing styles specific to the Contact page

// Contact component for displaying the contact form
const Contact = () => {
    return (
        <>
            <Navbar title="Contact" buttonLabel="Login" buttonPath="/login" /> {/* Render navigation bar */}
            <main className="contact-section"> {/* Main content section for Contact page */}
                <h1>Contact</h1> {/* Page title */}
                <div className="contact-content"> {/* Container for contact content */}
                    <p>If you have any questions or feedback, feel free to reach me using the form below.</p>
                </div>
                <form className="contact-form"> {/* Contact form for user input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Your Name" /> {/* Input for user name */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Your Email" /> {/* Input for user email */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows="5" placeholder="Your Message"></textarea> {/* Text area for user message */}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button> {/* Submit button for the form */}
                </form>
            </main>
            <Footer /> {/* Render footer */}
        </>
    );
};

export default Contact; // Export Contact component for use in other parts of the application
