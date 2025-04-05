import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ActivityContext = createContext();

// Create the provider component
export const ActivityProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch activities from the API
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/activities/`);
                console.log(response.data);
                setActivities(response.data); // Assuming the API returns an array of activities
            } catch (err) {
                setError(err.message || "Failed to fetch activities");
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return (
        <ActivityContext.Provider value={{ activities, loading, error }}>
            {children}
        </ActivityContext.Provider>
    );
};
