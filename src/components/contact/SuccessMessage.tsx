
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
    <div className={`h-full flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm ${
      isDark ? 'bg-gray-900/70 shadow-lg border border-gray-800' : 'bg-white/70 shadow-lg border border-gray-100'
    }`}>
      <div className={`w-16 h-16 mb-6 rounded-full flex items-center justify-center ${
        isDark ? 'bg-green-900/50' : 'bg-green-50'
      }`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className={`text-2xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>Mensagem Enviada!</h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi mb-6`}>
        Obrigado pelo contato. Retornaremos em breve.
      </p>
      <button
        onClick={handleClick}
        className={`elegant-button ${
          isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Enviar nova mensagem
      </button>
    </div>
  );
};

export default SuccessMessage;
