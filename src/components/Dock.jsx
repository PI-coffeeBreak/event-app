import DockButton from "./DockButton.jsx";
import { useMenu } from "../contexts/MenuContext";
import { useLocation } from "react-router-dom";

// Maximum number of items to show in the dock
const MAX_DOCK_ITEMS = 5;

export default function Dock() {
    const { items, loading, getIconComponent } = useMenu();
    const location = useLocation();

    if (loading) {
        return (
            <div className="dock w-15/16 mx-auto mb-3 bg-primary rounded-xl animate-pulse">
                {/* Placeholder loading state */}
            </div>
        );
    }

    // Get current page from location
    const currentPath = location.pathname;
    const currentPageIndex = items.findIndex(item => item.href === currentPath);

    // Determine which items to show
    let itemsToShow = [];
    if (items.length <= MAX_DOCK_ITEMS) {
        // If we have MAX_DOCK_ITEMS or fewer items, show all of them
        itemsToShow = items;
    } else {
        if (currentPageIndex === -1 || currentPageIndex < MAX_DOCK_ITEMS - 1) {
            // If current page is not found or is in first MAX_DOCK_ITEMS - 1 items,
            // show first MAX_DOCK_ITEMS items
            itemsToShow = items.slice(0, MAX_DOCK_ITEMS);
        } else {
            // Show first MAX_DOCK_ITEMS - 1 items plus current item
            itemsToShow = [
                ...items.slice(0, MAX_DOCK_ITEMS - 1),
                items[currentPageIndex]
            ];
        }
    }

    return (
        <div className="dock w-15/16 mx-auto mb-3 bg-primary rounded-xl">
            {itemsToShow.map((item) => (
                <DockButton
                    key={item.id}
                    pageName={item.label}
                    icon={getIconComponent(item.icon)}
                    pageUrl={item.href}
                />
            ))}
        </div>
    );
}