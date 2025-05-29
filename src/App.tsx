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
import CivilPage from './pages/areas/Civil';
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
import AcoesInconstitucionalidadeService from './pages/services/AcoesInconstitucionalidadeService';
import MandadoSegurancaService from './pages/services/MandadoSegurancaService';
import HabeasCorpusService from './pages/services/HabeasCorpusService';
import HabeasDataService from './pages/services/HabeasDataService';
import MandadoInjuncaoService from './pages/services/MandadoInjuncaoService';
import ConsultoriaConstitucionalService from './pages/services/ConsultoriaConstitucionalService';
import ADIService from './pages/services/ADIService';
import ADCService from './pages/services/ADCService';
import ADOService from './pages/services/ADOService';
import ADPFService from './pages/services/ADPFService';
import ReclamacaoConstitucionalService from './pages/services/ReclamacaoConstitucionalService';
import LiberdadeExpressaoService from './pages/services/LiberdadeExpressaoService';
import IgualdadeNaoDiscriminacaoService from './pages/services/IgualdadeNaoDiscriminacaoService';
import DireitosSociaisService from './pages/services/DireitosSociaisService';
import DireitosMinoriasService from './pages/services/DireitosMinoriasService';
import AnaliseConstitucionalidadeService from './pages/services/AnaliseConstitucionalidadeService';
import PareceresTecnicosService from './pages/services/PareceresTecnicosService';
import AssessoriaPoliticasPublicasService from './pages/services/AssessoriaPoliticasPublicasService';
import AtuacaoSTFService from './pages/services/AtuacaoSTFService';
import AtuacaoSTJService from './pages/services/AtuacaoSTJService';
import ProjetosLeiService from './pages/services/ProjetosLeiService';
import EmendasParlamentaresService from './pages/services/EmendasParlamentaresService';
import LobbyLegislativoService from './pages/services/LobbyLegislativoService';
import MonitoramentoLegislativoService from './pages/services/MonitoramentoLegislativoService';

// Administrativo Services
import LicitacoesContratosService from './pages/services/LicitacoesContratosService';
import ProcessosAdministrativosService from './pages/services/ProcessosAdministrativosService';
import AssessoriaLicitacoesService from './pages/services/AssessoriaLicitacoesService';
import DefesaLicitacoesService from './pages/services/DefesaLicitacoesService';
import GestaoContratosPublicosService from './pages/services/GestaoContratosPublicosService';
import PADSindicanciaService from './pages/services/PADSindicanciaService';
import ResponsabilidadeEstadoService from './pages/services/ResponsabilidadeEstadoService';
import DireitosServidoresService from './pages/services/DireitosServidoresService';
import DesapropriacaoService from './pages/services/DesapropriacaoService';
import AtosAdministrativosService from './pages/services/AtosAdministrativosService';
import ImprobidadeAdministrativaService from './pages/services/ImprobidadeAdministrativaService';
import RegulacaoFiscalizacaoService from './pages/services/RegulacaoFiscalizacaoService';
import DireitoAmbientalAdministrativoService from './pages/services/DireitoAmbientalAdministrativoService';
import DireitoUrbanisticoService from './pages/services/DireitoUrbanisticoService';
import InfraestruturaProjetos from './pages/services/InfraestruturaProjetos';
import ConsultoriaAdministrativoService from './pages/services/ConsultoriaAdministrativoService';
import TribunaisContasService from './pages/services/TribunaisContasService';

// Previdenciário Services
import BeneficiosPrevidenciariosService from './pages/services/BeneficiosPrevidenciariosService';
import AposentadoriaIdadeService from './pages/services/AposentadoriaIdadeService';
import AuxilioDoencaService from './pages/services/AuxilioDoencaService';
import AposentadoriaTempoContribuicaoService from './pages/services/AposentadoriaTempoContribuicaoService';
import AposentadoriaInvalidezService from './pages/services/AposentadoriaInvalidezService';
import AposentadoriaEspecialService from './pages/services/AposentadoriaEspecialService';
import PensaoMorteService from './pages/services/PensaoMorteService';
import SalarioMaternidadeService from './pages/services/SalarioMaternidadeService';
import AuxilioAcidenteService from './pages/services/AuxilioAcidenteService';
import BPCService from './pages/services/BPCService';
import RevisaoVidaTodaService from './pages/services/RevisaoVidaTodaService';
import PlanejamentoPrevidenciarioService from './pages/services/PlanejamentoPrevidenciarioService';

