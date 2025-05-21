
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Instagram } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../components/ThemeProvider';

const ObrigadoPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
        
        <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Recebemos sua mensagem e entraremos em contato o mais rápido possível.
          Enquanto isso, você pode nos seguir no Instagram para acompanhar nossos conteúdos.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.open('https://www.instagram.com/serafimtrombela/', '_blank')}
            className={`px-6 py-6 text-base ${
              isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
            } transition-all`}
          >
            <Instagram className="mr-2 h-4 w-4" />
            Seguir no Instagram
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
