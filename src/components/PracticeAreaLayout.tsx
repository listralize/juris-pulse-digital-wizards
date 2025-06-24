
import React, { useEffect } from 'react';
import Navbar from './navbar';
import PageBanner from './PageBanner';
import WhatsAppButton from './WhatsAppButton';
import Footer from './sections/Footer';
import { useTheme } from './ThemeProvider';
import CtaSection from './serviceLanding/CtaSection';

interface PracticeAreaLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  currentArea?: string;
}

const PracticeAreaLayout: React.FC<PracticeAreaLayoutProps> = ({ 
  title, 
  description, 
  children,
  currentArea = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Add scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
          {children}
        </div>
      </section>
      
      {currentArea && <CtaSection serviceArea={title} respectTheme={true} />}
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};

export default PracticeAreaLayout;
