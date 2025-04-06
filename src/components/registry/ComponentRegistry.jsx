// Import all components that can be rendered dynamically
import Welcome from '../Welcome';
import UserProfile from '../UserProfile';
import Text from '../Text';
import Heading from '../Heading';
import Button from '../Button';
import Image from '../Image';
import List from '../List';
import Card from '../Card';
import Row from '../Row';
import Title from '../Title';

// Available components map
const components = {
    'Welcome': Welcome,
    'User Profile': UserProfile,
    'Text': Text,
    'Heading': Heading,
    'Button': Button,
    'Image': Image,
    'List': List,
    'Card': Card,
    'Row': Row,
    'Title': Title,
};

export function getComponent(componentId) {
    console.log('ComponentRegistry - Attempting to get component:', componentId);

    const component = components[componentId];
    console.log('ComponentRegistry - Component found:', { componentId, exists: !!component });
    return component || null;
}