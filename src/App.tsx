import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
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
import { QueryClient } from 'react-query';
import WhatsAppButton from './components/WhatsAppButton';
import { useAnalytics } from './hooks/useAnalytics';

const App = () => {

  useAnalytics();

  return (
    <QueryClient>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
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
    </QueryClient>
  );
};

export default App;
