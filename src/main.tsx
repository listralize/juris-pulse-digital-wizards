
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root and render App with error handling
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  
  try {
    root.render(<App />);
  } catch (error) {
    console.error('Error rendering app:', error);
    // Fallback render
    container.innerHTML = `
      <div style="
        display: flex; 
        justify-content: center; 
        align-items: center; 
        height: 100vh; 
        font-family: system-ui, -apple-system, sans-serif;
        background: #000;
        color: #fff;
        text-align: center;
      ">
        <div>
          <h1>Serafim & Trombela Advocacia</h1>
          <p>Carregando...</p>
        </div>
      </div>
    `;
  }
} else {
  console.error('Root container not found');
}
