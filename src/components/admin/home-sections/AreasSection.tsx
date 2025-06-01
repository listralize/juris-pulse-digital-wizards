
import React from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts, categories } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface AreasSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const AreasSection: React.FC<AreasSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Áreas de Atuação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Título da Seção</Label>
          <Input
            value={pageTexts.areasTitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, areasTitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        
        {categories.map((category) => (
          <Card key={category.value} className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : 'text-black'}`}>
                {category.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Título</Label>
                <Input
                  value={pageTexts[`${category.value}Title` as keyof PageTexts] as string || ''}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, [`${category.value}Title`]: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={pageTexts[`${category.value}Description` as keyof PageTexts] as string || ''}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, [`${category.value}Description`]: e.target.value})}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  rows={3}
                />
              </div>
              <div>
                <Label>URL da Imagem</Label>
                <Input
                  value={pageTexts[`${category.value}Image` as keyof PageTexts] as string || ''}
                  onChange={(e) => onUpdatePageTexts({...pageTexts, [`${category.value}Image`]: e.target.value})}
                  placeholder="URL da imagem da área"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
