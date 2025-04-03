import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  const pages = [
    {
      "page_id": "string",
      "title": "string",
      "components": [
        {
          "name": "string",
          "component_id": "string"
        }
      ]
    },
    {
      "page_id": "strin2",
      "title": "string2",
      "components": [
        {
          "name": "string2",
          "component_id": "string2"
        }
      ]
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          {pages.map((page) => (
            <Route
              key={page.page_id}
              path={page.page_id}
              element={
                <div className="w-full min-h-svh p-8">
                  <h1>{page.title}</h1>
                  {page.components.map((component) => (
                    <div key={component.component_id}>
                      <h2>{component.name}</h2>
                    </div>
                  ))}
                </div>
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

