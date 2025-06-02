
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Obrigado from './pages/Obrigado';
import NotFound from './pages/NotFound';

// Practice Area Pages
import Familia from './pages/areas/Familia';
import Tributario from './pages/areas/Tributario';
import Empresarial from './pages/areas/Empresarial';
import Trabalho from './pages/areas/Trabalho';
import Constitucional from './pages/areas/Constitucional';
import Administrativo from './pages/areas/Administrativo';
import Previdenciario from './pages/areas/Previdenciario';
import Consumidor from './pages/areas/Consumidor';
import Civil from './pages/areas/Civil';

// Dynamic Service Routes Hook
import { useDynamicServiceRoutes } from './components/DynamicServiceRoutes';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function AppRoutes() {
  const dynamicServiceRoutes = useDynamicServiceRoutes();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/obrigado" element={<Obrigado />} />
      
      {/* Practice Area Routes */}
      <Route path="/familia" element={<Familia />} />
      <Route path="/tributario" element={<Tributario />} />
      <Route path="/empresarial" element={<Empresarial />} />
      <Route path="/trabalho" element={<Trabalho />} />
      <Route path="/constitucional" element={<Constitucional />} />
      <Route path="/administrativo" element={<Administrativo />} />
      <Route path="/previdenciario" element={<Previdenciario />} />
      <Route path="/consumidor" element={<Consumidor />} />
      <Route path="/civil" element={<Civil />} />
      
      {/* Dynamic Service Routes */}
      {dynamicServiceRoutes}
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <AuthProvider>
          <Router>
            <div className="App">
              <AppRoutes />
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
