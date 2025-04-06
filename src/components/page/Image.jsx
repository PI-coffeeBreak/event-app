export default function Image({ src, alt = "Image", className = "" }) {
    return <img src={src} alt={alt} className={`rounded ${className}`} />;
}