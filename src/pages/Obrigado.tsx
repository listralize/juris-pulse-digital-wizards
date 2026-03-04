import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, MessageCircle, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../components/ThemeProvider';
import { supabase } from '../integrations/supabase/client';

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
 * Fires Google Ads / GTM conversion events on the thank-you page.
 * This is the most reliable conversion signal because it fires AFTER
 * the lead has been saved — no dependency on form submission timing.
 *
 * If google_ads_conversion_id and google_ads_conversion_label are configured
 * in marketing_settings, a direct gtag('event', 'conversion') call is made
 * with the correct send_to value, bypassing GTM entirely.
 */
const fireConversionEvents = (params: {
  nome?: string | null;
  servico?: string | null;
  urgencia?: string | null;
  formSlug?: string | null;
  gadsConversionId?: string | null;
  gadsConversionLabel?: string | null;
}) => {
  const dl = (window as any).dataLayer;
  if (Array.isArray(dl)) {
    dl.push({
      event: 'conversion',
      event_category: 'lead',
      event_action: 'obrigado_page_view',
      event_label: params.servico || 'contato',
      customer_name: params.nome || '',
      form_slug: params.formSlug || '',
      urgency: params.urgencia || '',
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    });
    dl.push({
      event: 'generate_lead',
      currency: 'BRL',
      value: 1,
      lead_source: params.formSlug || 'website',
    });
  }

  if (typeof (window as any).gtag === 'function') {
    // GA4 recommended event
    (window as any).gtag('event', 'generate_lead', { currency: 'BRL', value: 1 });

    // Direct Google Ads conversion event (bypasses GTM, most reliable)
    if (params.gadsConversionId && params.gadsConversionLabel) {
      (window as any).gtag('event', 'conversion', {
        send_to: `${params.gadsConversionId}/${params.gadsConversionLabel}`,
        value: 1.0,
        currency: 'BRL',
      });
    }
  }
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
    // Fetch Google Ads conversion config from marketing_settings, then fire events
    supabase
      .from('marketing_settings')
      .select('google_ads_conversion_id, google_ads_conversion_label')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        fireConversionEvents({
          nome,
          servico,
          urgencia,
          formSlug,
          gadsConversionId: (data as any)?.google_ads_conversion_id || null,
          gadsConversionLabel: (data as any)?.google_ads_conversion_label || null,
        });
      })
      .catch(() => {
        // Fallback: fire without Google Ads direct conversion
        fireConversionEvents({ nome, servico, urgencia, formSlug });
      });
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
