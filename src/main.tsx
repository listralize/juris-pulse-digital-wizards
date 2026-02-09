
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Debug information for production builds
console.log('🚀 Starting application...');
console.log('Environment:', import.meta.env.MODE);

// Create root and render App with enhanced error handling
const container = document.getElementById("root");

if (!container) {
  console.error('❌ Root container not found');
  throw new Error('Root container not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
