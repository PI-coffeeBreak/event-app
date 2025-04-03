import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import axios from 'axios';


async function FetchThemeColors() {
  // Fetch theme colors from the API using axios
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/ui/color-theme/color-theme`)
    .then((response) => {
      const theme = response.data;
      // Apply theme colors to the document
      Object.keys(theme).forEach((key) => {
        document.body.style.setProperty(`--color-${key}`, theme[key]);
      });
    })
    .catch((error) => {
      console.error('Error fetching theme colors:', error);
    });
}

async function startApp() {

  // Fetch theme colors
  await FetchThemeColors();

  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('Service worker registered successfully:', registration);
      },
      (error) => {
        console.log('Failed to register the Service Worker:', error);
      }
    );
  });
}

startApp();