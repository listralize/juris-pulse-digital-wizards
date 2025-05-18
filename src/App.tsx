
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Áreas de Atuação
import FamiliaPage from "./pages/areas/Familia";
import TributarioPage from "./pages/areas/Tributario";
import EmpresarialPage from "./pages/areas/Empresarial";
import TrabalhoPage from "./pages/areas/Trabalho";
import ConstitucionalPage from "./pages/areas/Constitucional";
import AdministrativoPage from "./pages/areas/Administrativo";
import PrevidenciarioPage from "./pages/areas/Previdenciario";
import ConsumidorPage from "./pages/areas/Consumidor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
