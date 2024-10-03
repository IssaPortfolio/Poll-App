import React from 'react'; // Import React library for creating components
import '../../public/styles/components/footer.css'; // Import CSS styles for the footer

const Footer = () => {
    return (
        <div className="footer-basic"> {/* Container for the footer */}
            <footer>
                <div className="social"> {/* Container for social links */}
                    <a href="https://github.com/IssaPortfolio" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-github"></i> {/* Bootstrap GitHub icon */}
                    </a>
                </div>
                <ul className="list-inline"> {/* Navigation links */}
                    <li className="list-inline-item"><a href="/">Home</a></li>
                    <li className="list-inline-item"><a href="/about">About</a></li>
                    <li className="list-inline-item"><a href="/contact">Contact</a></li>
                </ul>
                <p className="copyright">Issa's Project</p> {/* Copyright text */}
            </footer>
        </div>
    );
};

export default Footer; // Export the Footer component for use in other parts of the application
