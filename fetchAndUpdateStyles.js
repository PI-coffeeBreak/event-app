import axios from 'axios';
import fs from 'fs';
import path from 'path';

// The API URL where we fetch the theme colors
const baseUrl = 'http://localhost:8000/api/v1/ui/color-theme/color-theme';
const stylesFilePath = path.resolve('src/styles.css');

const defaultTheme = {
  "base-100": "#f3faff",
  "base-200": "#d6d6d3",
  "base-300": "#d6d6d3",
  "base-content": "#726d65",
  "primary": "#4f2b1d",
  "primary-content": "#f3faff",
  "secondary": "#c6baa2",
  "secondary-content": "#f1fbfb",
  "accent": "#faa275",
  "accent-content": "#f3fbf6",
  "neutral": "#caa751",
  "neutral-content": "#f3faff",
  "info": "#00b2dd",
  "info-content": "#f2fafd",
  "success": "#0cae00",
  "success-content": "#f5faf4",
  "warning": "#fbad00",
  "warning-content": "#221300",
  "error": "#ff1300",
  "error-content": "#fff6f4",
};

// Fetch theme colors from the API
const fetchColors = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching theme colors:', error);
    // If there's an error, return the default theme colors
    return defaultTheme;
  }
};

// Function to update the styles.css file with the fetched colors
const updateStylesWithColors = (colors) => {
  if (!colors) return;

  let stylesContent = fs.readFileSync(stylesFilePath, 'utf8'); // Read current styles.css content

  // For each color, replace the placeholder in the CSS file
  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--color-${key.replace('_', '-')}`;
    // Replace the variable in the CSS file content
    const regex = new RegExp(`${cssVarName}:.*?;`, 'g');
    const newVar = `${cssVarName}: ${value};`;
    stylesContent = stylesContent.replace(regex, newVar); // Update with new value
  });

  // Write the updated content back to styles.css
  fs.writeFileSync(stylesFilePath, stylesContent, 'utf8');
  console.log('styles.css updated with fetched colors.');
};

// Main function to fetch colors and update styles.css
const main = async () => {
  const colors = await fetchColors();
  updateStylesWithColors(colors);
};

// Run the main function
main();
