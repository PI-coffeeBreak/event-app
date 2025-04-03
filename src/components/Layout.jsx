import Dock from "./Dock.jsx";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useContext } from "react";
import { FaBell } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { MenuContext } from "../contexts/MenuContext";

const SideBar = () => {
    const { menuItems, loading, error } = useContext(MenuContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="drawer-side z-10">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {Array.isArray(menuItems) && menuItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} className="flex items-center gap-2">
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MobileLayout = () => {
    const { menuItems } = useContext(MenuContext);

    const handleSwipeRight = () => {
        const drawerInput = document.getElementById("my-drawer");
        if (drawerInput) {
            drawerInput.checked = true;
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedRight: handleSwipeRight,
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
    });

    return (
        <div {...swipeHandlers} className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content w-full min-h-svh py-6 px-4">
                <div className="flex items-center justify-between mb-8">
                    <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost w-12">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current text-primary">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>

                    <div className="flex-grow text-center text-2xl text-primary font-bold">
                        coffeeBreak.
                    </div>

                    <div className="btn btn-square btn-ghost w-12">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-secondary indicator-item"></span>
                        </div>
                    </div>
                </div>

                <Outlet />
                <Dock />
            </div>

            <SideBar />
        </div>
    );
};

const DesktopLayout = () => {
    const { menuItems, loading, error } = useContext(MenuContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full min-h-svh">
            <div className="navbar bg-primary shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-base-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-secondary text-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg">
                            {Array.isArray(menuItems) && menuItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href} className="flex items-center gap-2">
                                        {item.icon && <span>{item.icon}</span>}
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl text-base-100">coffeeBreak.</a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-base-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-secondary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>

            <Outlet />
        </div>
    );
};

export default function Layout() {
    const [isMobile, setIsMobile] = useState(false);
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

    useEffect(() => {
        setIsMobile(!isDesktop);
    }, [isDesktop]);

    return <>{isMobile ? <MobileLayout /> : <DesktopLayout />}</>;
}