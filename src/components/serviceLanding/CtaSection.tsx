
import React from 'react';
import UnifiedContactForm from '../contact/UnifiedContactForm';
import { useTheme } from '../ThemeProvider';

interface CtaSectionProps {
  serviceArea: string;
  respectTheme?: boolean;
}

const CtaSection: React.FC<CtaSectionProps> = ({ serviceArea, respectTheme = false }) => {
  const { theme } = useTheme();
  const isDark = respectTheme ? theme === 'dark' : true; // Always dark if respectTheme is false
  
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
    <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-pattern ${isDark ? 'opacity-10' : 'opacity-5'}`}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Pronto para Resolver sua Situação?
          </h2>
          
          <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Nossa equipe de especialistas está pronta para ajudar você. Entre em contato agora e dê o primeiro passo para resolver seu caso.
          </p>
        </div>
        
        <UnifiedContactForm 
          preselectedService={getServiceSelection(serviceArea)}
          darkBackground={isDark}
        />
      </div>
    </section>
  );
};

export default CtaSection;
