
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root and render App
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<App />);
}
