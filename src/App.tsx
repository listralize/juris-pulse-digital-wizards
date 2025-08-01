
import React from 'react';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Obrigado from './pages/Obrigado';
import LinkTree from './pages/LinkTree';
import NotFound from './pages/NotFound';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import TermosUso from './pages/TermosUso';
import EmbedForm from './pages/EmbedForm';

// Dynamic routes
import DynamicServiceRoutes from './components/DynamicServiceRoutes';
import DynamicCategoryRoutes from './components/areas/DynamicCategoryRoutes';

// Area pages (static fallbacks)
import Familia from './pages/areas/Familia';
import Tributario from './pages/areas/Tributario';
import Empresarial from './pages/areas/Empresarial';
import Trabalho from './pages/areas/Trabalho';
import Civil from './pages/areas/Civil';
import Previdenciario from './pages/areas/Previdenciario';
import Consumidor from './pages/areas/Consumidor';
import Constitucional from './pages/areas/Constitucional';
import Administrativo from './pages/areas/Administrativo';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/tree" element={<LinkTree />} />
                <Route path="/obrigado" element={<Obrigado />} />
                <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/termos-uso" element={<TermosUso />} />
                
                {/* Embed form route */}
                <Route path="/embed/form/:formId" element={<EmbedForm />} />
                
                {/* Static area pages (fallbacks for existing URLs) */}
                <Route path="/areas/familia" element={<Familia />} />
                <Route path="/areas/tributario" element={<Tributario />} />
                <Route path="/areas/empresarial" element={<Empresarial />} />
                <Route path="/areas/trabalho" element={<Trabalho />} />
                <Route path="/areas/civil" element={<Civil />} />
                <Route path="/areas/previdenciario" element={<Previdenciario />} />
                <Route path="/areas/consumidor" element={<Consumidor />} />
                <Route path="/areas/constitucional" element={<Constitucional />} />
                <Route path="/areas/administrativo" element={<Administrativo />} />
                
                {/* Dynamic area pages - Para todas as categorias do Supabase */}
                <Route path="/areas/*" element={<DynamicCategoryRoutes />} />
                
                {/* Dynamic service pages */}
                <Route path="/services/*" element={<DynamicServiceRoutes />} />
                <Route path="/servicos/*" element={<DynamicServiceRoutes />} />
                
                {/* 404 fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
