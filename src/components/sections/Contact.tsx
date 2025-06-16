
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { UnifiedContactForm } from '../contact/UnifiedContactForm';
import { ContactInfo } from '../contact/ContactInfo';
import { PageTexts } from '../../types/adminTypes';

interface ContactProps {
  pageTexts: PageTexts;
}

const Contact: React.FC<ContactProps> = ({ pageTexts: initialPageTexts }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pageTexts, setPageTexts] = useState(initialPageTexts);

  // Escutar por atualizações dos pageTexts
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🎯 Contact: Recebendo atualização de pageTexts:', event.detail);
      setPageTexts(event.detail);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  // Atualizar quando props mudarem
  useEffect(() => {
    setPageTexts(initialPageTexts);
  }, [initialPageTexts]);

  const contactTitle = pageTexts?.contactTitle || 'Entre em Contato';
  const contactSubtitle = pageTexts?.contactSubtitle || 'Estamos prontos para ajudá-lo';

  return (
    <section className={`py-16 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {contactTitle}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <UnifiedContactForm />
          <ContactInfo pageTexts={pageTexts} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
