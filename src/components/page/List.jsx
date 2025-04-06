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