
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';

// Pages
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Obrigado from './pages/Obrigado';

// Areas
import Administrativo from './pages/areas/Administrativo';
import Civil from './pages/areas/Civil';
import Constitucional from './pages/areas/Constitucional';
import Consumidor from './pages/areas/Consumidor';
import Empresarial from './pages/areas/Empresarial';
import Familia from './pages/areas/Familia';
import Previdenciario from './pages/areas/Previdenciario';
import Trabalho from './pages/areas/Trabalho';
import Tributario from './pages/areas/Tributario';

// Dynamic components
import DynamicServiceRoutes from './components/DynamicServiceRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/obrigado" element={<Obrigado />} />
              
              {/* Practice Areas */}
              <Route path="/areas/administrativo" element={<Administrativo />} />
              <Route path="/areas/civil" element={<Civil />} />
              <Route path="/areas/constitucional" element={<Constitucional />} />
              <Route path="/areas/consumidor" element={<Consumidor />} />
              <Route path="/areas/empresarial" element={<Empresarial />} />
              <Route path="/areas/familia" element={<Familia />} />
              <Route path="/areas/previdenciario" element={<Previdenciario />} />
              <Route path="/areas/trabalho" element={<Trabalho />} />
              <Route path="/areas/tributario" element={<Tributario />} />
              
              {/* Dynamic Service Routes */}
              <Route path="/servicos/*" element={<DynamicServiceRoutes />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
