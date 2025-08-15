import React, { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componente simples para teste
function SimpleIndex() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Site Funcionando!</h1>
      <p className="text-lg">Aplicação carregou com sucesso.</p>
    </div>
  );
}

function App() {
  console.log('🚀 App carregando...');
  
  // Remover loading de emergência
  useEffect(() => {
    console.log('🗑️ Removendo loading...');
    const timer = setTimeout(() => {
      const emergencyLoading = document.getElementById('emergency-loading');
      if (emergencyLoading) {
        console.log('✅ Loading removido');
        emergencyLoading.remove();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  console.log('✅ App renderizando...');
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SimpleIndex />} />
          <Route path="*" element={<div className="p-8 text-white bg-slate-900">Página não encontrada</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;