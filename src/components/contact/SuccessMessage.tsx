
import React from 'react';
import { useTheme } from '../ThemeProvider';

interface SuccessMessageProps {
  onNewMessage: () => void;
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onNewMessage, onReset }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleClick = () => {
    onNewMessage && onNewMessage();
    onReset && onReset();
  };

  return (
    <div className={`h-full flex flex-col items-center justify-center text-center p-6 backdrop-blur-xl ${
      isDark ? 'glass-form text-white' : 'bg-white/70 border border-gray-100 text-black'
    } shadow-lg rounded-lg`}>
      <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center ${
        isDark ? 'bg-white/20' : 'bg-green-50'
      }`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDark ? 'text-white' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className={`text-lg md:text-xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Mensagem Enviada!</h3>
      <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-700'} font-satoshi mb-4`}>
        Obrigado pelo contato. Retornaremos em breve.
      </p>
      <button
        onClick={handleClick}
        className={`elegant-button text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Enviar nova mensagem
      </button>
    </div>
  );
};

export default SuccessMessage;
