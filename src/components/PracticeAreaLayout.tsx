
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './sections';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface PracticeAreaLayoutProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  currentArea: string;
}

const PracticeAreaLayout: React.FC<PracticeAreaLayoutProps> = ({ 
  title, 
  description, 
  children, 
  currentArea 
}) => {
  const practiceAreas = [
    { id: 'familia', label: 'Família', path: '/familia' },
    { id: 'tributario', label: 'Tributário', path: '/tributario' },
    { id: 'empresarial', label: 'Empresarial', path: '/empresarial' },
    { id: 'trabalho', label: 'Trabalho', path: '/trabalho' },
    { id: 'constitucional', label: 'Constitucional', path: '/constitucional' },
    { id: 'administrativo', label: 'Administrativo', path: '/administrativo' },
    { id: 'previdenciario', label: 'Previdenciário', path: '/previdenciario' },
    { id: 'consumidor', label: 'Consumidor', path: '/consumidor' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <Tabs defaultValue={currentArea} className="w-full">
            <TabsList className="h-12 bg-white rounded-lg p-1 flex justify-start overflow-x-auto w-full">
              {practiceAreas.map((area) => (
                <TabsTrigger 
                  key={area.id}
                  value={area.id}
                  className="px-4 py-2 whitespace-nowrap"
                  asChild
                >
                  <Link to={area.path}>
                    {area.label}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <main className="flex-grow py-16 px-4 pb-24">
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
