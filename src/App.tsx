import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { useDynamicServiceRoutes } from './components/DynamicServiceRoutes';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Obrigado from './pages/Obrigado';

// Practice Areas
import FamiliaPage from './pages/areas/Familia';
import TributarioPage from './pages/areas/Tributario';
import EmpresarialPage from './pages/areas/Empresarial';
import TrabalhoPage from './pages/areas/Trabalho';
import ConstitucionalPage from './pages/areas/Constitucional';
import AdministrativoPage from './pages/areas/Administrativo';
import PrevidenciarioPage from './pages/areas/Previdenciario';
import ConsumidorPage from './pages/areas/Consumidor';
import CivilPage from './pages/areas/Civil';

// Service Pages - Mantidas para compatibilidade
import ADIService from './pages/services/ADIService';
import ADCService from './pages/services/ADCService';
import ADPFService from './pages/services/ADPFService';
import ADOService from './pages/services/ADOService';
import ADIADCADPFService from './pages/services/ADIADCADPFService';
import HabeasCorpusService from './pages/services/HabeasCorpusService';
import HabeasDataService from './pages/services/HabeasDataService';
import MandadoSegurancaService from './pages/services/MandadoSegurancaService';
import MandadoInjuncaoService from './pages/services/MandadoInjuncaoService';
import ReclamacaoConstitucionalService from './pages/services/ReclamacaoConstitucionalService';
import AtuacaoSTFService from './pages/services/AtuacaoSTFService';
import AtuacaoSTJService from './pages/services/AtuacaoSTJService';
import RecursosExtraordinarioEspecialService from './pages/services/RecursosExtraordinarioEspecialService';
import AcoesOriginariasSuperioresService from './pages/services/AcoesOriginariasSuperioresService';
import ParecereConstituicionalidadeService from './pages/services/ParecereConstituicionalidadeService';
import AnaliseConstitucionalidadeService from './pages/services/AnaliseConstitucionalidadeService';
import DefesaDireitosFundamentaisCivilService from './pages/services/DefesaDireitosFundamentaisCivilService';
import LiberdadesConstitucionaisService from './pages/services/LiberdadesConstitucionaisService';
import DireitosFundamentaisService from './pages/services/DireitosFundamentaisService';
import IgualdadeNaoDiscriminacaoService from './pages/services/IgualdadeNaoDiscriminacaoService';
import LiberdadeExpressaoService from './pages/services/LiberdadeExpressaoService';
import DireitosMinoriasService from './pages/services/DireitosMinoriasService';
import DireitosSociaisService from './pages/services/DireitosSociaisService';
import MandadoInjuncaoAcaoPopularService from './pages/services/MandadoInjuncaoAcaoPopularService';
import ConsultoriaConstitucionalService from './pages/services/ConsultoriaConstitucionalService';
import AcoesInconstitucionalidadeService from './pages/services/AcoesInconstitucionalidadeService';
import HabeasCorpusDataCivilService from './pages/services/HabeasCorpusDataCivilService';
import MandadoSegurancaCivilService from './pages/services/MandadoSegurancaCivilService';
import PlanejamentoTributarioService from './pages/services/PlanejamentoTributarioService';
import ElisaoFiscalService from './pages/services/ElisaoFiscalService';
import ConsultoriaImpostosService from './pages/services/ConsultoriaImpostosService';
import ContenciosoTributarioService from './pages/services/ContenciosoTributarioService';
import RecuperacaoCreditosService from './pages/services/RecuperacaoCreditosService';
import ParcelamentoDebitosService from './pages/services/ParcelamentoDebitosService';
import AuditoriaTributariaService from './pages/services/AuditoriaTributariaService';
import ComplianceTributarioService from './pages/services/ComplianceTributarioService';
import AssessoriaTrabalhista from './pages/services/AssessoriaTrabalhista';
import ContenciosoTrabalhistaService from './pages/services/ContenciosoTrabalhistaService';
import DefesaTrabalhadaorService from './pages/services/DefesaTrabalhadaorService';
import DefesaJustaCausaService from './pages/services/DefesaJustaCausaService';
import ReconhecimentoVinculoService from './pages/services/ReconhecimentoVinculoService';
import HorasExtrasService from './pages/services/HorasExtrasService';
import AdicionaisInsalubridadeService from './pages/services/AdicionaisInsalubridadeService';
import DesvioFuncaoService from './pages/services/DesvioFuncaoService';
import VerbaRescissoriaService from './pages/services/VerbaRescissoriaService';
import AssedioMoralSexualService from './pages/services/AssedioMoralSexualService';
import AcidentesDoencasService from './pages/services/AcidentesDoencasService';
import DireitosGestanteService from './pages/services/DireitosGestanteService';
import SaudeSegurancaService from './pages/services/SaudeSegurancaService';
import AcordosColetivosService from './pages/services/AcordosColetivosService';
import ComplianceTrabalhistaService from './pages/services/ComplianceTrabalhistaService';
import ConsultoriaEmpresarialTrabalhistaService from './pages/services/ConsultoriaEmpresarialTrabalhistaService';
import ConstituicaoEmpresasService from './pages/services/ConstituicaoEmpresasService';
import ContratosEmpresariaisService from './pages/services/ContratosEmpresariaisService';
import FusoesAquisicoesService from './pages/services/FusoesAquisicoesService';
import ReestruturacaoSocietariaService from './pages/services/ReestruturacaoSocietariaService';
import GovernancaCorporativaService from './pages/services/GovernancaCorporativaService';
import ComplianceEmpresarialService from './pages/services/ComplianceEmpresarialService';
import ContenciosoEmpresarialService from './pages/services/ContenciosoEmpresarialService';
import PropriedadeIntelectualService from './pages/services/PropriedadeIntelectualService';
import RegulacaoFiscalizacaoService from './pages/services/RegulacaoFiscalizacaoService';
import AssessoriaMercadosReguladosService from './pages/services/AssessoriaMercadosReguladosService';
import InfraestruturaProjetos from './pages/services/InfraestruturaProjetos';
import EstruturacaoConcessoesPPPsService from './pages/services/EstruturacaoConcessoesPPPsService';
import ReequilibrioEconomicoFinanceiroService from './pages/services/ReequilibrioEconomicoFinanceiroService';
import LicitacoesContratosService from './pages/services/LicitacoesContratosService';
import AssessoriaLicitacoesService from './pages/services/AssessoriaLicitacoesService';
import AssessoriaCompletaLicitacoesService from './pages/services/AssessoriaCompletaLicitacoesService';
import DefesaLicitacoesService from './pages/services/DefesaLicitacoesService';
import GestaoContratosPublicosService from './pages/services/GestaoContratosPublicosService';
import GestaoContratosAdministrativosService from './pages/services/GestaoContratosAdministrativosService';
import ProcessosAdministrativosService from './pages/services/ProcessosAdministrativosService';
import PADSindicanciaService from './pages/services/PADSindicanciaService';
import DefesaPADCivilService from './pages/services/DefesaPADCivilService';
import AtosAdministrativosService from './pages/services/AtosAdministrativosService';
import ContestacaoAtosAdministrativosService from './pages/services/ContestacaoAtosAdministrativosService';
import ResponsabilidadeEstadoService from './pages/services/ResponsabilidadeEstadoService';
import ResponsabilidadeCivilEstadoService from './pages/services/ResponsabilidadeCivilEstadoService';
import ImprobidadeAdministrativaService from './pages/services/ImprobidadeAdministrativaService';
import DireitosServidoresService from './pages/services/DireitosServidoresService';
import AssessoriaConcursosPublicosService from './pages/services/AssessoriaConcursosPublicosService';
import DesapropriacaoService from './pages/services/DesapropriacaoService';
import DireitoUrbanisticoService from './pages/services/DireitoUrbanisticoService';
import DireitoAmbientalAdministrativoService from './pages/services/DireitoAmbientalAdministrativoService';
import LicenciamentosRegularizacaoService from './pages/services/LicenciamentosRegularizacaoService';
import DefesaProcessosAmbientaisService from './pages/services/DefesaProcessosAmbientaisService';
import TribunaisContasService from './pages/services/TribunaisContasService';
import ConsultoriaAdministrativoService from './pages/services/ConsultoriaAdministrativoService';
import ComplianceAdministrativoCivilService from './pages/services/ComplianceAdministrativoCivilService';
import ConsultoriaAdequacaoLegalService from './pages/services/ConsultoriaAdequacaoLegalService';
import AssessoriaPoliticasPublicasService from './pages/services/AssessoriaPoliticasPublicasService';
import AssessoriaProcessosLegislativosService from './pages/services/AssessoriaProcessosLegislativosService';
import ProjetosLeiService from './pages/services/ProjetosLeiService';
import EmendasParlamentaresService from './pages/services/EmendasParlamentaresService';
import MonitoramentoLegislativoService from './pages/services/MonitoramentoLegislativoService';
import LobbyLegislativoService from './pages/services/LobbyLegislativoService';
import PareceresTecnicosService from './pages/services/PareceresTecnicosService';
import AcoesImprobidadeCivilService from './pages/services/AcoesImprobidadeCivilService';
import BeneficiosPrevidenciariosService from './pages/services/BeneficiosPrevidenciariosService';
import AposentadoriaIdadeService from './pages/services/AposentadoriaIdadeService';
import AposentadoriaTempoContribuicaoService from './pages/services/AposentadoriaTempoContribuicaoService';
import AposentadoriaEspecialService from './pages/services/AposentadoriaEspecialService';
import AposentadoriaInvalidezService from './pages/services/AposentadoriaInvalidezService';
import AuxilioDoencaService from './pages/services/AuxilioDoencaService';
import AuxilioAcidenteService from './pages/services/AuxilioAcidenteService';
import SalarioMaternidadeService from './pages/services/SalarioMaternidadeService';
import BPCService from './pages/services/BPCService';
import PensaoMorteService from './pages/services/PensaoMorteService';
import RevisaoVidaTodaService from './pages/services/RevisaoVidaTodaService';
import PlanejamentoPrevidenciarioService from './pages/services/PlanejamentoPrevidenciarioService';
import ConsultoriaPrevidenciariaService from './pages/services/ConsultoriaPrevidenciariaService';
import DireitosConsumidorService from './pages/services/DireitosConsumidorService';
import ContratosConsumoService from './pages/services/ContratosConsumoService';
import PraticasAbusivasService from './pages/services/PraticasAbusivasService';
import PublicidadeEnganosaService from './pages/services/PublicidadeEnganosaService';
import ResponsabilidadeProdutosService from './pages/services/ResponsabilidadeProdutosService';
import RecallsSegurancaService from './pages/services/RecallsSegurancaService';
import DefesaColetivaService from './pages/services/DefesaColetivaService';
import IndenizacaoDanosService from './pages/services/IndenizacaoDanosService';
import DefesaDireitosProgressoesService from './pages/services/DefesaDireitosProgressoesService';
import CasamentoUniaoService from './pages/services/CasamentoUniaoService';
import DivorceService from './pages/services/DivorceService';
import GuardaFilhosService from './pages/services/GuardaFilhosService';
import PensaoAlimenticiaService from './pages/services/PensaoAlimenticiaService';
import AdocaoService from './pages/services/AdocaoService';
import ProtecaoMenoresService from './pages/services/ProtecaoMenoresService';
import InventarioPartilhaService from './pages/services/InventarioPartilhaService';
import TestamentosSucessoesService from './pages/services/TestamentosSucessoesService';
import RescisaoContratualService from './pages/services/RescisaoContratualService';

