import PropTypes from 'prop-types';
import DynamicComponent from './DynamicComponent';

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
            component_id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            // Allow any additional props
            // eslint-disable-next-line react/forbid-prop-types
            props: PropTypes.object
        })
    ).isRequired
}; 