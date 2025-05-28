
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Index from './pages/Index';
import FamiliaPage from './pages/areas/Familia';
import TributarioPage from './pages/areas/Tributario';
import EmpresarialPage from './pages/areas/Empresarial';
import ConstitucionalPage from './pages/areas/Constitucional';
import TrabalhoPage from './pages/areas/Trabalho';
import AdministrativoPage from './pages/areas/Administrativo';
import PrevidenciarioPage from './pages/areas/Previdenciario';
import ConsumidorPage from './pages/areas/Consumidor';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';
import { Toaster } from "@/components/ui/toaster";

// Família Services
import DivorceService from './pages/services/DivorceService';
import CasamentoUniaoService from './pages/services/CasamentoUniaoService';
import GuardaFilhosService from './pages/services/GuardaFilhosService';
import PensaoAlimenticiaService from './pages/services/PensaoAlimenticiaService';
import AdocaoService from './pages/services/AdocaoService';
import ProtecaoMenoresService from './pages/services/ProtecaoMenoresService';
import InventarioPartilhaService from './pages/services/InventarioPartilhaService';
import TestamentosSucessoesService from './pages/services/TestamentosSucessoesService';

// Tributário Services
import PlanejamentoTributarioService from './pages/services/PlanejamentoTributarioService';
import ContenciosoTributarioService from './pages/services/ContenciosoTributarioService';

// Empresarial Services
import ConstituicaoEmpresasService from './pages/services/ConstituicaoEmpresasService';
import ContratosEmpresariaisService from './pages/services/ContratosEmpresariaisService';
import RecuperacaoCreditosService from './pages/services/RecuperacaoCreditosService';

// Trabalho Services
import AssessoriaTrabalhista from './pages/services/AssessoriaTrabalhista';
import ContenciosoTrabalhistaService from './pages/services/ContenciosoTrabalhistaService';
import AcordosColetivosService from './pages/services/AcordosColetivosService';
import RescisaoContratualService from './pages/services/RescisaoContratualService';
import ComplianceTrabalhistaService from './pages/services/ComplianceTrabalhistaService';
import ConsultoriaPrevidenciariaService from './pages/services/ConsultoriaPrevidenciariaService';
import SaudeSegurancaService from './pages/services/SaudeSegurancaService';

// Constitucional Services
import DireitosFundamentaisService from './pages/services/DireitosFundamentaisService';
import LiberdadesConstitucionaisService from './pages/services/LiberdadesConstitucionaisService';

// Administrativo Services
import LicitacoesContratosService from './pages/services/LicitacoesContratosService';
import ProcessosAdministrativosService from './pages/services/ProcessosAdministrativosService';

// Previdenciário Services
import BeneficiosPrevidenciariosService from './pages/services/BeneficiosPrevidenciariosService';

// Consumidor Services
import DireitosConsumidorService from './pages/services/DireitosConsumidorService';
import PraticasAbusivasService from './pages/services/PraticasAbusivasService';
import PublicidadeEnganosaService from './pages/services/PublicidadeEnganosaService';

import ObrigadoPage from './pages/Obrigado';

// ScrollToTop component that uses the location hook
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <CustomCursor />
        <ScrollToTop />
        <Routes>
          {/* Main Areas */}
          <Route path="/" element={<Index />} />
          <Route path="/familia" element={<FamiliaPage />} />
          <Route path="/tributario" element={<TributarioPage />} />
          <Route path="/empresarial" element={<EmpresarialPage />} />
          <Route path="/constitucional" element={<ConstitucionalPage />} />
          <Route path="/trabalho" element={<TrabalhoPage />} />
          <Route path="/administrativo" element={<AdministrativoPage />} />
          <Route path="/previdenciario" element={<PrevidenciarioPage />} />
          <Route path="/consumidor" element={<ConsumidorPage />} />

          {/* Família Services */}
          <Route path="/servicos/divorcio-separacao" element={<DivorceService />} />
          <Route path="/servicos/casamento-uniao-estavel" element={<CasamentoUniaoService />} />
          <Route path="/servicos/guarda-filhos" element={<GuardaFilhosService />} />
          <Route path="/servicos/pensao-alimenticia" element={<PensaoAlimenticiaService />} />
          <Route path="/servicos/adocao" element={<AdocaoService />} />
          <Route path="/servicos/protecao-menores" element={<ProtecaoMenoresService />} />
          <Route path="/servicos/inventario-partilha" element={<InventarioPartilhaService />} />
          <Route path="/servicos/testamentos-sucessoes" element={<TestamentosSucessoesService />} />

          {/* Tributário Services */}
          <Route path="/servicos/planejamento-tributario" element={<PlanejamentoTributarioService />} />
          <Route path="/servicos/contencioso-tributario" element={<ContenciosoTributarioService />} />

          {/* Empresarial Services */}
          <Route path="/servicos/constituicao-empresas" element={<ConstituicaoEmpresasService />} />
          <Route path="/servicos/contratos-empresariais" element={<ContratosEmpresariaisService />} />
          <Route path="/servicos/recuperacao-creditos" element={<RecuperacaoCreditosService />} />

          {/* Trabalho Services */}
          <Route path="/servicos/assessoria-trabalhista" element={<AssessoriaTrabalhista />} />
          <Route path="/servicos/contencioso-trabalhista" element={<ContenciosoTrabalhistaService />} />
          <Route path="/servicos/acordos-coletivos" element={<AcordosColetivosService />} />
          <Route path="/servicos/rescisoes-contratuais" element={<RescisaoContratualService />} />
          <Route path="/servicos/compliance-trabalhista" element={<ComplianceTrabalhistaService />} />
          <Route path="/servicos/consultoria-previdenciaria" element={<ConsultoriaPrevidenciariaService />} />
          <Route path="/servicos/saude-seguranca" element={<SaudeSegurancaService />} />

          {/* Constitucional Services */}
          <Route path="/servicos/direitos-fundamentais" element={<DireitosFundamentaisService />} />
          <Route path="/servicos/liberdades-constitucionais" element={<LiberdadesConstitucionaisService />} />

          {/* Administrativo Services */}
          <Route path="/servicos/licitacoes-contratos" element={<LicitacoesContratosService />} />
          <Route path="/servicos/processos-administrativos" element={<ProcessosAdministrativosService />} />

          {/* Previdenciário Services */}
          <Route path="/servicos/beneficios-previdenciarios" element={<BeneficiosPrevidenciariosService />} />

          {/* Consumidor Services */}
          <Route path="/servicos/direitos-consumidor" element={<DireitosConsumidorService />} />
          <Route path="/servicos/praticas-abusivas" element={<PraticasAbusivasService />} />
          <Route path="/servicos/publicidade-enganosa" element={<PublicidadeEnganosaService />} />
          
          <Route path="/obrigado" element={<ObrigadoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
