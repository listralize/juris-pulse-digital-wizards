
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Debug inicial para produção
console.log('🎬 Iniciando aplicação...');

// Aplicar tema inicial de forma mais robusta
try {
  const applyInitialTheme = () => {
    const html = document.documentElement;
    const body = document.body;
    
    // Remover classes existentes
    html.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Aplicar tema dark como padrão
    html.classList.add('dark');
    body.classList.add('dark');
    html.style.colorScheme = 'dark';
    
    // Garantir que CSS variáveis estejam aplicadas imediatamente
    html.style.setProperty('--background', '0 0% 3%');
    html.style.setProperty('--foreground', '0 0% 95%');
    
    // Aplicar estilos inline como fallback
    body.style.backgroundColor = '#0a0a0a';
    body.style.color = '#f5f5f5';
    body.style.fontFamily = "'Inter', system-ui, sans-serif";
  };
  
  applyInitialTheme();
  console.log('✅ Tema inicial aplicado com sucesso');
} catch (error) {
  console.error('❌ Erro ao aplicar tema inicial:', error);
  // Fallback básico
  document.body.style.backgroundColor = '#0a0a0a';
  document.body.style.color = '#f5f5f5';
}

// Create root and render App com tratamento de erro
const container = document.getElementById("root");
if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ React app renderizado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao renderizar React app:', error);
    // Fallback manual
    container.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #f5f5f5; font-family: system-ui;">
        <div style="text-align: center;">
          <h1>Carregando...</h1>
          <p>Se esta mensagem persistir, recarregue a página.</p>
        </div>
      </div>
    `;
  }
} else {
  console.error('🚨 Container root não encontrado!');
  // Criar o container se não existir
  const newContainer = document.createElement('div');
  newContainer.id = 'root';
  document.body.appendChild(newContainer);
  console.log('🔧 Container root criado');
}
