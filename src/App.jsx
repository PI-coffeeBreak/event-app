import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Alerts from "./pages/Alerts.jsx";
import Profile from "./pages/Profile.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {

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

