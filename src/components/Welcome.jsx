import PropTypes from 'prop-types';

export default function Welcome({ title, message }) {
    return (
        <div className="p-6 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{title || 'Welcome'}</h2>
            <p className="text-lg">
                {message || 'Welcome to our event management platform. Here you can manage your events, activities, and more.'}
            </p>
        </div>
    );
}

Welcome.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
}; 