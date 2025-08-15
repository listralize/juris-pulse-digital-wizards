
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

// Enhanced error boundary for production
try {
  console.log('📦 Rendering React application...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ Application rendered successfully');
} catch (error) {
  console.error('❌ Error rendering app:', error);
  
  // Enhanced fallback with better error info
  container.innerHTML = `
    <div style="
      display: flex; 
      flex-direction: column;
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #fff;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="margin-bottom: 20px; font-size: 2rem;">Serafim & Trombela Advocacia</h1>
        <p style="margin-bottom: 10px; font-size: 1.2rem;">Carregando aplicação...</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">Se esta mensagem persistir, recarregue a página</p>
        <button onclick="location.reload()" style="
          margin-top: 20px;
          padding: 10px 20px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        ">Recarregar Página</button>
      </div>
    </div>
  `;
  
  // Try to reload after a delay
  setTimeout(() => {
    console.log('🔄 Auto-reloading after error...');
    window.location.reload();
  }, 3000);
}
