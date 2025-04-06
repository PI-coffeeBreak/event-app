export default function Text({
    text = "Default text",
    color = "",
    italic = false,
    bold = false,
    underline = false,
    className = "",
}) {
    // Dynamically build the className based on props
    const dynamicClasses = [
        color, // Apply the color class
        italic ? "italic" : "", // Apply italic if true
        bold ? "font-bold" : "", // Apply bold if true
        underline ? "underline" : "", // Apply underline if true
        className, // Include any additional classes passed as props
    ]
        .filter(Boolean) // Remove empty strings
        .join(" "); // Join classes with a space

    return <p className={`text-base ${dynamicClasses}`}>{text}</p>;
}