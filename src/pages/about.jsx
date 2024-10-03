import React from 'react'; // Importing React library
import Navbar from '../components/Navbar'; // Importing Navbar component
import Footer from '../components/Footer'; // Importing Footer component
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import '../../public/styles/global.css'; // Importing global styles
import '../../public/styles/pages/about.css'; // Importing styles specific to the About page

// About component that displays information about the application
const About = () => {
    return (
        <>
            <Navbar title="About" buttonLabel="Login" buttonPath="/login" /> {/* Render navigation bar */}
            <main className="about-section"> {/* Main content section for About page */}
                <h1>About PollApp</h1> {/* Page title */}
                <div className="about-content"> {/* Container for about content */}
                    <p>PollApp is a project created by a passionate computer science student, Issa. It is a unique social media platform centered around polls. Whether you want to create polls, vote on them, or view the results, PollApp has got you covered.</p>
                    <p>With PollApp, you can engage with friends, colleagues, or the wider community. Use it for fun, work, or simply to stay informed about various topics. Join us in making decisions more interactive and enjoyable!</p>
                </div>
            </main>
            <Footer /> {/* Render footer */}
        </>
    );
};

export default About; // Export About component for use in other parts of the application
