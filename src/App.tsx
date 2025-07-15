
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Areas from './pages/Areas';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WhatsAppButton from './components/WhatsAppButton';
import { useAnalytics } from './hooks/useAnalytics';

const queryClient = new QueryClient();

const App = () => {
  useAnalytics();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Index />} />
              <Route path="/quem-somos" element={<About />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/areas/:slug" element={<Areas />} />
              <Route path="/services/:slug" element={<Areas />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <WhatsAppButton />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