// Consumidor Services
import DireitosConsumidorService from './pages/services/DireitosConsumidorService';
import PraticasAbusivasService from './pages/services/PraticasAbusivasService';
import PublicidadeEnganosaService from './pages/services/PublicidadeEnganosaService';
import ResponsabilidadeProdutosService from './pages/services/ResponsabilidadeProdutosService';
import RecallsSegurancaService from './pages/services/RecallsSegurancaService';
import ContratosConsumoService from './pages/services/ContratosConsumoService';
import IndenizacaoDanosService from './pages/services/IndenizacaoDanosService';
import DefesaColetivaService from './pages/services/DefesaColetivaService';

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
          <Route path="/civil" element={<CivilPage />} />

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
          <Route path="/servicos/acoes-inconstitucionalidade" element={<AcoesInconstitucionalidadeService />} />
          <Route path="/servicos/mandado-seguranca" element={<MandadoSegurancaService />} />
          <Route path="/servicos/habeas-corpus" element={<HabeasCorpusService />} />
          <Route path="/servicos/habeas-data" element={<HabeasDataService />} />
          <Route path="/servicos/mandado-injuncao" element={<MandadoInjuncaoService />} />
          <Route path="/servicos/consultoria-constitucional" element={<ConsultoriaConstitucionalService />} />
          <Route path="/servicos/adi" element={<ADIService />} />
          <Route path="/servicos/adc" element={<ADCService />} />
          <Route path="/servicos/ado" element={<ADOService />} />
          <Route path="/servicos/adpf" element={<ADPFService />} />
          <Route path="/servicos/reclamacao-constitucional" element={<ReclamacaoConstitucionalService />} />
          <Route path="/servicos/liberdade-expressao" element={<LiberdadeExpressaoService />} />
          <Route path="/servicos/igualdade-nao-discriminacao" element={<IgualdadeNaoDiscriminacaoService />} />
          <Route path="/servicos/direitos-sociais" element={<DireitosSociaisService />} />
          <Route path="/servicos/direitos-minorias" element={<DireitosMinoriasService />} />
          <Route path="/servicos/analise-constitucionalidade" element={<AnaliseConstitucionalidadeService />} />
          <Route path="/servicos/pareceres-tecnicos" element={<PareceresTecnicosService />} />
          <Route path="/servicos/assessoria-politicas-publicas" element={<AssessoriaPoliticasPublicasService />} />
          <Route path="/servicos/atuacao-stf" element={<AtuacaoSTFService />} />
          <Route path="/servicos/atuacao-stj" element={<AtuacaoSTJService />} />
          <Route path="/servicos/projetos-lei" element={<ProjetosLeiService />} />
          <Route path="/servicos/emendas-parlamentares" element={<EmendasParlamentaresService />} />
          <Route path="/servicos/lobby-legislativo" element={<LobbyLegislativoService />} />
          <Route path="/servicos/monitoramento-legislativo" element={<MonitoramentoLegislativoService />} />

          {/* Administrativo Services */}
          <Route path="/servicos/licitacoes-contratos" element={<LicitacoesContratosService />} />
          <Route path="/servicos/processos-administrativos" element={<ProcessosAdministrativosService />} />
          <Route path="/servicos/assessoria-licitacoes" element={<AssessoriaLicitacoesService />} />
          <Route path="/servicos/defesa-licitacoes" element={<DefesaLicitacoesService />} />
          <Route path="/servicos/gestao-contratos-publicos" element={<GestaoContratosPublicosService />} />
          <Route path="/servicos/pad-sindicancia" element={<PADSindicanciaService />} />
          <Route path="/servicos/responsabilidade-estado" element={<ResponsabilidadeEstadoService />} />
          <Route path="/servicos/direitos-servidores" element={<DireitosServidoresService />} />
          <Route path="/servicos/desapropriacao" element={<DesapropriacaoService />} />
          <Route path="/servicos/atos-administrativos" element={<AtosAdministrativosService />} />
          <Route path="/servicos/improbidade-administrativa" element={<ImprobidadeAdministrativaService />} />
          <Route path="/servicos/regulacao-fiscalizacao" element={<RegulacaoFiscalizacaoService />} />
          <Route path="/servicos/direito-ambiental-administrativo" element={<DireitoAmbientalAdministrativoService />} />
          <Route path="/servicos/direito-urbanistico" element={<DireitoUrbanisticoService />} />
          <Route path="/servicos/infraestrutura-projetos" element={<InfraestruturaProjetos />} />
          <Route path="/servicos/consultoria-administrativo" element={<ConsultoriaAdministrativoService />} />
          <Route path="/servicos/tribunais-contas" element={<TribunaisContasService />} />

          {/* Previdenciário Services */}
          <Route path="/servicos/beneficios-previdenciarios" element={<BeneficiosPrevidenciariosService />} />
          <Route path="/servicos/aposentadoria-idade" element={<AposentadoriaIdadeService />} />
          <Route path="/servicos/auxilio-doenca" element={<AuxilioDoencaService />} />
          <Route path="/servicos/aposentadoria-tempo-contribuicao" element={<AposentadoriaTempoContribuicaoService />} />
          <Route path="/servicos/aposentadoria-invalidez" element={<AposentadoriaInvalidezService />} />
          <Route path="/servicos/aposentadoria-especial" element={<AposentadoriaEspecialService />} />
          <Route path="/servicos/pensao-morte" element={<PensaoMorteService />} />
          <Route path="/servicos/salario-maternidade" element={<SalarioMaternidadeService />} />
          <Route path="/servicos/auxilio-acidente" element={<AuxilioAcidenteService />} />
          <Route path="/servicos/bpc-loas" element={<BPCService />} />
          <Route path="/servicos/revisao-vida-toda" element={<RevisaoVidaTodaService />} />
          <Route path="/servicos/planejamento-previdenciario" element={<PlanejamentoPrevidenciarioService />} />

          {/* Consumidor Services */}
          <Route path="/servicos/direitos-consumidor" element={<DireitosConsumidorService />} />
          <Route path="/servicos/praticas-abusivas" element={<PraticasAbusivasService />} />
          <Route path="/servicos/publicidade-enganosa" element={<PublicidadeEnganosaService />} />
          <Route path="/servicos/responsabilidade-produtos" element={<ResponsabilidadeProdutosService />} />
          <Route path="/servicos/recalls-seguranca" element={<RecallsSegurancaService />} />
          <Route path="/servicos/contratos-consumo" element={<ContratosConsumoService />} />
          <Route path="/servicos/indenizacao-danos" element={<IndenizacaoDanosService />} />
          <Route path="/servicos/defesa-coletiva" element={<DefesaColetivaService />} />
          
          <Route path="/obrigado" element={<ObrigadoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
