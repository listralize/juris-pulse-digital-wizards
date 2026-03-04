import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, MessageCircle, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../components/ThemeProvider';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=5562994594496&text=Quero%20saber%20mais%20sobre%20o%20div%C3%B3rcio';

const getUrgencyMessage = (urgencia: string | null) => {
  switch (urgencia) {
    case 'urgente':
      return { text: 'Você será contactado em instantes.', icon: '⚡' };
    case 'semanas':
      return { text: 'Entraremos em contato em até 24h.', icon: '📋' };
    case 'pesquisando':
      return { text: 'Enviaremos informações detalhadas por email em breve.', icon: '📧' };
    default:
      return { text: 'Um especialista entrará em contato com você em breve.', icon: '✅' };
  }
};

/**
 * Dispara eventos de conversão na página /obrigado.
 *
 * Estratégia:
 *  - O GTM e o gtag já foram carregados pelo useStepFormMarketingScripts
 *    quando o formulário foi preenchido (via custom_head_html injetado no DOM).
 *  - Aqui apenas empurramos um evento de confirmação no dataLayer para que
 *    qualquer tag GTM configurada para "obrigado_page_view" também dispare.
 *  - NÃO buscamos nada do banco — a conversão direta do Google Ads já foi
 *    disparada no momento do submit pelo useStepFormMarketingScripts.
 */
const fireObrigadoEvents = (params: {
  nome?: string | null;
  servico?: string | null;
  urgencia?: string | null;
  formSlug?: string | null;
}) => {
  // dataLayer push — capturado pelo GTM se estiver configurado
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: 'obrigado_page_view',
    event_category: 'lead',
    event_label: params.servico || 'contato',
    customer_name: params.nome || '',
    form_slug: params.formSlug || '',
    urgency: params.urgencia || '',
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
  });

  // Nota: gtag('event', 'conversion') para Google Ads é disparado no momento do submit
  // pelo useStepFormMarketingScripts quando google_ads_conversion_id está configurado.
  // Não disparamos nada adicional aqui para evitar dupla contagem.
};

const ObrigadoPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchParams] = useSearchParams();
  const urgencia = searchParams.get('urgencia');
  const nome = searchParams.get('nome');
  const servico = searchParams.get('servico');
  const formSlug = searchParams.get('form');
  const urgencyInfo = getUrgencyMessage(urgencia);

  useEffect(() => {
    fireObrigadoEvents({ nome, servico, urgencia, formSlug });
  }, []);

  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-center ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    } p-4`}>
      <div className="max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className={isDark ? 'text-white' : 'text-green-600'} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-canela mb-4">
          {nome ? `Obrigado, ${decodeURIComponent(nome)}!` : 'Obrigado por entrar em contato!'}
        </h1>
        
        <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Recebemos sua mensagem e entraremos em contato o mais rápido possível.
        </p>

        {/* Urgency-based message */}
        <div className={`flex items-center justify-center gap-2 text-base mb-4 font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
          <Clock className="w-5 h-5" />
          <span>{urgencyInfo.icon} {urgencyInfo.text}</span>
        </div>

        {/* Social proof */}
        <div className={`flex items-center justify-center gap-2 text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Users className="w-4 h-4" />
          <span>Mais de 1.000 pessoas já resolveram seu caso conosco</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => { window.location.href = WHATSAPP_URL; }}
            className="px-8 py-7 text-lg bg-green-500 hover:bg-green-600 text-white transition-all font-semibold"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar no WhatsApp agora
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className={`px-6 py-7 text-base ${isDark 
              ? 'border-white/20 text-white hover:bg-white/10' 
              : 'border-black/20 text-black hover:bg-black/10'} transition-all`}
          >
            Voltar ao início <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObrigadoPage;
