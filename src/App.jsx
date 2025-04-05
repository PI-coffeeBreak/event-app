import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Schedule from "./pages/Schedule.jsx";
import Layout from "./components/Layout.jsx";
import { MenuProvider } from "./contexts/MenuContext.jsx";
import { ActivityProvider } from "./contexts/ActivityContext.jsx";
import Title from "./components/Title.jsx";
import Image from "./components/Image.jsx";
import Button from "./components/Button.jsx";
import Text from "./components/Text.jsx";
import Heading from "./components/Heading.jsx";
import List from "./components/List.jsx";
import Card from "./components/Card.jsx";
import pages from "./pagesData.json"; // Import JSON data

export const componentMap = {
  Title,
  Image,
  Button,
  Text,
  Heading,
  List,
  Card,
};

export default function App() {


  // Page with components example
  // const page = {
  //   title: "My Page",
  //   components: [
  //     {
  //       name: "Title",
  //       props: {
  //         text: "Welcome to My App",
  //         className: "text-center",
  //       },
  //     },
  //     {
  //       name: "Text",
  //       props: {
  //         content: "This is a sample page.",
  //         className: "text-gray-700",
  //       },
  //     }
  //   ]
  // };

  const handleDynamicProps = (props) => {
    const newProps = { ...props };
    return newProps;
  };

  return (
    <Router>
      <MenuProvider>
        <ActivityProvider>
          <Routes>
            <Route path="/app/*" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="profile" element={<Profile />} />
              {pages.map((page) => (
                <Route
                  key={page.page_id}
                  path={page.page_id}
                  element={
                    <div className={`w-full min-h-svh p-8 ${page.props?.className || ""}`}>
                      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
                      {Array.isArray(page.components) ? (
                        page.components.map((component) => {
                          const Component = componentMap[component.name];
                          if (!Component) {
                            console.warn(`Component "${component.name}" not found.`);
                            return null;
                          }
                          return (
                            <div key={component.component_id} className="mb-4">
                              <Component
                                {...handleDynamicProps(component.props)}
                                components={component.components || []} // Pass nested components
                              />
                            </div>
                          );
                        })
                      ) : (
                        <p>No components found for this page.</p>
                      )}
                    </div>
                  }
                />
              ))}
            </Route>
          </Routes>
        </ActivityProvider>
      </MenuProvider>
    </Router>
  );
}

