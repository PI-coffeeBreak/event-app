export default function Text({ content = "Default text", className = "" }) {
    return <p className={`text-base ${className}`}>{content}</p>;
}