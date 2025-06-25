
import React, { useEffect } from 'react';
import Navbar from './navbar';
import PageBanner from './PageBanner';
import WhatsAppButton from './WhatsAppButton';
import FloatingFooter from './FloatingFooter';
import { useTheme } from './ThemeProvider';
import CtaSection from './serviceLanding/CtaSection';
import NeuralBackground from './NeuralBackground';

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
    <div 
      className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'} relative`} 
      style={{ paddingBottom: '140px' }}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>
      
      <Navbar />
      
      <PageBanner 
        title={title}
        subtitle={description}
        bgImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      />
      
      <section className={`px-4 md:px-8 lg:px-16 py-8 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'} flex justify-center relative z-10`}>
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            {children}
          </div>
        </div>
      </section>
      
      {currentArea && <CtaSection serviceArea={title} respectTheme={true} />}
      
      <WhatsAppButton />
      <FloatingFooter />
    </div>
  );
};

export default PracticeAreaLayout;
