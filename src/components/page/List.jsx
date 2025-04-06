import PropTypes from "prop-types";

export default function List({ items = [], ordered = false, className = "" }) {
    const Tag = ordered ? "ol" : "ul";
    return (
        <Tag className={`list-disc pl-5 ${className}`}>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </Tag>
    );
}

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of strings for list items
    ordered: PropTypes.bool, // Whether the list is ordered (ol) or unordered (ul)
    className: PropTypes.string, // Additional custom classes
};

List.defaultProps = {
    items: [],
    ordered: false,
    className: "",
};