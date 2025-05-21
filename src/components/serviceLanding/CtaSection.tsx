
import React from 'react';
import UnifiedContactForm from '../contact/UnifiedContactForm';

interface CtaSectionProps {
  serviceArea: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({ serviceArea }) => {
  // Helper function to determine the correct service selection
  const getServiceSelection = (area: string) => {
    const serviceMap: { [key: string]: string } = {
      'Direito da Família': 'familia',
      'Direito Tributário': 'tributario',
      'Direito Empresarial': 'empresarial',
      'Direito do Trabalho': 'trabalho',
      'Direito Constitucional': 'constitucional',
      'Direito Administrativo': 'administrativo',
      'Direito Previdenciário': 'previdenciario',
      'Direito do Consumidor': 'consumidor'
    };
    
    return serviceMap[area] || 'outro';
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-canela mb-6 text-white">
            Pronto para Resolver sua Situação?
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Nossa equipe de especialistas está pronta para ajudar você. Entre em contato agora e dê o primeiro passo para resolver seu caso.
          </p>
        </div>
        
        <UnifiedContactForm 
          preselectedService={getServiceSelection(serviceArea)}
          darkBackground={true}
        />
      </div>
    </section>
  );
};

export default CtaSection;
