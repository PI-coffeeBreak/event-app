import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import DynamicPage from "./components/DynamicPage";
import { MenuProvider } from "./contexts/MenuContext.jsx";
import { ActivityProvider } from "./contexts/ActivityContext.jsx";
import { NotificationsProvider } from "./contexts/NotificationsContext.jsx";
import { fetchPages } from "./services/pageService";

export default function App() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const processedPages = await fetchPages();
        setPages(processedPages);
      } catch (err) {
        console.error('App - Failed to load pages:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  if (loading) {
    console.log('App - Loading state');
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    console.error('App - Error state:', error);
    return (
      <div className="w-full h-screen flex items-center justify-center text-error">
        <p>Error loading pages: {error}</p>
      </div>
    );
  }

  console.log('App - Rendering routes with pages:', pages);
  return (
    <Router>
      <NotificationsProvider>
        <MenuProvider endpoint="/ui/menu">
          <ActivityProvider>
            <Routes>
              <Route path="/app/*" element={<Layout />}>
                {pages.map((page) => {
                  console.log('App - Creating route for page:', {
                    page_id: page.page_id,
                    title: page.title,
                    url: page.url,
                    components: page.components
                  });
                  return (
                    <Route
                      key={page.page_id}
                      path={page.url}
                      element={
                        <>
                          {console.log('App - Route matched:', page.url)}
                          <DynamicPage title={page.title} components={page.components} />
                        </>
                      }
                    />
                  );
                })}
              </Route>
            </Routes>
          </ActivityProvider>
        </MenuProvider>
      </NotificationsProvider>
    </Router>
  );
}

