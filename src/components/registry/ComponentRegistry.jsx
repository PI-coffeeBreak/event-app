import * as PageComponents from '../page';

export function getComponent(componentName) {
    console.log('ComponentRegistry - Attempting to get component:', componentName);

    // Remove spaces and special characters, keeping only letters
    const normalizedName = componentName.replace(/[^a-zA-Z]/g, '');

    // Find the component in the PageComponents object
    const component = PageComponents[normalizedName];

    if (!component) {
        console.warn(`ComponentRegistry - Component ${componentName} not found`);
        return null;
    }

    console.log('ComponentRegistry - Component found:', { componentName, exists: true });
    return component;
}