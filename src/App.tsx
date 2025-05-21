
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

// Áreas de Atuação
import FamiliaPage from "./pages/areas/Familia";
import TributarioPage from "./pages/areas/Tributario";
import EmpresarialPage from "./pages/areas/Empresarial";
import TrabalhoPage from "./pages/areas/Trabalho";
import ConstitucionalPage from "./pages/areas/Constitucional";
import AdministrativoPage from "./pages/areas/Administrativo";
import PrevidenciarioPage from "./pages/areas/Previdenciario";
import ConsumidorPage from "./pages/areas/Consumidor";

// Serviços Específicos
import DivorceService from "./pages/services/DivorceService";

const queryClient = new QueryClient();

// ScrollToTop component to handle navigation scroll behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen on initial app load
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500); // Reduced loading time for better user experience
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          {isInitialLoading ? (
            <Loading />
          ) : (
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Áreas de Atuação */}
                <Route path="/familia" element={<FamiliaPage />} />
                <Route path="/tributario" element={<TributarioPage />} />
                <Route path="/empresarial" element={<EmpresarialPage />} />
                <Route path="/trabalho" element={<TrabalhoPage />} />
                <Route path="/constitucional" element={<ConstitucionalPage />} />
                <Route path="/administrativo" element={<AdministrativoPage />} />
                <Route path="/previdenciario" element={<PrevidenciarioPage />} />
                <Route path="/consumidor" element={<ConsumidorPage />} />
                
                {/* Serviços Específicos */}
                <Route path="/servicos/divorcio-separacao" element={<DivorceService />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
