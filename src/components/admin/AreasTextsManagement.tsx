
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Save } from 'lucide-react';
import { PageTexts } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

interface AreasTextsManagementProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
  onSave: () => void;
}

export const AreasTextsManagement: React.FC<AreasTextsManagementProps> = ({
  pageTexts,
  onUpdatePageTexts,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Textos das Áreas de Atuação
          </CardTitle>
          <Button onClick={onSave} size="sm" variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Direito de Família */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito de Família</Label>
              <Input
                value={pageTexts.familiaTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, familiaTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito de Família</Label>
              <Input
                value={pageTexts.familiaDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, familiaDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito Tributário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito Tributário</Label>
              <Input
                value={pageTexts.tributarioTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, tributarioTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito Tributário</Label>
              <Input
                value={pageTexts.tributarioDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, tributarioDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito Empresarial */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito Empresarial</Label>
              <Input
                value={pageTexts.empresarialTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, empresarialTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito Empresarial</Label>
              <Input
                value={pageTexts.empresarialDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, empresarialDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito do Trabalho */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito do Trabalho</Label>
              <Input
                value={pageTexts.trabalhoTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, trabalhoTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito do Trabalho</Label>
              <Input
                value={pageTexts.trabalhoDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, trabalhoDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito Constitucional */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito Constitucional</Label>
              <Input
                value={pageTexts.constitucionalTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, constitucionalTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito Constitucional</Label>
              <Input
                value={pageTexts.constitucionalDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, constitucionalDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito Administrativo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito Administrativo</Label>
              <Input
                value={pageTexts.administrativoTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, administrativoTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito Administrativo</Label>
              <Input
                value={pageTexts.administrativoDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, administrativoDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito Previdenciário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito Previdenciário</Label>
              <Input
                value={pageTexts.previdenciarioTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, previdenciarioTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito Previdenciário</Label>
              <Input
                value={pageTexts.previdenciarioDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, previdenciarioDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito do Consumidor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito do Consumidor</Label>
              <Input
                value={pageTexts.consumidorTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, consumidorTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito do Consumidor</Label>
              <Input
                value={pageTexts.consumidorDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, consumidorDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>

          {/* Direito Civil */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título - Direito Civil</Label>
              <Input
                value={pageTexts.civilTitle}
                onChange={(e) => onUpdatePageTexts({...pageTexts, civilTitle: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Descrição - Direito Civil</Label>
              <Input
                value={pageTexts.civilDescription}
                onChange={(e) => onUpdatePageTexts({...pageTexts, civilDescription: e.target.value})}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
