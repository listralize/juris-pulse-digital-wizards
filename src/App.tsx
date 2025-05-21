
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

// Serviços Específicos de Família
import DivorceService from "./pages/services/DivorceService";
import CasamentoUniaoService from "./pages/services/CasamentoUniaoService";
import GuardaFilhosService from "./pages/services/GuardaFilhosService";
import PensaoAlimenticiaService from "./pages/services/PensaoAlimenticiaService";
import AdocaoService from "./pages/services/AdocaoService";
import InventarioPartilhaService from "./pages/services/InventarioPartilhaService";
import ProtecaoMenoresService from "./pages/services/ProtecaoMenoresService";
import TestamentosSucessoesService from "./pages/services/TestamentosSucessoesService";

// Serviços de Trabalho
import ContenciosoTrabalhistaService from "./pages/services/ContenciosoTrabalhistaService";
import AssessoriaTrabalhista from "./pages/services/AssessoriaTrabalhista";

// Serviços de Tributário
import PlanejamentoTributarioService from "./pages/services/PlanejamentoTributarioService";
import ContenciosoTributarioService from "./pages/services/ContenciosoTributarioService";

// Serviços de Consumidor
import DireitosConsumidorService from "./pages/services/DireitosConsumidorService";
import PraticasAbusivasService from "./pages/services/PraticasAbusivasService";

// Serviços Administrativo
import LicitacoesContratosService from "./pages/services/LicitacoesContratosService";
import ProcessosAdministrativosService from "./pages/services/ProcessosAdministrativosService";

// Serviços Constitucional
import DireitosFundamentaisService from "./pages/services/DireitosFundamentaisService";
import LiberdadesConstitucionaisService from "./pages/services/LiberdadesConstitucionaisService";

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
                
                {/* Serviços Específicos de Família */}
                <Route path="/servicos/divorcio-separacao" element={<DivorceService />} />
                <Route path="/servicos/casamento-uniao-estavel" element={<CasamentoUniaoService />} />
                <Route path="/servicos/guarda-filhos" element={<GuardaFilhosService />} />
                <Route path="/servicos/pensao-alimenticia" element={<PensaoAlimenticiaService />} />
                <Route path="/servicos/adocao" element={<AdocaoService />} />
                <Route path="/servicos/inventario-partilha" element={<InventarioPartilhaService />} />
                <Route path="/servicos/protecao-menores" element={<ProtecaoMenoresService />} />
                <Route path="/servicos/testamentos-sucessoes" element={<TestamentosSucessoesService />} />
                
                {/* Serviços de Trabalho */}
                <Route path="/servicos/contencioso-trabalhista" element={<ContenciosoTrabalhistaService />} />
                <Route path="/servicos/assessoria-trabalhista" element={<AssessoriaTrabalhista />} />
                
                {/* Serviços de Tributário */}
                <Route path="/servicos/planejamento-tributario" element={<PlanejamentoTributarioService />} />
                <Route path="/servicos/contencioso-tributario" element={<ContenciosoTributarioService />} />
                
                {/* Serviços de Consumidor */}
                <Route path="/servicos/direitos-consumidor" element={<DireitosConsumidorService />} />
                <Route path="/servicos/praticas-abusivas" element={<PraticasAbusivasService />} />
                
                {/* Serviços de Administrativo */}
                <Route path="/servicos/licitacoes-contratos" element={<LicitacoesContratosService />} />
                <Route path="/servicos/processos-administrativos" element={<ProcessosAdministrativosService />} />
                
                {/* Serviços de Constitucional */}
                <Route path="/servicos/direitos-fundamentais" element={<DireitosFundamentaisService />} />
                <Route path="/servicos/liberdades-constitucionais" element={<LiberdadesConstitucionaisService />} />
                
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
