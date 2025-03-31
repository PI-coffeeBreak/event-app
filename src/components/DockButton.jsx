import {NavLink} from "react-router-dom";

export default function DockButton({icon: Icon, pageName, pageUrl}){

    return (

        <button className="dock-button">
            <NavLink to={pageUrl}>
                <Icon className="text-md mx-auto text-white" />
                <span className="dock-label text-white">{pageName}</span>
            </NavLink>
        </button>
    )
}