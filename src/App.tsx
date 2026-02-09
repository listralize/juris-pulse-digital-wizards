
import React, { Suspense } from 'react';
import { useMarketingLoader } from './hooks/useMarketingLoader';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseDataProvider } from './contexts/SupabaseDataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './components/Loading';

// Only Index is eagerly loaded (critical path)
import Index from './pages/Index.tsx';

// All other pages are lazy loaded
const Admin = React.lazy(() => import('./pages/Admin'));
const Login = React.lazy(() => import('./pages/Login'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Obrigado = React.lazy(() => import('./pages/Obrigado'));
const LinkTree = React.lazy(() => import('./pages/LinkTree'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const PoliticaPrivacidade = React.lazy(() => import('./pages/PoliticaPrivacidade'));
const TermosUso = React.lazy(() => import('./pages/TermosUso'));
const EmbedForm = React.lazy(() => import('./pages/EmbedForm'));
const StepForm = React.lazy(() => import('./pages/StepForm'));

// Dynamic routes
const DynamicServiceRoutes = React.lazy(() => import('./components/DynamicServiceRoutes'));
const DynamicCategoryRoutes = React.lazy(() => import('./components/areas/DynamicCategoryRoutes'));


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
          <SupabaseDataProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<Loading />}>
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
              </Suspense>
            </div>
          </Router>
          </SupabaseDataProvider>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
