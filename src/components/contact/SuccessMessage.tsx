
import React from 'react';

interface SuccessMessageProps {
  onNewMessage: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onNewMessage }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm bg-white/70 shadow-lg border border-gray-100">
      <div className="w-16 h-16 mb-6 rounded-full bg-green-50 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-canela mb-3">Mensagem Enviada!</h3>
      <p className="text-gray-700 font-satoshi mb-6">
        Obrigado pelo contato. Retornaremos em breve.
      </p>
      <button
        onClick={onNewMessage}
        className="elegant-button"
      >
        Enviar nova mensagem
      </button>
    </div>
  );
};

export default SuccessMessage;
