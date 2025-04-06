import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as Fa from "react-icons/fa";
import * as Fi from "react-icons/fi";
import * as Ai from "react-icons/ai";
import * as Bi from "react-icons/bi";
import * as Bs from "react-icons/bs";
import * as Ci from "react-icons/ci";
import * as Di from "react-icons/di";
import * as Gi from "react-icons/gi";
import * as Go from "react-icons/go";
import * as Hi from "react-icons/hi";
import * as Im from "react-icons/im";
import * as Io from "react-icons/io";
import * as Io5 from "react-icons/io5";
import * as Md from "react-icons/md";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import * as Ti from "react-icons/ti";
import * as Wi from "react-icons/wi";

export const MenuContext = createContext({});

export function MenuProvider({ children, endpoint }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMenuItems();
    }, [endpoint]);

    const fetchMenuItems = async () => {
        console.log('MenuContext - Fetching menu items from:', endpoint);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
            console.log('MenuContext - Raw menu data:', data);
            // Adiciona o prefixo /app a todos os links
            const itemsWithPrefix = data.options.map(item => ({
                ...item,
                href: `/app/${item.href.replace(/^\//, '')}`
            }));
            console.log('MenuContext - Processed menu items:', itemsWithPrefix);
            setItems(itemsWithPrefix);
        } catch (err) {
            console.error('MenuContext - Error fetching menu:', err);
            setError(err.message);
            setItems([
                { id: "1", icon: "FaHome", label: "Home", href: "/app/home" },
                { id: "2", icon: "FiUser", label: "Profile", href: "/app/profile" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const getIconComponent = (iconName) => {
        console.log('MenuContext - Getting icon component for:', iconName);
        const prefix = iconName.substring(0, 2).toLowerCase();

        const iconLibraries = {
            'fa': Fa,
            'fi': Fi,
            'ai': Ai,
            'bi': Bi,
            'bs': Bs,
            'ci': Ci,
            'di': Di,
            'gi': Gi,
            'go': Go,
            'hi': Hi,
            'im': Im,
            'io': Io,
            'io5': Io5,
            'md': Md,
            'ri': Ri,
            'si': Si,
            'ti': Ti,
            'wi': Wi
        };

        const library = iconLibraries[prefix];
        if (library && library[iconName]) {
            return library[iconName];
        }

        console.warn(`MenuContext - Icon ${iconName} not found, using fallback`);
        return Fa.FaCircle;
    };

    const value = {
        items,
        loading,
        error,
        getIconComponent,
        refreshItems: fetchMenuItems
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}