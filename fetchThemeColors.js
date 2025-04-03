import axios from 'axios';

export async function fetchThemeColors(apiBaseUrl) {
  try {
    const response = await axios.get(`${apiBaseUrl}/ui/color-theme/color-theme`);
    const theme = response.data;

    // Apply theme colors to the document
    Object.keys(theme).forEach((key) => {
      document.body.style.setProperty(`--color-${key}`, theme[key]);
    });
  } catch (error) {
    console.error('Error fetching theme colors:', error);
  }
}