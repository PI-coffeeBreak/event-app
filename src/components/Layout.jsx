import Dock from "./Dock.jsx";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const SideBar = () => {
    return (
        <div className="drawer-side z-10">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li><a href="#">Sidebar Item 1</a></li>
                <li><a href="#">Sidebar Item 2</a></li>
            </ul>
        </div>
    );
};

const MobileLayout = () => {
    const handleSwipeRight = () => {
        // Open the drawer by checking the input
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
                    {/* Sidebar toggle button */}
                    <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost w-12">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>

                    {/* coffeeBreak text */}
                    <div className="flex-grow text-center text-2xl text-primary font-bold">
                        coffeeBreak.
                    </div>

                    {/* Notification button */}
                    <div className="btn btn-square btn-ghost w-12">
                        <FaBell className="inline-block h-6 w-6 stroke-current" />
                    </div>
                </div>

                {/* Main content */}
                <Outlet />
                <Dock />
            </div>

            <SideBar />
        </div>
    );
};

const DesktopLayout = () => {
    return (
        <div className="w-full min-h-svh p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="">
                    b
                </div>
                <div className="btn btn-ghost flex text-2xl text-primary justify-center mb-8">
                    coffeeBreak. pc
                </div>
                <div className="">
                    a
                </div>
            </div>
            <Outlet />
            <Dock />
        </div>
    );
};

export default function Layout() {
    const [isMobile, setIsMobile] = useState(false);
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    useEffect(() => {
        setIsMobile(!isDesktop);
    }, [isDesktop]);

    return (
        <>
            {isMobile ? <MobileLayout /> : <DesktopLayout />}
        </>
    );
}