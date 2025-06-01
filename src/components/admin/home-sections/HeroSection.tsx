
import React from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface HeroSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Seção Hero (Principal)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título Principal</Label>
          <Input
            value={pageTexts.heroTitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, heroTitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Textarea
            value={pageTexts.heroSubtitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, heroSubtitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};
