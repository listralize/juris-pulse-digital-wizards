
import { useState, useEffect } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  oab: string;
  email: string;
  image: string;
  description: string;
}

export interface PageTexts {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactSubtitle: string;
}

export const useAdminData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pageTexts, setPageTexts] = useState<PageTexts>({
    heroTitle: 'Excelência jurídica que transforma desafios em vitórias',
    heroSubtitle: 'Soluções jurídicas estratégicas com foco em resultados excepcionais',
    aboutTitle: 'Sobre Nós',
    aboutDescription: 'Somos um escritório de advocacia moderno e inovador...',
    contactTitle: 'Precisa de ajuda jurídica?',
    contactSubtitle: 'Entre em contato para uma consulta personalizada'
  });

  useEffect(() => {
    // Carregar dados da equipe
    const savedTeam = localStorage.getItem('adminTeamMembers');
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      // Dados padrão da equipe
      setTeamMembers([
        {
          id: 'trombela',
          name: 'Dr. Enzo Trombela',
          title: 'Advogado Sócio',
          oab: 'OAB/GO: 67.754 | OAB/SP: 521.263',
          email: 'trombela@stadv.com',
          image: '/lovable-uploads/dbdc43db-9dcc-4838-8f80-8298be65169a.png',
          description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Civil e Processo Civil pelo Instituto Goiano de Direito. Vice-Presidente Jovem da Comissão Especial de Direito Processual Civil (CEDPC) – Triênio 2025/2027 – OAB/GO. Presidente Científico da Força da Advocacia. Ex-Coordenador da Comissão da Advocacia Jovem (CAJ) da OAB/GO. Sócio fundador do escritório Serafim & Trombela Advogados. Atuação em direito privado, especialmente em demandas cíveis, empresariais e contratuais.'
        },
        {
          id: 'serafim',
          name: 'Dr. Vinicius Serafim',
          title: 'Advogado Sócio',
          oab: 'OAB/GO: 67.790',
          email: 'serafim@stadv.com',
          image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png',
          description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
        },
        {
          id: 'lanzana',
          name: 'Dr. João Victor Lanzana',
          title: 'Advogado Associado',
          oab: 'OAB/GO: 71.163',
          email: 'lanzana@stadv.com',
          image: '/lovable-uploads/d11e57cf-ddb3-4377-9caf-91e75503165b.png',
          description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Penal e Processo Penal pelo Gran Centro Universitário. Atuação em direito privado, especialmente em demandas cíveis, imobiliárias e do consumidor.'
        },
        {
          id: 'rafaella',
          name: 'Dra. Rafaella Alves Da Silva',
          title: 'Advogada Associada',
          oab: 'OAB/GO: 72.342',
          email: 'rafaella@stadv.com',
          image: '/lovable-uploads/7dbb1fd3-c3ce-4f91-a88d-95a969448804.png',
          description: 'Graduada pelo Centro Universitário de Goiás (UniGoiás). Advogada Associada do escritório Serafim & Trombela Advogados. Departamento Comercial.'
        }
      ]);
    }

    // Carregar textos das páginas
    const savedTexts = localStorage.getItem('adminPageTexts');
    if (savedTexts) {
      setPageTexts(JSON.parse(savedTexts));
    }
  }, []);

  return { teamMembers, pageTexts };
};
