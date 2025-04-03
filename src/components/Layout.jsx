import Dock from "./Dock.jsx";
import {Outlet} from "react-router-dom";


export default function Layout(){
    return(
        <div className="w-full min-h-svh p-8">
            <div className="btn btn-ghost flex text-2xl text-primary justify-center mb-8">
                coffeeBreak.
            </div>
            <Outlet />
            <Dock />
        </div>
    )
}