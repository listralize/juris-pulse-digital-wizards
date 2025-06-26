
import React from 'react';
import SectionsContainer from '../components/SectionsContainer';
import Footer from '../components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SectionsContainer />
      <Footer showOnMobile={true} />
    </div>
  );
};

export default Index;
