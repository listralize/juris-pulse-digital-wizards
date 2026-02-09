
import React, { useEffect } from 'react';
import { useMarketingLoader } from './hooks/useMarketingLoader';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




// Pages
import Index from './pages/Index.tsx';
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
import StepForm from './pages/StepForm';

// Dynamic routes
import DynamicServiceRoutes from './components/DynamicServiceRoutes';
import DynamicCategoryRoutes from './components/areas/DynamicCategoryRoutes';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  
  
  // Load marketing scripts from Supabase config
  useMarketingLoader();
  
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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
                
                {/* Step form route */}
                <Route path="/form/:slug" element={<StepForm />} />
                
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
