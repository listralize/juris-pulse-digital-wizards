
import React from 'react';
import { Button } from '../ui/button';
import { Save } from 'lucide-react';
import { PageTexts } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';
import { HeroSection } from './home-sections/HeroSection';
import { AboutSection } from './home-sections/AboutSection';
import { ClientAreaSection } from './home-sections/ClientAreaSection';
import { TeamSection } from './home-sections/TeamSection';
import { AreasSection } from './home-sections/AreasSection';
import { ContactSection } from './home-sections/ContactSection';
import { FooterSection } from './home-sections/FooterSection';

interface HomeContentManagementProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
  onSave: () => void;
}

export const HomeContentManagement: React.FC<HomeContentManagementProps> = ({
  pageTexts,
  onUpdatePageTexts,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <HeroSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />
      <AboutSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />
      <ClientAreaSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />
      <TeamSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />
      <AreasSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />
      <ContactSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />
      <FooterSection pageTexts={pageTexts} onUpdatePageTexts={onUpdatePageTexts} />

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button onClick={onSave} className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Salvar Todas as Alterações
        </Button>
      </div>
    </div>
  );
};
