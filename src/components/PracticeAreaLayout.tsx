
import React from 'react';
import Navbar from './Navbar';
import { Footer } from './sections';
import { Card, CardContent } from './ui/card';

interface PracticeAreaLayoutProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PracticeAreaLayout: React.FC<PracticeAreaLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-canela mb-2">{title}</h1>
            <div className="h-1 w-16 bg-black mx-auto mb-6"></div>
          </div>
          
          <Card className="mb-12 bg-black text-white shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed">{description}</p>
            </CardContent>
          </Card>
          
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PracticeAreaLayout;
