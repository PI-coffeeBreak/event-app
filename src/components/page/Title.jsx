export default function Title({
    text = "Default Title",
    color = "",
    italic = false,
    bold = true, // Default to bold since it's a title
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

    return <h1 className={`text-2xl ${dynamicClasses}`}>{text}</h1>;
}