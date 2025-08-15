
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Debug crítico para produção
console.log('🎬 === INÍCIO DA APLICAÇÃO ===');
console.log('📍 Ambiente:', process.env.NODE_ENV);
console.log('🌐 Location:', window.location.href);
console.log('📄 Document state:', document.readyState);

// Verificar se o root existe
const rootElement = document.getElementById("root");
console.log('🎯 Root element:', rootElement);

if (!rootElement) {
  console.error('🚨 ERRO CRÍTICO: Root element não encontrado!');
  document.body.innerHTML = '<div style="color: red; padding: 20px; font-family: Arial;">ERRO: Root element não encontrado!</div>';
} else {
  console.log('✅ Root element encontrado, iniciando aplicação...');
}

// Aplicar tema inicial antes do React carregar
console.log('🎨 Aplicando tema inicial...');
document.documentElement.classList.add('dark');
document.body.classList.add('dark');
document.documentElement.style.colorScheme = 'dark';

// Garantir que CSS variáveis estejam aplicadas
document.documentElement.style.setProperty('--background', '0 0% 3%');
document.documentElement.style.setProperty('--foreground', '0 0% 95%');
document.body.style.backgroundColor = '#0a0a0a';
document.body.style.color = '#f5f5f5';

console.log('✅ Tema inicial aplicado');
console.log('🎨 Body styles:', {
  backgroundColor: document.body.style.backgroundColor,
  color: document.body.style.color,
  classes: document.body.className
});

// Create root and render App
console.log('⚛️ Criando React root...');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log('✅ Root criado com sucesso');
    
    console.log('🎭 Renderizando App...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ App renderizado com sucesso');
    
    // Verificar se algo foi renderizado após um tempo
    setTimeout(() => {
      const content = rootElement.innerHTML;
      console.log('📝 Conteúdo do root após render:', content.length > 0 ? 'Presente' : 'Vazio');
      console.log('📏 Tamanho do conteúdo:', content.length);
      
      // Remover loading de emergência se ainda estiver presente
      const emergencyLoading = document.getElementById('emergency-loading');
      if (emergencyLoading) {
        console.log('🗑️ Removendo loading de emergência (timeout)...');
        emergencyLoading.remove();
      }
      
      if (content.length === 0) {
        console.error('🚨 PROBLEMA: Root ainda vazio após render!');
        document.body.innerHTML = '<div style="color: red; padding: 20px; font-family: Arial;">ERRO: Aplicação não carregou corretamente</div>';
      } else {
        console.log('✅ Aplicação carregada com sucesso!');
      }
    }, 1000);
    
  } catch (error) {
    console.error('🚨 ERRO ao renderizar App:', error);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;">ERRO ao renderizar: ${error.message}</div>`;
  }
} else {
  console.error('🚨 Container root não encontrado!');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">ERRO: Container root não encontrado!</div>';
}
