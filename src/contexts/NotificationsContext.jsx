import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the context
const NotificationsContext = createContext();

// Create the provider component
export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/notifications/in-app`);
      setNotifications(response.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err.message);
      // Fallback to empty array
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
        // TODO: Call the API to mark as read
      
      // Update local state
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, delivered: true } : notif
      ));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      // Update local state anyway for better UX
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, delivered: true } : notif
      ));
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Call the API to mark all as read
      
      // Update local state
      setNotifications(notifications.map(notif => ({ ...notif, delivered: true })));
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      // Update local state anyway for better UX
      setNotifications(notifications.map(notif => ({ ...notif, delivered: true })));
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.delivered).length;

  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Use useMemo to memoize the context value
  const value = useMemo(() => ({
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refreshNotifications: fetchNotifications
  }), [notifications, loading, error, unreadCount]);
  // We don't include function references in the dependency array because they're stable

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

// PropTypes for the provider
NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use the context
export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}