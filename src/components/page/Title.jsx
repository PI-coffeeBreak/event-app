export default function Title({ text, className = "" }) {
    return <h1 className={`text-2xl font-bold ${className}`}>{text}</h1>;
}