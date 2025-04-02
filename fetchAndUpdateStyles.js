import axios from 'axios';
import fs from 'fs';
import path from 'path';

// The API URL where we fetch the theme colors
const baseUrl = 'http://localhost:8000/api/v1/ui/color-theme/color-theme';
const stylesFilePath = path.resolve('src/styles.css');

// Fetch theme colors from the API
const fetchColors = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching theme colors:', error);
    return null;
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
