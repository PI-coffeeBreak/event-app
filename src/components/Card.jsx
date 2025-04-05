import { componentMap } from "../App.jsx";

export default function Card({ components = [], className = "" }) {
  return (
    <div className={`p-4 border rounded shadow ${className}`}>
      {components.map((component, index) => {
        const { name, props } = component;
        const Component = componentMap[name];
        if (!Component) {
          console.warn(`Component "${name}" not found.`);
          return null;
        }
        return <Component key={index} {...props} />;
      })}
    </div>
  );
}