
import React, { useEffect } from 'react';
import { useSupabaseDataNew } from '../hooks/useSupabaseDataNew';
import { Hero, About, PracticeAreas, Partners, ClientArea, Contact, Footer } from '../components/sections';
import Blog from '../components/sections/Blog';
import Navbar from '../components/navbar';
import Loading from '../components/Loading';
import WhatsAppButton from '../components/WhatsAppButton';
import Team from '../components/sections/Team';

const Index = () => {
  const { 
    teamMembers, 
    pageTexts, 
    isLoading,
    categories,
    servicePages
  } = useSupabaseDataNew();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero pageTexts={pageTexts} />
        <About pageTexts={pageTexts} />
        <PracticeAreas 
          pageTexts={pageTexts} 
          categories={categories || []}
          servicePages={servicePages || []}
        />
        <Team teamMembers={teamMembers || []} pageTexts={pageTexts} />
        <Blog />
        <ClientArea pageTexts={pageTexts} />
        <Contact pageTexts={pageTexts} />
      </main>
      <Footer pageTexts={pageTexts} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
