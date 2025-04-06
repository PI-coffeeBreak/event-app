import DockButton from "./DockButton.jsx";
import { useMenu } from "../contexts/MenuContext";

export default function Dock() {
    const { items, loading, getIconComponent } = useMenu();

    if (loading) {
        return (
            <div className="dock w-15/16 mx-auto mb-3 bg-primary rounded-xl animate-pulse">
                {/* Placeholder loading state */}
            </div>
        );
    }

    return (
        <div className="dock w-15/16 mx-auto mb-3 bg-primary rounded-xl">
            {items.map((item) => (
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