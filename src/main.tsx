
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root and render App
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
