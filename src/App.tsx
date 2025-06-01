
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import Loading from './components/Loading';

// Lazy load components
const Index = React.lazy(() => import('./pages/Index'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const BlogPage = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Login = React.lazy(() => import('./pages/Login'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Obrigado = React.lazy(() => import('./pages/Obrigado'));

// Areas pages
const FamiliaPage = React.lazy(() => import('./pages/areas/Familia'));
const TributarioPage = React.lazy(() => import('./pages/areas/Tributario'));
const EmpresarialPage = React.lazy(() => import('./pages/areas/Empresarial'));
const TrabalhoPage = React.lazy(() => import('./pages/areas/Trabalho'));
const ConstitucionalPage = React.lazy(() => import('./pages/areas/Constitucional'));
const AdministrativoPage = React.lazy(() => import('./pages/areas/Administrativo'));
const PrevidenciarioPage = React.lazy(() => import('./pages/areas/Previdenciario'));
const ConsumidorPage = React.lazy(() => import('./pages/areas/Consumidor'));
const CivilPage = React.lazy(() => import('./pages/areas/Civil'));

// Service pages
const CasamentoUniaoService = React.lazy(() => import('./pages/services/CasamentoUniaoService'));

// Dynamic service page component
const DynamicServicePage = React.lazy(() => import('./components/DynamicServicePage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <AuthProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/obrigado" element={<Obrigado />} />
                  
                  {/* Areas pages */}
                  <Route path="/familia" element={<FamiliaPage />} />
                  <Route path="/tributario" element={<TributarioPage />} />
                  <Route path="/empresarial" element={<EmpresarialPage />} />
                  <Route path="/trabalho" element={<TrabalhoPage />} />
                  <Route path="/constitucional" element={<ConstitucionalPage />} />
                  <Route path="/administrativo" element={<AdministrativoPage />} />
                  <Route path="/previdenciario" element={<PrevidenciarioPage />} />
                  <Route path="/consumidor" element={<ConsumidorPage />} />
                  <Route path="/civil" element={<CivilPage />} />
                  
                  {/* Specific service pages */}
                  <Route path="/servicos/casamento-uniao-estavel" element={<CasamentoUniaoService />} />
                  
                  {/* Dynamic service pages */}
                  <Route path="/servicos/:serviceId" element={<DynamicServicePage />} />
                  
                  {/* 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
