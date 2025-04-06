import PropTypes from 'prop-types';
import DynamicComponent from './DynamicComponent';

export default function DynamicPage({ title, components }) {
    console.log('DynamicPage - Rendering with:', { title, components });

    return (
        <div className="w-full min-h-svh p-8">
            {components.map((component) => {
                const { component_id, name, ...componentProps } = component;
                console.log('DynamicPage - Rendering component:', { component_id, name, componentProps });
                return (
                    <div key={component_id} className="mb-4">
                        <DynamicComponent
                            componentId={component_id}
                            name={name}
                            {...componentProps}
                        />
                    </div>
                );
            })}
        </div>
    );
}

DynamicPage.propTypes = {
    title: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            component_id: PropTypes.string.isRequired,
            // Allow any additional props
            // eslint-disable-next-line react/forbid-prop-types
            props: PropTypes.object
        })
    ).isRequired
}; 