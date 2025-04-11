import PropTypes from 'prop-types';

export default function Image({ src, alt = "Image", className = "" }) {
    return <img src={src} alt={alt} className={`rounded ${className}`} />;
}

// Add PropTypes validation
Image.propTypes = {
    src: PropTypes.string.isRequired, // Source URL for the image is required
    alt: PropTypes.string, // Alternative text for the image
    className: PropTypes.string // Additional CSS classes
};

// Add default props
Image.defaultProps = {
    alt: "Image",
    className: ""
};