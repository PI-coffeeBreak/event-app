import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Alerts from "./pages/Alerts.jsx";
import Profile from "./pages/Profile.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  useEffect(() => {
    // Fetch theme colors from the API using axios
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/ui/color-theme/color-theme`, {
      })
      .then((response) => {
        const theme = response.data;
        // Apply theme colors to the document
        Object.keys(theme).forEach((key) => {
            document.body.style.setProperty(`--color-${key}`, theme[key]);
        });
      })
      .catch((error) => {
        console.error("Error fetching theme colors:", error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

