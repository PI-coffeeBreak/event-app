import PropTypes from 'prop-types';
import DynamicComponent from '../DynamicComponent';

export default function Row({ components }) {
  return (
    <div className="flex flex-row gap-4">
      {components.map((component) => (
        <div key={component.component_id} className="flex-1">
          <DynamicComponent
            componentId={component.component_id}
            name={component.name}
            {...component}
          />
        </div>
      ))}
    </div>
  );
}

Row.propTypes = {
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