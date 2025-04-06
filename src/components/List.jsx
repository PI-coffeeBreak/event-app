import PropTypes from "prop-types";
import DynamicComponent from "./DynamicComponent";

export default function List({ components }) {
    return (
        <div className="space-y-4">
            {components.map((component) => (
                <DynamicComponent
                    key={component.component_id}
                    componentId={component.component_id}
                    name={component.name}
                    {...component}
                />
            ))}
        </div>
    );
}

List.propTypes = {
    components: PropTypes.arrayOf(
        PropTypes.shape({
            component_id: PropTypes.string.isRequired, // Unique ID for each component
            name: PropTypes.string.isRequired, // Component name
            props: PropTypes.object, // Additional props for the component
        })
    ).isRequired,
};