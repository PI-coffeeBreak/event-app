import PropTypes from "prop-types";

export default function Image({ src, alt = "Image", className = "" }) {
    return <img src={src} alt={alt} className={`rounded ${className}`} />;
}

Image.propTypes = {
    src: PropTypes.string.isRequired, // Source URL for the image
    alt: PropTypes.string, // Alt text for the image
    className: PropTypes.string, // Additional custom classes
};

Image.defaultProps = {
    alt: "Image",
    className: "",
};