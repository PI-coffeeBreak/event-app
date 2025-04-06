import Dock from "./Dock.jsx";
import { Outlet, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";
import { motion } from "framer-motion";
import { Menu, Bell } from "lucide-react";
import Sidebar, { SIDEBAR_WIDTH, DRAG_THRESHOLD, TOUCH_THRESHOLD, DRAG_START_THRESHOLD } from "./Sidebar";

const MobileLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dragPosition, setDragPosition] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [dragging, setDragging] = useState(false);

    console.log('Layout - Rendering MobileLayout');

    // Handle touch start
    const handleTouchStart = (e) => {
        // Add debug log
        console.log("Touch target:", e.target.className);

        const touchX = e.touches[0].clientX;

        // If sidebar is open, only allow dragging from backdrop
        if (isOpen) {
            const isBackdropClick = e.target.classList.contains('backdrop');
            if (!isBackdropClick) {
                console.log("Touch ignored - not on backdrop");
                return;
            }
            console.log("Touch started on backdrop");
            setTouchStart(touchX);
            setDragging(true);
            return;
        }

        // If sidebar is closed, only allow opening from left edge
        if (!isOpen && touchX < TOUCH_THRESHOLD) {
            console.log("Touch started on left edge:", touchX);
            setTouchStart(touchX);
            setDragging(true);
        }
    };

    // Handle touch movement
    const handleTouchMove = (e) => {
        if (dragging && touchStart !== null) {
            const currentX = e.touches[0].clientX;
            const distance = currentX - touchStart;

            if (!isOpen) {
                // Opening: only allow dragging from left to right (positive values)
                if (distance > 0) {
                    console.log("Dragging to open:", distance);
                    // Don't show sidebar in first pixels of movement
                    if (distance < DRAG_START_THRESHOLD) {
                        setDragPosition(-SIDEBAR_WIDTH);
                        return;
                    }
                    // Adjust progress to start after threshold
                    const adjustedDistance = distance - DRAG_START_THRESHOLD;
                    const progress = Math.min(adjustedDistance / (SIDEBAR_WIDTH - DRAG_START_THRESHOLD), 1);
                    const newPosition = -SIDEBAR_WIDTH + (SIDEBAR_WIDTH * progress);
                    setDragPosition(newPosition);
                }
            } else {
                // Closing: allow dragging from right to left
                const newPosition = Math.max(-SIDEBAR_WIDTH, Math.min(0, distance));
                setDragPosition(newPosition);
                console.log("Dragging to close:", distance, "New position:", newPosition);
            }
        }
    };

    // Handle touch end
    const handleTouchEnd = () => {
        if (dragging) {
            // Decide if sidebar should stay open or closed
            const threshold = -SIDEBAR_WIDTH * (1 - DRAG_THRESHOLD);

            if (dragPosition !== null && dragPosition > threshold) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }

            // Reset drag state with small delay to allow animation
            setTimeout(() => {
                setDragPosition(null);
                setDragging(false);
                setTouchStart(null);
                console.log("Drag finished");
            }, 50);
        }
    };

    useEffect(() => {
        // Add touch listeners for entire screen
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            // Remove listeners when component unmounts
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [dragging, touchStart, dragPosition, isOpen]);

    // Animation variants for menu button
    const menuButtonVariants = {
        open: { rotate: 180, scale: 1.1, transition: { duration: 0.3 } },
        closed: { rotate: 0, scale: 1, transition: { duration: 0.3 } }
    };

    return (
        <div className="min-h-svh overflow-x-hidden touch-pan-y">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} dragPosition={dragPosition} />

            {/* Fixed Navbar */}
            <div className="navbar bg-base-100 shadow-sm fixed top-0 min-h-6 lg:min-h-12 left-0 w-full z-40">
                <div className="navbar-start">
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-ghost btn-square"
                        animate={isOpen ? "open" : "closed"}
                        variants={menuButtonVariants}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Menu className="h-6 w-6 text-primary" />
                    </motion.button>
                </div>
                <div className="navbar-center">
                    <a href="/" className="btn btn-ghost text-xl text-primary">
                        coffeeBreak.
                    </a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-square">
                        <div className="indicator">
                            <Bell className="h-6 w-6 text-primary" />
                            <span className="badge badge-xs badge-secondary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-16 px-4">
                {console.log('Layout - Before Outlet in MobileLayout')}
                <Outlet />
                <Dock />
            </div>
        </div>
    );
};

const DesktopLayout = () => {
    const { items, getIconComponent } = useContext(MenuContext);
    console.log('Layout - Rendering DesktopLayout');

    return (
        <div className="w-full min-h-svh">
            {/* Fixed Navbar */}
            <div className="navbar bg-primary shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <Menu className="h-5 w-5 text-base-100" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-secondary text-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg">
                            {Array.isArray(items) && items.map((item) => {
                                const Icon = getIconComponent(item.icon);
                                return (
                                    <NavLink
                                        key={item.id}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-3 rounded-lg ${isActive ? 'bg-primary text-base-100' : 'hover:bg-base-200'}`
                                        }
                                    >
                                        {Icon && <Icon className="w-5 h-5" />}
                                        <span>{item.label}</span>
                                    </NavLink>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a href="/" className="btn btn-ghost text-xl text-base-100">
                        coffeeBreak.
                    </a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <Bell className="h-5 w-5 text-base-100" />
                            <span className="badge badge-xs badge-secondary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-16">
                {console.log('Layout - Before Outlet in DesktopLayout')}
                <Outlet />
            </div>
        </div>
    );
};

export default function Layout() {
    const [isMobile, setIsMobile] = useState(false);
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

    useEffect(() => {
        setIsMobile(!isDesktop);
    }, [isDesktop]);

    console.log('Layout - Rendering main Layout component, isMobile:', isMobile);
    return <>{isMobile ? <MobileLayout /> : <DesktopLayout />}</>;
}