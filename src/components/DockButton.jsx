import { NavLink } from "react-router-dom";

export default function DockButton({ icon: Icon, pageName, pageUrl }) {
    return (
        <NavLink to={pageUrl} className="dock-button-link">
            <div className="dock-button">
                <Icon className="text-md mx-auto text-white" />
                <span className="dock-label text-white">{pageName}</span>
            </div>
        </NavLink>
    )
}