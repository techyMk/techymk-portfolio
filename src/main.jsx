import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

const tree = (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode double-renders every component on mount, which is expensive
  // across an animation-heavy tree. Keep it in dev, drop it in production.
  import.meta.env.PROD ? tree : <React.StrictMode>{tree}</React.StrictMode>
);
