import PropTypes from 'prop-types';
import { getComponent } from './registry/ComponentRegistry';

export default function DynamicComponent({ componentId, name, ...props }) {
    console.log('DynamicComponent - Attempting to render:', { componentId, name, props });

    const Component = getComponent(name);
    console.log('DynamicComponent - Retrieved component:', { name, exists: !!Component });

    if (!Component) {
        console.warn('DynamicComponent - Component not found:', { name, componentId });
        return (
            <div className="p-4 border border-warning bg-warning/10 rounded-lg">
                <p className="text-warning">
                    Component not found: {name} ({componentId})
                </p>
            </div>
        );
    }

    console.log('DynamicComponent - Rendering component with props:', props);
    return <Component {...props} />;
}

DynamicComponent.propTypes = {
    componentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object
}; 