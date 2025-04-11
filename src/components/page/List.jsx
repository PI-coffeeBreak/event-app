import PropTypes from 'prop-types';

export default function List({ items = [], ordered = false, className = "" }) {
    const Tag = ordered ? "ol" : "ul";
    return (
        <Tag className={`list-disc pl-5 ${className}`}>
            {items.map((item, i) => (
                <li key={typeof item === 'object' && item.id ? item.id : `item-${item}-${i}`}>
                    {typeof item === 'object' && item.content ? item.content : item}
                </li>
            ))}
        </Tag>
    );
}

List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                content: PropTypes.string
            })
        ])
    ),
    ordered: PropTypes.bool, 
    className: PropTypes.string
};

List.defaultProps = {
    items: [],
    ordered: false,
    className: ""
};