
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Debug inicial para produção
console.log('🎬 Iniciando aplicação...');

// Aplicar tema inicial antes do React carregar
document.documentElement.classList.add('dark');
document.body.classList.add('dark');
document.documentElement.style.colorScheme = 'dark';

// Garantir que CSS variáveis estejam aplicadas
document.documentElement.style.setProperty('--background', '0 0% 3%');
document.documentElement.style.setProperty('--foreground', '0 0% 95%');

console.log('✅ Tema inicial aplicado');

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
