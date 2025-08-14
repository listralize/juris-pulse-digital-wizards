
import React, { useEffect, useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDirectMarketingScripts } from './hooks/useDirectMarketingScripts';
import { supabase } from '@/integrations/supabase/client';

// Pages
import Index from './pages/Index';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Obrigado from './pages/Obrigado';
import LinkTree from './pages/LinkTree';
import NotFound from './pages/NotFound';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import TermosUso from './pages/TermosUso';
import EmbedForm from './pages/EmbedForm';
import StepForm from './pages/StepForm';

// Dynamic routes
import DynamicServiceRoutes from './components/DynamicServiceRoutes';
import DynamicCategoryRoutes from './components/areas/DynamicCategoryRoutes';

// Area pages (static fallbacks)
import Familia from './pages/areas/Familia';
import Tributario from './pages/areas/Tributario';
import Empresarial from './pages/areas/Empresarial';
import Trabalho from './pages/areas/Trabalho';
import Civil from './pages/areas/Civil';
import Previdenciario from './pages/areas/Previdenciario';
import Consumidor from './pages/areas/Consumidor';
import Constitucional from './pages/areas/Constitucional';
import Administrativo from './pages/areas/Administrativo';

const queryClient = new QueryClient();

function App() {
  // Carregar scripts de marketing globalmente
  useDirectMarketingScripts();
  
  // Estados para vídeo de fundo global
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState<string>('');
  const [videoEnabled, setVideoEnabled] = useState<boolean>(false);
  
  // Carregar configurações de vídeo de fundo
  useEffect(() => {
    const loadBackgroundVideo = async () => {
      try {
        const { data: settings } = await supabase
          .from('site_settings')
          .select('team_video_enabled, team_background_video')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          setVideoEnabled(settings.team_video_enabled || false);
          setBackgroundVideoUrl(settings.team_background_video || '');
          console.log('🎥 Vídeo de fundo global carregado:', settings);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar vídeo de fundo:', error);
      }
    };

    loadBackgroundVideo();
  }, []);
  
  // Adicionar verificação de scripts carregados
  useEffect(() => {
    console.log('🚀 App iniciado - verificando scripts de marketing...');
    
    // Verificar depois de um tempo se os scripts carregaram
    setTimeout(() => {
      console.log('📊 Status dos scripts:', {
        fbq: typeof (window as any).fbq,
        gtag: typeof (window as any).gtag,
        dataLayer: typeof (window as any).dataLayer,
        fbqExists: !!(window as any).fbq,
        gtagExists: !!(window as any).gtag,
        dataLayerExists: !!(window as any).dataLayer
      });
      
      // Testar Facebook Pixel
      if ((window as any).fbq) {
        console.log('✅ Facebook Pixel detectado e funcionando');
        // Disparar evento de teste
        (window as any).fbq('track', 'PageView');
        console.log('📊 Evento PageView teste enviado para Facebook Pixel');
      } else {
        console.warn('⚠️ Facebook Pixel não detectado');
      }
      
      // Testar GTM
      if ((window as any).dataLayer) {
        console.log('✅ Google Tag Manager detectado e funcionando');
        (window as any).dataLayer.push({
          event: 'app_loaded',
          page_location: window.location.href
        });
        console.log('📊 Evento app_loaded teste enviado para GTM');
      } else {
        console.warn('⚠️ Google Tag Manager não detectado');
      }
      
      // Testar GA
      if ((window as any).gtag) {
        console.log('✅ Google Analytics detectado e funcionando');
        (window as any).gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href
        });
        console.log('📊 Evento page_view teste enviado para GA');
      } else {
        console.warn('⚠️ Google Analytics não detectado');
      }
    }, 2000);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            {/* Vídeo de fundo global para TODA a aplicação */}
            {videoEnabled && backgroundVideoUrl && (
              <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -10 }}>
                <video
                  src={backgroundVideoUrl}
                  className="w-full h-full object-cover opacity-50"
                  autoPlay
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  controls={false}
                  style={{ 
                    minWidth: '100vw',
                    minHeight: '100vh',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                  onLoadStart={() => console.log('🎥 Vídeo de fundo global iniciando')}
                  onCanPlay={() => console.log('✅ Vídeo de fundo global reproduzindo')}
                  onError={(e) => console.error('❌ Erro no vídeo de fundo global:', e)}
                />
              </div>
            )}
            
            <div className="App relative z-0">
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/tree" element={<LinkTree />} />
                <Route path="/obrigado" element={<Obrigado />} />
                <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/termos-uso" element={<TermosUso />} />
                
                {/* Embed form route */}
                <Route path="/embed/form/:formId" element={<EmbedForm />} />
                
                {/* Step form route */}
                <Route path="/form/:slug" element={<StepForm />} />
                
                {/* Static area pages (fallbacks for existing URLs) */}
                <Route path="/areas/familia" element={<Familia />} />
                <Route path="/areas/tributario" element={<Tributario />} />
                <Route path="/areas/empresarial" element={<Empresarial />} />
                <Route path="/areas/trabalho" element={<Trabalho />} />
                <Route path="/areas/civil" element={<Civil />} />
                <Route path="/areas/previdenciario" element={<Previdenciario />} />
                <Route path="/areas/consumidor" element={<Consumidor />} />
                <Route path="/areas/constitucional" element={<Constitucional />} />
                <Route path="/areas/administrativo" element={<Administrativo />} />
                
                {/* Dynamic area pages - Para todas as categorias do Supabase */}
                <Route path="/areas/*" element={<DynamicCategoryRoutes />} />
                
                {/* Dynamic service pages */}
                <Route path="/services/*" element={<DynamicServiceRoutes />} />
                <Route path="/servicos/*" element={<DynamicServiceRoutes />} />
                
                {/* 404 fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
