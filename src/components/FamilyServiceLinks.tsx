
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Card, CardContent } from './ui/card';

// Serviços do direito de família com seus respectivos caminhos
const familyServices = [
  {
    title: "Divórcio e Separação",
    description: "Orientação e representação em processos de divórcio e separação, buscando soluções amigáveis ou litigiosas.",
    path: "/servicos/divorcio-separacao"
  },
  {
    title: "Guarda de Filhos",
    description: "Assessoria em questões de guarda compartilhada, unilateral, direito de visitas e convivência parental.",
    path: "/servicos/guarda-filhos"
  },
  {
    title: "Pensão Alimentícia",
    description: "Atuação em ações de fixação, revisão e execução de pensão alimentícia para filhos e ex-cônjuges.",
    path: "/servicos/pensao-alimenticia"
  },
  {
    title: "Adoção",
    description: "Orientação e acompanhamento jurídico em processos de adoção, nacional ou internacional, e seus requisitos legais.",
    path: "/servicos/adocao"
  }
];

const FamilyServiceLinks = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
      {familyServices.map((service, index) => (
        <Link to={service.path} key={index}>
          <Card className={`h-full transition-all duration-300 hover:translate-y-[-5px] ${
            isDark ? 'bg-black/80 border-white/10 hover:bg-black/60' : 'bg-white/80 border-black/10 hover:bg-white/60'
          }`}>
            <CardContent className="p-6">
              <h3 className={`text-xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                {service.title}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {service.description}
              </p>
              <div className={`mt-4 text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                Saiba mais →
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FamilyServiceLinks;
