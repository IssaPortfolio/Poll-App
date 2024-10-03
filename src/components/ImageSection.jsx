import React from 'react'; // Import React library for creating components

const ImageSection = ({ imageSrc, altText }) => (
    <div className="col-lg-6 col-xs-10 col-md-8"> {/* Responsive column for the image section */}
        <img src={imageSrc} alt={altText} className="img-fluid" /> {/* Image with fluid class for responsiveness */}
    </div>
);

export default ImageSection; // Export the ImageSection component for use in other parts of the application
