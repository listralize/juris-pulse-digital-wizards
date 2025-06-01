
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import Index from './pages/Index';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';
import BlogAutomation from './pages/BlogAutomation';

// Importar TODAS as páginas de áreas de direito
import Familia from './pages/areas/Familia';
import Consumidor from './pages/areas/Consumidor';
import Constitucional from './pages/areas/Constitucional';
import Tributario from './pages/areas/Tributario';
import Trabalho from './pages/areas/Trabalho';
import Previdenciario from './pages/areas/Previdenciario';
import Empresarial from './pages/areas/Empresarial';
import Civil from './pages/areas/Civil';
import Administrativo from './pages/areas/Administrativo';

// Importar algumas páginas de serviços
import DivorceService from './pages/services/DivorceService';
import GuardaFilhosService from './pages/services/GuardaFilhosService';
import AdocaoService from './pages/services/AdocaoService';
import AcoesImprobidadeCivilService from './pages/services/AcoesImprobidadeCivilService';
import AcordosColetivosService from './pages/services/AcordosColetivosService';
import AnaliseConstitucionalidadeService from './pages/services/AnaliseConstitucionalidadeService';
import AcoesOriginariasSuperioresService from './pages/services/AcoesOriginariasSuperioresService';
import AposentadoriaEspecialService from './pages/services/AposentadoriaEspecialService';
import ADIADCADPFService from './pages/services/ADIADCADPFService';
import AposentadoriaTempoContribuicaoService from './pages/services/AposentadoriaTempoContribuicaoService';
import AposentadoriaInvalidezService from './pages/services/AposentadoriaInvalidezService';
import ADCService from './pages/services/ADCService';
import AposentadoriaIdadeService from './pages/services/AposentadoriaIdadeService';
import ADOService from './pages/services/ADOService';
import ADPFService from './pages/services/ADPFService';
import ADIService from './pages/services/ADIService';
import AdicionaisInsalubridadeService from './pages/services/AdicionaisInsalubridadeService';
import AcidentesDoencasService from './pages/services/AcidentesDoencasService';
import AssedioMoralSexualService from './pages/services/AssedioMoralSexualService';
import AcoesInconstitucionalidadeService from './pages/services/AcoesInconstitucionalidadeService';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            {/* CustomCursor agora funciona em TODAS as páginas */}
            <CustomCursor />
            <WhatsAppButton />
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
              <Route path="/dashboard" element={<Admin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/automation" element={<BlogAutomation />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Rotas das áreas de direito - TODAS as áreas */}
              <Route path="/familia" element={<Familia />} />
              <Route path="/areas/familia" element={<Familia />} />
              <Route path="/consumidor" element={<Consumidor />} />
              <Route path="/areas/consumidor" element={<Consumidor />} />
              <Route path="/constitucional" element={<Constitucional />} />
              <Route path="/areas/constitucional" element={<Constitucional />} />
              <Route path="/tributario" element={<Tributario />} />
              <Route path="/areas/tributario" element={<Tributario />} />
              <Route path="/trabalho" element={<Trabalho />} />
              <Route path="/areas/trabalho" element={<Trabalho />} />
              <Route path="/previdenciario" element={<Previdenciario />} />
              <Route path="/areas/previdenciario" element={<Previdenciario />} />
              <Route path="/empresarial" element={<Empresarial />} />
              <Route path="/areas/empresarial" element={<Empresarial />} />
              <Route path="/civil" element={<Civil />} />
              <Route path="/areas/civil" element={<Civil />} />
              <Route path="/administrativo" element={<Administrativo />} />
              <Route path="/areas/administrativo" element={<Administrativo />} />
              
              {/* Rotas dos serviços */}
              <Route path="/servicos/divorcio" element={<DivorceService />} />
              <Route path="/servicos/divorcio-separacao" element={<DivorceService />} />
              <Route path="/servicos/guarda-filhos" element={<GuardaFilhosService />} />
              <Route path="/servicos/adocao" element={<AdocaoService />} />
              <Route path="/servicos/acoes-improbidade-civil" element={<AcoesImprobidadeCivilService />} />
              <Route path="/servicos/acordos-coletivos" element={<AcordosColetivosService />} />
              <Route path="/servicos/analise-constitucionalidade" element={<AnaliseConstitucionalidadeService />} />
              <Route path="/servicos/acoes-originarias-superiores" element={<AcoesOriginariasSuperioresService />} />
              <Route path="/servicos/aposentadoria-especial" element={<AposentadoriaEspecialService />} />
              <Route path="/servicos/adi-adc-adpf" element={<ADIADCADPFService />} />
              <Route path="/servicos/aposentadoria-tempo-contribuicao" element={<AposentadoriaTempoContribuicaoService />} />
              <Route path="/servicos/aposentadoria-invalidez" element={<AposentadoriaInvalidezService />} />
              <Route path="/servicos/adc" element={<ADCService />} />
              <Route path="/servicos/aposentadoria-idade" element={<AposentadoriaIdadeService />} />
              <Route path="/servicos/ado" element={<ADOService />} />
              <Route path="/servicos/adpf" element={<ADPFService />} />
              <Route path="/servicos/adi" element={<ADIService />} />
              <Route path="/servicos/adicionais-insalubridade" element={<AdicionaisInsalubridadeService />} />
              <Route path="/servicos/acidentes-doencas" element={<AcidentesDoencasService />} />
              <Route path="/servicos/assedio-moral-sexual" element={<AssedioMoralSexualService />} />
              <Route path="/servicos/acoes-inconstitucionalidade" element={<AcoesInconstitucionalidadeService />} />
            </Routes>
            
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
