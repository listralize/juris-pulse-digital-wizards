
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../components/ThemeProvider';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=5562994594496&text=Quero%20saber%20mais%20sobre%20o%20div%C3%B3rcio';

const ObrigadoPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = WHATSAPP_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
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
          Obrigado por entrar em contato!
        </h1>
        
        <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Recebemos sua mensagem e entraremos em contato o mais rápido possível.
        </p>

        <p className={`text-base mb-8 font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
          Redirecionando para o WhatsApp em {countdown}...
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => { window.location.href = WHATSAPP_URL; }}
            className={`px-6 py-6 text-base bg-green-500 hover:bg-green-600 text-white transition-all`}
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
