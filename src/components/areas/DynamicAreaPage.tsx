
import React from 'react';
import { useTheme } from '../ThemeProvider';
import Navbar from '../navbar';
import PageBanner from '../PageBanner';
import WhatsAppButton from '../WhatsAppButton';
import Footer from '../sections/Footer';
import CtaSection from '../serviceLanding/CtaSection';

interface DynamicAreaPageProps {
  areaKey: string;
  title: string;
  description: string;
  icon?: string;
  introText?: string[];
}

export const DynamicAreaPage: React.FC<DynamicAreaPageProps> = ({
  areaKey,
  title,
  description,
  icon = '⚖️',
  introText = []
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <Navbar />
      
      <PageBanner 
        title={title}
        subtitle={description}
        bgImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      />
      
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Conteúdo Principal */}
          <div className="mb-12">
            {introText.length > 0 ? (
              <div className="prose prose-lg max-w-none">
                {introText.map((paragraph, index) => (
                  <p key={index} className={`mb-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {description}
              </p>
            )}
          </div>

          {/* Ícone e Título da Área */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${
              isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
            }`}>
              {icon}
            </div>
            <h2 className={`text-2xl xl:text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              Serviços Especializados em {title}
            </h2>
          </div>
          
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Nossa equipe oferece assessoria completa e especializada em {title.toLowerCase()}, 
            com soluções jurídicas estratégicas para proteger seus direitos e interesses.
          </p>
        </div>
      </section>
      
      <CtaSection serviceArea={title} respectTheme={true} />
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};
