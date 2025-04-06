import PropTypes from 'prop-types';
import DynamicComponent from '../DynamicComponent';

export default function Card({ components }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {components.map((component) => (
          <DynamicComponent
            key={component.component_id}
            componentId={component.component_id}
            name={component.name}
            {...component}
          />
        ))}
      </div>
    </div>
  );
}

Card.propTypes = {
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