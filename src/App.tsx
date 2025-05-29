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
import RecuperacaoCreditosService from './pages/services/RecuperacaoCreditosService';
import ConsultoriaImpostosService from './pages/services/ConsultoriaImpostosService';
import ElisaoFiscalService from './pages/services/ElisaoFiscalService';
import AuditoriaTributariaService from './pages/services/AuditoriaTributariaService';
import ParcelamentoDebitosService from './pages/services/ParcelamentoDebitosService';
import ComplianceTributarioService from './pages/services/ComplianceTributarioService';

// Empresarial Services
import ConstituicaoEmpresasService from './pages/services/ConstituicaoEmpresasService';
import ContratosEmpresariaisService from './pages/services/ContratosEmpresariaisService';
import ReestruturacaoSocietariaService from './pages/services/ReestruturacaoSocietariaService';
import FusoesAquisicoesService from './pages/services/FusoesAquisicoesService';
import GovernancaCorporativaService from './pages/services/GovernancaCorporativaService';
import ComplianceEmpresarialService from './pages/services/ComplianceEmpresarialService';
import PropriedadeIntelectualService from './pages/services/PropriedadeIntelectualService';
import ContenciosoEmpresarialService from './pages/services/ContenciosoEmpresarialService';

// Trabalho Services
import AssessoriaTrabalhista from './pages/services/AssessoriaTrabalhista';
import ContenciosoTrabalhistaService from './pages/services/ContenciosoTrabalhistaService';
import AcordosColetivosService from './pages/services/AcordosColetivosService';
import RescisaoContratualService from './pages/services/RescisaoContratualService';
import ComplianceTrabalhistaService from './pages/services/ComplianceTrabalhistaService';
import ConsultoriaPrevidenciariaService from './pages/services/ConsultoriaPrevidenciariaService';
import SaudeSegurancaService from './pages/services/SaudeSegurancaService';
import DefesaTrabalhadorService from './pages/services/DefesaTrabalhadaorService';
import VerbaRescissoriaService from './pages/services/VerbaRescissoriaService';
import ConsultoriaEmpresarialTrabalhistaService from './pages/services/ConsultoriaEmpresarialTrabalhistaService';
import HorasExtrasService from './pages/services/HorasExtrasService';
import ReconhecimentoVinculoService from './pages/services/ReconhecimentoVinculoService';
import DefesaJustaCausaService from './pages/services/DefesaJustaCausaService';
import DireitosGestanteService from './pages/services/DireitosGestanteService';
import AssedioMoralSexualService from './pages/services/AssedioMoralSexualService';
import AcidentesDoencasService from './pages/services/AcidentesDoencasService';
import AdicionaisInsalubridadeService from './pages/services/AdicionaisInsalubridadeService';
import DesvioFuncaoService from './pages/services/DesvioFuncaoService';

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
          <Route path="/servicos/recuperacao-creditos" element={<RecuperacaoCreditosService />} />
          <Route path="/servicos/consultoria-impostos" element={<ConsultoriaImpostosService />} />
          <Route path="/servicos/elisao-fiscal" element={<ElisaoFiscalService />} />
          <Route path="/servicos/auditoria-tributaria" element={<AuditoriaTributariaService />} />
          <Route path="/servicos/parcelamento-debitos" element={<ParcelamentoDebitosService />} />
          <Route path="/servicos/compliance-tributario" element={<ComplianceTributarioService />} />

          {/* Empresarial Services */}
          <Route path="/servicos/constituicao-empresas" element={<ConstituicaoEmpresasService />} />
          <Route path="/servicos/contratos-empresariais" element={<ContratosEmpresariaisService />} />
          <Route path="/servicos/reestruturacao-societaria" element={<ReestruturacaoSocietariaService />} />
          <Route path="/servicos/fusoes-aquisicoes" element={<FusoesAquisicoesService />} />
          <Route path="/servicos/governanca-corporativa" element={<GovernancaCorporativaService />} />
          <Route path="/servicos/compliance-empresarial" element={<ComplianceEmpresarialService />} />
          <Route path="/servicos/propriedade-intelectual" element={<PropriedadeIntelectualService />} />
          <Route path="/servicos/contencioso-empresarial" element={<ContenciosoEmpresarialService />} />

          {/* Trabalho Services */}
          <Route path="/servicos/assessoria-trabalhista" element={<AssessoriaTrabalhista />} />
          <Route path="/servicos/contencioso-trabalhista" element={<ContenciosoTrabalhistaService />} />
          <Route path="/servicos/acordos-coletivos" element={<AcordosColetivosService />} />
          <Route path="/servicos/rescisoes-contratuais" element={<RescisaoContratualService />} />
          <Route path="/servicos/compliance-trabalhista" element={<ComplianceTrabalhistaService />} />
          <Route path="/servicos/consultoria-previdenciaria" element={<ConsultoriaPrevidenciariaService />} />
          <Route path="/servicos/saude-seguranca" element={<SaudeSegurancaService />} />
          <Route path="/servicos/defesa-trabalhador" element={<DefesaTrabalhadorService />} />
          <Route path="/servicos/verbas-rescissorias" element={<VerbaRescissoriaService />} />
          <Route path="/servicos/consultoria-empresarial-trabalhista" element={<ConsultoriaEmpresarialTrabalhistaService />} />
          <Route path="/servicos/horas-extras" element={<HorasExtrasService />} />
          <Route path="/servicos/reconhecimento-vinculo" element={<ReconhecimentoVinculoService />} />
          <Route path="/servicos/defesa-justa-causa" element={<DefesaJustaCausaService />} />
          <Route path="/servicos/direitos-gestante" element={<DireitosGestanteService />} />
          <Route path="/servicos/assedio-moral-sexual" element={<AssedioMoralSexualService />} />
          <Route path="/servicos/acidentes-doencas" element={<AcidentesDoencasService />} />
          <Route path="/servicos/adicionais-insalubridade" element={<AdicionaisInsalubridadeService />} />
          <Route path="/servicos/desvio-funcao" element={<DesvioFuncaoService />} />

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
