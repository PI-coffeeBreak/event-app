import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the context
export const PageContext = createContext();

// Create the provider component
export const PageProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/pages/`);
                console.log("Pages", response.data);
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

PageProvider.propTypes = {
    children: PropTypes.node.isRequired, // React children
};