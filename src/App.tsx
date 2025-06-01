import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Blog from './components/sections/Blog';
import BlogPost from './pages/BlogPost';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';
import BlogAutomation from './pages/BlogAutomation';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/automation" element={<BlogAutomation />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
            <Toaster />
            <CustomCursor />
            <WhatsAppButton />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
