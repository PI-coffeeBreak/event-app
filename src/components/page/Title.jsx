import PropTypes from "prop-types";

export default function Title({
    text = "Default Title",
    color = "",
    italic = false,
    bold = true, // Default to bold since it's a title
    underline = false,
    className = "",
}) {
    const dynamicClasses = [
        color,
        italic ? "italic" : "",
        bold ? "font-bold" : "",
        underline ? "underline" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return <h1 className={`text-2xl ${dynamicClasses}`}>{text}</h1>;
}

Title.propTypes = {
    text: PropTypes.string.isRequired, // Title text is required
    color: PropTypes.string, // TailwindCSS color class
    italic: PropTypes.bool, // Whether the text is italic
    bold: PropTypes.bool, // Whether the text is bold
    underline: PropTypes.bool, // Whether the text is underlined
    className: PropTypes.string, // Additional custom classes
};