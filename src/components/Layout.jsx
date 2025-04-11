import Dock from "./Dock.jsx";
import { Outlet, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { MenuContext } from "../contexts/MenuContext";
import { useNotifications } from "../contexts/NotificationsContext";
import { motion } from "framer-motion";
import { Menu, Bell, X, Check } from "lucide-react";
import Sidebar, { SIDEBAR_WIDTH, DRAG_THRESHOLD, TOUCH_THRESHOLD, DRAG_START_THRESHOLD } from "./Sidebar";
import PropTypes from "prop-types";

// Custom hook for handling clicks outside a referenced element
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

// Notifications component
const NotificationsDropdown = ({ notifications = [], onClose, onMarkAsRead, onMarkAllAsRead }) => {
  return (
    <div className="absolute top-12 right-0 w-80 mt-2 bg-base-100 border border-primary shadow-xl rounded-lg z-50 overflow-hidden">
      <div className="p-4 border-b border-base-300 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-xs btn-circle"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border-b border-base-200 hover:bg-base-200 cursor-pointer ${!notification.delivered ? 'bg-base-200' : ''}`}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm mt-1">{notification.payload}</p>
                {!notification.delivered && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      onMarkAsRead(notification.id);
                    }}
                    className="btn btn-ghost btn-xs btn-circle"
                  >
                    <Check size={16} className="text-primary" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-3 border-t border-base-300 text-center">
        <button 
          className="text-primary text-sm hover:underline"
          onClick={onMarkAllAsRead}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};

NotificationsDropdown.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      payload: PropTypes.string.isRequired,
      delivered: PropTypes.bool.isRequired
    })
  ),
  onClose: PropTypes.func.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onMarkAllAsRead: PropTypes.func.isRequired
};

// Set default props for NotificationsDropdown
NotificationsDropdown.defaultProps = {
  notifications: []
};

const MobileLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dragPosition, setDragPosition] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    
    // Use the notifications context
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

    console.log('Layout - Rendering MobileLayout');

    // Use the custom hook instead of duplicating the useEffect logic
    const handleCloseNotifications = useCallback(() => {
      setShowNotifications(false);
    }, []);
    useClickOutside(notificationRef, handleCloseNotifications);

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
                <div className="navbar-end relative" ref={notificationRef}>
                    <button 
                        className="btn btn-ghost btn-square"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <div className="indicator">
                            <Bell className="h-6 w-6 text-primary" />
                            {unreadCount > 0 && (
                                <span className="badge badge-xs badge-primary indicator-item">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                    </button>
                    
                    {showNotifications && (
                        <NotificationsDropdown 
                            notifications={notifications} 
                            onClose={() => setShowNotifications(false)}
                            onMarkAsRead={markAsRead}
                            onMarkAllAsRead={markAllAsRead}
                        />
                    )}
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
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    
    // Use the notifications context
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    
    console.log('Layout - Rendering DesktopLayout');
    
    // Use the custom hook instead of duplicating the useEffect logic
    const handleCloseNotifications = useCallback(() => {
      setShowNotifications(false);
    }, []);
    useClickOutside(notificationRef, handleCloseNotifications);

    return (
        <div className="w-full min-h-svh">
            {/* Fixed Navbar */}
            <div className="navbar bg-primary shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <button className="btn btn-ghost btn-circle">
                            <Menu className="h-5 w-5 text-base-100" />
                        </button>
                        <div className="dropdown-content menu menu-sm bg-secondary text-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg">
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
                        </div>
                    </div>
                </div>
                <div className="navbar-center">
                    <a href="/" className="btn btn-ghost text-xl text-base-100">
                        coffeeBreak.
                    </a>
                </div>
                <div className="navbar-end relative" ref={notificationRef}>
                    <button 
                        className="btn btn-ghost btn-circle"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <div className="indicator">
                            <Bell className="h-5 w-5 text-base-100" />
                            {unreadCount > 0 && (
                                <span className="badge badge-xs badge-secondary indicator-item">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                    </button>
                    
                    {showNotifications && (
                        <NotificationsDropdown 
                            notifications={notifications} 
                            onClose={() => setShowNotifications(false)}
                            onMarkAsRead={markAsRead}
                            onMarkAllAsRead={markAllAsRead}
                        />
                    )}
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

// Add PropTypes validation for Sidebar
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  dragPosition: PropTypes.number
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