import { useContext, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../contexts/MenuContext";
import PropTypes from 'prop-types';

// Sidebar settings
export const SIDEBAR_WIDTH = 280;
export const DRAG_THRESHOLD = 0.25;
export const TOUCH_THRESHOLD = 120;
export const DRAG_START_THRESHOLD = 30;

// Animation settings
export const SPRING_CONFIG = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1
};

const Sidebar = ({ isOpen, setIsOpen, dragPosition }) => {
    const { items, getIconComponent } = useContext(MenuContext);

    // Sidebar X position
    const x = useMotionValue(isOpen ? 0 : -SIDEBAR_WIDTH);

    // Transform x to backdrop opacity
    const backdropOpacity = useTransform(
        x,
        [-SIDEBAR_WIDTH, -SIDEBAR_WIDTH + DRAG_START_THRESHOLD, 0],
        [0, 0, 0.6]
    );

    // Update position when state changes
    useEffect(() => {
        if (dragPosition !== null) {
            // If dragging, use drag position
            const dragX = Math.min(0, Math.max(-SIDEBAR_WIDTH, dragPosition));
            x.set(dragX); // No animation during drag
        } else {
            // If not dragging, animate to final position
            animate(x, isOpen ? 0 : -SIDEBAR_WIDTH, SPRING_CONFIG);
        }
    }, [isOpen, dragPosition, x]);

    const handleDrag = (_, info) => {
        const newX = Math.min(0, Math.max(-SIDEBAR_WIDTH, info.offset.x));
        x.set(newX);
    };

    const handleDragEnd = (_, info) => {
        const currentX = x.get();
        const threshold = -SIDEBAR_WIDTH * (1 - DRAG_THRESHOLD);

        if (currentX > threshold) {
            animate(x, 0, SPRING_CONFIG);
            setIsOpen(true);
        } else {
            animate(x, -SIDEBAR_WIDTH, SPRING_CONFIG);
            setIsOpen(false);
        }
    };

    return (
        <div className="pointer-events-none">
            <AnimatePresence mode="wait">
                {(isOpen || dragPosition !== null) && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 bg-black z-50 backdrop pointer-events-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: backdropOpacity.get() }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar with drag */}
            <motion.div
                className="fixed left-0 top-0 bottom-0 w-[280px] bg-base-100 shadow-xl z-60 pointer-events-auto"
                style={{ x }}
                drag="x"
                dragElastic={0.1}
                dragMomentum={false}
                dragConstraints={{ left: -SIDEBAR_WIDTH, right: 0 }}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
            >
                {/* Logo */}
                <div className="flex items-end px-4 py-2 h-16 border-b-2 border-primary">
                    <a href="/" className="text-xl font-bold text-primary">
                        coffeeBreak.
                    </a>
                </div>

                <ul className="menu text-primary w-full p-0">
                    {Array.isArray(items) && items.map((item) => {
                        const Icon = getIconComponent(item.icon);
                        return (
                            <NavLink
                                key={item.id}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 p-3 w-full transition-colors ${isActive ? 'bg-primary text-base-100' : 'hover:bg-black/5 active:bg-black/10'}`
                                }
                            >
                                {Icon && <Icon className="w-5 h-5" />}
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </ul>
            </motion.div>
        </div>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    dragPosition: PropTypes.number
};

export default Sidebar; 