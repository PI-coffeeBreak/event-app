import { FaCoffee } from "react-icons/fa";

export default function Icon({ icon: IconComponent = FaCoffee, className = "" }) {
    return <IconComponent className={`inline-block ${className}`} />;
}