import { componentMap } from "../App.jsx";

export default function Row({ components = [], className = "" }) {
  return (
    <div className={`flex flex-row gap-4 ${className}`}>
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