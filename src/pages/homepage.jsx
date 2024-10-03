import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Footer component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import '../../public/styles/global.css'; // Import global styles
import '../../public/styles/components/navbar.css'; // Import Navbar specific styles
import '../../public/styles/components/footer.css'; // Import Footer specific styles
import '../../public/styles/pages/homepage.css'; // Import HomePage specific styles

// Sections data for displaying content on the homepage
const sections = [
    {
        title: "Create Poll",
        text: "Easily create new polls to gather opinions and feedback from others.",
        img: 'https://poll-app.s3.us-east-2.amazonaws.com/HomePage/CreatePoll.png',
    },
    {
        title: "Participate in Polls",
        text: "Vote in polls created by others and see how your opinion compares.",
        img: 'https://poll-app.s3.us-east-2.amazonaws.com/HomePage/Poll.png',
    },
    {
        title: "View Poll Results",
        text: "Check out the results of the polls and analyze the trends.",
        img: 'https://poll-app.s3.us-east-2.amazonaws.com/HomePage/PollResults.png',
    },
    {
        title: "Delete Poll",
        text: "Remove polls you’ve created if they’re no longer needed.",
        img: 'https://poll-app.s3.us-east-2.amazonaws.com/HomePage/DeletePoll.png',
    },
];

const HomePage = () => {
    return (
        <>
            <Navbar title="Home" buttonLabel="Login" buttonPath="/login" /> {/* Render Navbar */}
            <div className="hero-section"> {/* Hero section for welcome message */}
                <h1>Welcome to PollApp</h1> {/* Main heading */}
                <p>PollApp is your platform to create, participate in, and view polls. Start exploring today!</p> {/* Subtext */}
                <a href="/login" className="btn-get-started">Get Started</a> {/* Button to start */}
            </div>
            {sections.map((section, index) => ( // Map through sections to create content blocks
                <div className="fullscreen-section" key={index}> {/* Fullscreen section for each feature */}
                    <div className="container"> {/* Bootstrap container for responsive layout */}
                        <div className="row align-items-center"> {/* Bootstrap row for alignment */}
                            <div className={`col-md-6 ${index % 2 === 0 ? 'order-md-1' : 'order-md-2'}`}> {/* Conditional ordering for responsive design */}
                                <div className="text-content"> {/* Text content container */}
                                    <h3>{section.title}</h3> {/* Section title */}
                                    <p>{section.text}</p> {/* Section text */}
                                </div>
                            </div>
                            <div className={`col-md-6 ${index % 2 === 0 ? 'order-md-2' : 'order-md-1'}`}> {/* Conditional ordering for responsive design */}
                                <div className="image-container"> {/* Image container */}
                                    <img src={section.img} alt={section.title} /> {/* Section image */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <Footer /> {/* Render Footer */}
        </>
    );
};

export default HomePage; // Export HomePage component
