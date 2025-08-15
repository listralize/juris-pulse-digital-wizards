
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Aplicar tema inicial antes do React carregar
document.documentElement.classList.add('dark');
document.body.classList.add('dark');
document.documentElement.style.colorScheme = 'dark';

// Create root and render App
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('🚨 Container root não encontrado!');
}
