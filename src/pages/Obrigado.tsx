import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, MessageCircle, Clock } from 'lucide-react';
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

const ObrigadoPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchParams] = useSearchParams();
  const urgencia = searchParams.get('urgencia');
  const urgencyInfo = getUrgencyMessage(urgencia);

  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-center ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    } p-4`}>
      <div className="max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className={isDark ? 'text-white' : 'text-green-600'} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-canela mb-4">
          Obrigado por entrar em contato!
        </h1>
        
        <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Recebemos sua mensagem e entraremos em contato o mais rápido possível.
        </p>

        {/* Urgency-based message */}
        <div className={`flex items-center justify-center gap-2 text-base mb-8 font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
          <Clock className="w-5 h-5" />
          <span>{urgencyInfo.icon} {urgencyInfo.text}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => { window.location.href = WHATSAPP_URL; }}
            className="px-6 py-6 text-base bg-green-500 hover:bg-green-600 text-white transition-all"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Falar no WhatsApp agora
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className={`px-6 py-6 text-base ${isDark 
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
