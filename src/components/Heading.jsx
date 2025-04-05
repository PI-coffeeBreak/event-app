export default function Heading({ level = 1, text = "Default Heading", className = "" }) {
    const Tag = `h${level}`; // Dynamically set the heading level (h1, h2, etc.)
    return <Tag className={`font-bold ${className}`}>{text}</Tag>;
}