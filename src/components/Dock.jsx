import DockButton from "./DockButton.jsx";
import {FaBell, FaHome, FaUser} from "react-icons/fa";

export default function Dock(){
    return (
        <div className="dock w-15/16 mx-auto mb-3 bg-primary rounded-xl">
            <DockButton pageName="Home" icon={FaHome} pageUrl="/app/home"></DockButton>
            <DockButton pageName="Alerts" icon={FaBell} pageUrl="/app/alerts"></DockButton>
            <DockButton pageName="Profile" icon={FaUser} pageUrl="/app/profile"></DockButton>
        </div>
    )
}