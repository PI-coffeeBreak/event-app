import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const MenuContext = createContext();

// Create the provider component
export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch menu data from the API
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ui/menu`);
                console.log(response.data);
                setMenuItems(response.data.options);
            } catch (err) {
                setError(err.message || "Failed to fetch menu");
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    return (
        <MenuContext.Provider value={{ menuItems, loading, error }}>
            {children}
        </MenuContext.Provider>
    );
};