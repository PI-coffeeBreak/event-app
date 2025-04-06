import PropTypes from "prop-types";
import { FaCoffee } from "react-icons/fa";

export default function Icon({ icon: IconComponent = FaCoffee, className = "" }) {
    return <IconComponent className={`inline-block ${className}`} />;
}

Icon.propTypes = {
    icon: PropTypes.elementType, // React component for the icon
    className: PropTypes.string, // Additional custom classes
};

Icon.defaultProps = {
    icon: FaCoffee,
    className: "",
};