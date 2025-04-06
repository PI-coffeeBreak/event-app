import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const PageContext = createContext();

// Create the provider component
export const PageProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch pages from the API
    useEffect(() => {
        const fetchPages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pages/`);
                console.log("Pages",response.data);
                setPages(response.data); // Assuming the API returns an array of pages
            } catch (err) {
                setError(err.message || "Failed to fetch pages");
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, []);

    return (
        <PageContext.Provider value={{ pages, loading, error }}>
            {children}
        </PageContext.Provider>
    );
};