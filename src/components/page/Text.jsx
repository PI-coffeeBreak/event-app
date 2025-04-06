import PropTypes from "prop-types";

export default function Text({
    text = "Default text",
    color = "",
    italic = false,
    bold = false,
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

    return <p className={`text-base ${dynamicClasses}`}>{text}</p>;
}

Text.propTypes = {
    text: PropTypes.string.isRequired, // Text content is required
    color: PropTypes.string, // TailwindCSS color class
    italic: PropTypes.bool, // Whether the text is italic
    bold: PropTypes.bool, // Whether the text is bold
    underline: PropTypes.bool, // Whether the text is underlined
    className: PropTypes.string, // Additional custom classes
};