const queryClient = new QueryClient();

function AppRoutes() {
  const dynamicRoutes = useDynamicServiceRoutes();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/obrigado" element={<Obrigado />} />
      
      {/* Practice Areas */}
      <Route path="/areas/familia" element={<FamiliaPage />} />
      <Route path="/areas/tributario" element={<TributarioPage />} />
      <Route path="/areas/empresarial" element={<EmpresarialPage />} />
      <Route path="/areas/trabalho" element={<TrabalhoPage />} />
      <Route path="/areas/constitucional" element={<ConstitucionalPage />} />
      <Route path="/areas/administrativo" element={<AdministrativoPage />} />
      <Route path="/areas/previdenciario" element={<PrevidenciarioPage />} />
      <Route path="/areas/consumidor" element={<ConsumidorPage />} />
      <Route path="/areas/civil" element={<CivilPage />} />
      
      {/* Rotas dinâmicas para páginas criadas no admin */}
      {dynamicRoutes}
      
      {/* Service Pages estáticas - Mantidas para compatibilidade */}
      <Route path="/servicos/adi" element={<ADIService />} />
      <Route path="/servicos/adc" element={<ADCService />} />
      <Route path="/servicos/adpf" element={<ADPFService />} />
      <Route path="/servicos/ado" element={<ADOService />} />
      <Route path="/servicos/adi-adc-adpf" element={<ADIADCADPFService />} />
      <Route path="/servicos/habeas-corpus" element={<HabeasCorpusService />} />
      <Route path="/servicos/habeas-data" element={<HabeasDataService />} />
      <Route path="/servicos/mandado-seguranca" element={<MandadoSegurancaService />} />
      <Route path="/servicos/mandado-injuncao" element={<MandadoInjuncaoService />} />
      <Route path="/servicos/reclamacao-constitucional" element={<ReclamacaoConstitucionalService />} />
      <Route path="/servicos/atuacao-stf" element={<AtuacaoSTFService />} />
      <Route path="/servicos/atuacao-stj" element={<AtuacaoSTJService />} />
      <Route path="/servicos/recursos-extraordinario-especial" element={<RecursosExtraordinarioEspecialService />} />
      <Route path="/servicos/acoes-originarias-superiores" element={<AcoesOriginariasSuperioresService />} />
      <Route path="/servicos/parecer-constituicionalidade" element={<ParecereConstituicionalidadeService />} />
      <Route path="/servicos/analise-constitucionalidade" element={<AnaliseConstitucionalidadeService />} />
      <Route path="/servicos/defesa-direitos-fundamentais-civil" element={<DefesaDireitosFundamentaisCivilService />} />
      <Route path="/servicos/liberdades-constitucionais" element={<LiberdadesConstitucionaisService />} />
      <Route path="/servicos/direitos-fundamentais" element={<DireitosFundamentaisService />} />
      <Route path="/servicos/igualdade-nao-discriminacao" element={<IgualdadeNaoDiscriminacaoService />} />
      <Route path="/servicos/liberdade-expressao" element={<LiberdadeExpressaoService />} />
      <Route path="/servicos/direitos-minorias" element={<DireitosMinoriasService />} />
      <Route path="/servicos/direitos-sociais" element={<DireitosSociaisService />} />
      <Route path="/servicos/mandado-injuncao-acao-popular" element={<MandadoInjuncaoAcaoPopularService />} />
      <Route path="/servicos/consultoria-constitucional" element={<ConsultoriaConstitucionalService />} />
      <Route path="/servicos/acoes-inconstitucionalidade" element={<AcoesInconstitucionalidadeService />} />
      <Route path="/servicos/habeas-corpus-data-civil" element={<HabeasCorpusDataCivilService />} />
      <Route path="/servicos/mandado-seguranca-civil" element={<MandadoSegurancaCivilService />} />
      <Route path="/servicos/planejamento-tributario" element={<PlanejamentoTributarioService />} />
      <Route path="/servicos/elisao-fiscal" element={<ElisaoFiscalService />} />
      <Route path="/servicos/consultoria-impostos" element={<ConsultoriaImpostosService />} />
      <Route path="/servicos/contencioso-tributario" element={<ContenciosoTributarioService />} />
      <Route path="/servicos/recuperacao-creditos" element={<RecuperacaoCreditosService />} />
      <Route path="/servicos/parcelamento-debitos" element={<ParcelamentoDebitosService />} />
      <Route path="/servicos/auditoria-tributaria" element={<AuditoriaTributariaService />} />
      <Route path="/servicos/compliance-tributario" element={<ComplianceTributarioService />} />
      <Route path="/servicos/assessoria-trabalhista" element={<AssessoriaTrabalhista />} />
      <Route path="/servicos/contencioso-trabalhista" element={<ContenciosoTrabalhistaService />} />
      <Route path="/servicos/defesa-trabalhador" element={<DefesaTrabalhadaorService />} />
      <Route path="/servicos/defesa-justa-causa" element={<DefesaJustaCausaService />} />
      <Route path="/servicos/reconhecimento-vinculo" element={<ReconhecimentoVinculoService />} />
      <Route path="/servicos/horas-extras" element={<HorasExtrasService />} />
      <Route path="/servicos/adicionais-insalubridade" element={<AdicionaisInsalubridadeService />} />
      <Route path="/servicos/desvio-funcao" element={<DesvioFuncaoService />} />
      <Route path="/servicos/verba-rescissoria" element={<VerbaRescissoriaService />} />
      <Route path="/servicos/assedio-moral-sexual" element={<AssedioMoralSexualService />} />
      <Route path="/servicos/acidentes-doencas" element={<AcidentesDoencasService />} />
      <Route path="/servicos/direitos-gestante" element={<DireitosGestanteService />} />
      <Route path="/servicos/saude-seguranca" element={<SaudeSegurancaService />} />
      <Route path="/servicos/acordos-coletivos" element={<AcordosColetivosService />} />
      <Route path="/servicos/compliance-trabalhista" element={<ComplianceTrabalhistaService />} />
      <Route path="/servicos/consultoria-empresarial-trabalhista" element={<ConsultoriaEmpresarialTrabalhistaService />} />
      <Route path="/servicos/constituicao-empresas" element={<ConstituicaoEmpresasService />} />
      <Route path="/servicos/contratos-empresariais" element={<ContratosEmpresariaisService />} />
      <Route path="/servicos/fusoes-aquisicoes" element={<FusoesAquisicoesService />} />
      <Route path="/servicos/reestruturacao-societaria" element={<ReestruturacaoSocietariaService />} />
      <Route path="/servicos/governanca-corporativa" element={<GovernancaCorporativaService />} />
      <Route path="/servicos/compliance-empresarial" element={<ComplianceEmpresarialService />} />
      <Route path="/servicos/contencioso-empresarial" element={<ContenciosoEmpresarialService />} />
      <Route path="/servicos/propriedade-intelectual" element={<PropriedadeIntelectualService />} />
      <Route path="/servicos/regulacao-fiscalizacao" element={<RegulacaoFiscalizacaoService />} />
      <Route path="/servicos/assessoria-mercados-regulados" element={<AssessoriaMercadosReguladosService />} />
      <Route path="/servicos/infraestrutura-projetos" element={<InfraestruturaProjetos />} />
      <Route path="/servicos/estruturacao-concessoes-ppps" element={<EstruturacaoConcessoesPPPsService />} />
      <Route path="/servicos/reequilibrio-economico-financeiro" element={<ReequilibrioEconomicoFinanceiroService />} />
      <Route path="/servicos/licitacoes-contratos" element={<LicitacoesContratosService />} />
      <Route path="/servicos/assessoria-licitacoes" element={<AssessoriaLicitacoesService />} />
      <Route path="/servicos/assessoria-completa-licitacoes" element={<AssessoriaCompletaLicitacoesService />} />
      <Route path="/servicos/defesa-licitacoes" element={<DefesaLicitacoesService />} />
      <Route path="/servicos/gestao-contratos-publicos" element={<GestaoContratosPublicosService />} />
      <Route path="/servicos/gestao-contratos-administrativos" element={<GestaoContratosAdministrativosService />} />
      <Route path="/servicos/processos-administrativos" element={<ProcessosAdministrativosService />} />
      <Route path="/servicos/pad-sindicancia" element={<PADSindicanciaService />} />
      <Route path="/servicos/defesa-pad-civil" element={<DefesaPADCivilService />} />
      <Route path="/servicos/atos-administrativos" element={<AtosAdministrativosService />} />
      <Route path="/servicos/contestacao-atos-administrativos" element={<ContestacaoAtosAdministrativosService />} />
      <Route path="/servicos/responsabilidade-estado" element={<ResponsabilidadeEstadoService />} />
      <Route path="/servicos/responsabilidade-civil-estado" element={<ResponsabilidadeCivilEstadoService />} />
      <Route path="/servicos/improbidade-administrativa" element={<ImprobidadeAdministrativaService />} />
      <Route path="/servicos/direitos-servidores" element={<DireitosServidoresService />} />
      <Route path="/servicos/assessoria-concursos-publicos" element={<AssessoriaConcursosPublicosService />} />
      <Route path="/servicos/desapropriacao" element={<DesapropriacaoService />} />
      <Route path="/servicos/direito-urbanistico" element={<DireitoUrbanisticoService />} />
      <Route path="/servicos/direito-ambiental-administrativo" element={<DireitoAmbientalAdministrativoService />} />
      <Route path="/servicos/licenciamentos-regularizacao" element={<LicenciamentosRegularizacaoService />} />
      <Route path="/servicos/defesa-processos-ambientais" element={<DefesaProcessosAmbientaisService />} />
      <Route path="/servicos/tribunais-contas" element={<TribunaisContasService />} />
      <Route path="/servicos/consultoria-administrativo" element={<ConsultoriaAdministrativoService />} />
      <Route path="/servicos/compliance-administrativo-civil" element={<ComplianceAdministrativoCivilService />} />
      <Route path="/servicos/consultoria-adequacao-legal" element={<ConsultoriaAdequacaoLegalService />} />
      <Route path="/servicos/assessoria-politicas-publicas" element={<AssessoriaPoliticasPublicasService />} />
      <Route path="/servicos/assessoria-processos-legislativos" element={<AssessoriaProcessosLegislativosService />} />
      <Route path="/servicos/projetos-lei" element={<ProjetosLeiService />} />
      <Route path="/servicos/emendas-parlamentares" element={<EmendasParlamentaresService />} />
      <Route path="/servicos/monitoramento-legislativo" element={<MonitoramentoLegislativoService />} />
      <Route path="/servicos/lobby-legislativo" element={<LobbyLegislativoService />} />
      <Route path="/servicos/pareceres-tecnicos" element={<PareceresTecnicosService />} />
      <Route path="/servicos/acoes-improbidade-civil" element={<AcoesImprobidadeCivilService />} />
      <Route path="/servicos/beneficios-previdenciarios" element={<BeneficiosPrevidenciariosService />} />
      <Route path="/servicos/aposentadoria-idade" element={<AposentadoriaIdadeService />} />
      <Route path="/servicos/aposentadoria-tempo-contribuicao" element={<AposentadoriaTempoContribuicaoService />} />
      <Route path="/servicos/aposentadoria-especial" element={<AposentadoriaEspecialService />} />
      <Route path="/servicos/aposentadoria-invalidez" element={<AposentadoriaInvalidezService />} />
      <Route path="/servicos/auxilio-doenca" element={<AuxilioDoencaService />} />
      <Route path="/servicos/auxilio-acidente" element={<AuxilioAcidenteService />} />
      <Route path="/servicos/salario-maternidade" element={<SalarioMaternidadeService />} />
      <Route path="/servicos/bpc" element={<BPCService />} />
      <Route path="/servicos/pensao-morte" element={<PensaoMorteService />} />
      <Route path="/servicos/revisao-vida-toda" element={<RevisaoVidaTodaService />} />
      <Route path="/servicos/planejamento-previdenciario" element={<PlanejamentoPrevidenciarioService />} />
      <Route path="/servicos/consultoria-previdenciaria" element={<ConsultoriaPrevidenciariaService />} />
      <Route path="/servicos/direitos-consumidor" element={<DireitosConsumidorService />} />
      <Route path="/servicos/contratos-consumo" element={<ContratosConsumoService />} />
      <Route path="/servicos/praticas-abusivas" element={<PraticasAbusivasService />} />
      <Route path="/servicos/publicidade-enganosa" element={<PublicidadeEnganosaService />} />
      <Route path="/servicos/responsabilidade-produtos" element={<ResponsabilidadeProdutosService />} />
      <Route path="/servicos/recalls-seguranca" element={<RecallsSegurancaService />} />
      <Route path="/servicos/defesa-coletiva" element={<DefesaColetivaService />} />
      <Route path="/servicos/indenizacao-danos" element={<IndenizacaoDanosService />} />
      <Route path="/servicos/defesa-direitos-progressoes" element={<DefesaDireitosProgressoesService />} />
      <Route path="/servicos/casamento-uniao" element={<CasamentoUniaoService />} />
      <Route path="/servicos/uniao-estavel" element={<CasamentoUniaoService />} />
      <Route path="/servicos/divorcio" element={<DivorceService />} />
      <Route path="/servicos/guarda-filhos" element={<GuardaFilhosService />} />
      <Route path="/servicos/pensao-alimenticia" element={<PensaoAlimenticiaService />} />
      <Route path="/servicos/adocao" element={<AdocaoService />} />
      <Route path="/servicos/protecao-menores" element={<ProtecaoMenoresService />} />
      <Route path="/servicos/inventario-partilha" element={<InventarioPartilhaService />} />
      <Route path="/servicos/testamentos-sucessoes" element={<TestamentosSucessoesService />} />
      <Route path="/servicos/rescisao-contratual" element={<RescisaoContratualService />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
