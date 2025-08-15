
import React, { Suspense, lazy } from 'react';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';

// Core pages (carregamento imediato)
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Lazy loading para páginas menos críticas
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Obrigado = lazy(() => import('./pages/Obrigado'));
const LinkTree = lazy(() => import('./pages/LinkTree'));
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade'));
const TermosUso = lazy(() => import('./pages/TermosUso'));
const EmbedForm = lazy(() => import('./pages/EmbedForm'));
const StepForm = lazy(() => import('./pages/StepForm'));

// Dynamic routes (lazy loading)
const DynamicServiceRoutes = lazy(() => import('./components/DynamicServiceRoutes'));
const DynamicCategoryRoutes = lazy(() => import('./components/areas/DynamicCategoryRoutes'));

// Area pages (lazy loading para fallbacks)
const Familia = lazy(() => import('./pages/areas/Familia'));
const Tributario = lazy(() => import('./pages/areas/Tributario'));
const Empresarial = lazy(() => import('./pages/areas/Empresarial'));
const Trabalho = lazy(() => import('./pages/areas/Trabalho'));
const Civil = lazy(() => import('./pages/areas/Civil'));
const Previdenciario = lazy(() => import('./pages/areas/Previdenciario'));
const Consumidor = lazy(() => import('./pages/areas/Consumidor'));
const Constitucional = lazy(() => import('./pages/areas/Constitucional'));
const Administrativo = lazy(() => import('./pages/areas/Administrativo'));

const queryClient = new QueryClient();

function App() {
  console.log('✅ App iniciando...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <Router>
              <div className="App">
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                      <p>Carregando...</p>
                    </div>
                  </div>
                }>
                  <Routes>
                    {/* Main page - carregamento imediato */}
                    <Route path="/" element={<Index />} />
                    
                    {/* Páginas menos críticas - lazy loading */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/tree" element={<LinkTree />} />
                    <Route path="/obrigado" element={<Obrigado />} />
                    <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="/termos-uso" element={<TermosUso />} />
                    
                    {/* Form routes */}
                    <Route path="/embed/form/:formId" element={<EmbedForm />} />
                    <Route path="/form/:slug" element={<StepForm />} />
                    
                    {/* Static area pages (fallbacks) */}
                    <Route path="/areas/familia" element={<Familia />} />
                    <Route path="/areas/tributario" element={<Tributario />} />
                    <Route path="/areas/empresarial" element={<Empresarial />} />
                    <Route path="/areas/trabalho" element={<Trabalho />} />
                    <Route path="/areas/civil" element={<Civil />} />
                    <Route path="/areas/previdenciario" element={<Previdenciario />} />
                    <Route path="/areas/consumidor" element={<Consumidor />} />
                    <Route path="/areas/constitucional" element={<Constitucional />} />
                    <Route path="/areas/administrativo" element={<Administrativo />} />
                    
                    {/* Dynamic routes */}
                    <Route path="/areas/*" element={<DynamicCategoryRoutes />} />
                    <Route path="/services/*" element={<DynamicServiceRoutes />} />
                    <Route path="/servicos/*" element={<DynamicServiceRoutes />} />
                    
                    {/* 404 fallback */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
