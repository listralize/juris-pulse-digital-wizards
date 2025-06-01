
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Save } from 'lucide-react';
import { PageTexts } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

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
      {/* Seção Hero */}
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

      {/* Seção Sobre */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Seção Sobre Nós
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título da Seção</Label>
            <Input
              value={pageTexts.aboutTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, aboutTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea
              value={pageTexts.aboutDescription}
              onChange={(e) => onUpdatePageTexts({...pageTexts, aboutDescription: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Seção Área do Cliente */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Área do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título da Seção</Label>
            <Input
              value={pageTexts.clientAreaTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea
              value={pageTexts.clientAreaDescription}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaDescription: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              rows={3}
            />
          </div>
          <div>
            <Label>URL da Imagem do Cliente</Label>
            <Input
              value={pageTexts.clientAreaImage || '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaImage: e.target.value})}
              placeholder="URL da imagem"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Link do Botão Principal</Label>
            <Input
              value={pageTexts.clientAreaMainButtonLink || '#'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaMainButtonLink: e.target.value})}
              placeholder="URL do botão principal"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Texto do Botão Principal</Label>
            <Input
              value={pageTexts.clientAreaMainButtonText || 'Acessar minha área'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaMainButtonText: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Link do Botão WhatsApp</Label>
            <Input
              value={pageTexts.clientAreaWhatsAppLink || 'https://api.whatsapp.com/send?phone=5562994594496'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaWhatsAppLink: e.target.value})}
              placeholder="URL do WhatsApp"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Texto do Botão WhatsApp</Label>
            <Input
              value={pageTexts.clientAreaWhatsAppText || 'Primeiro acesso via WhatsApp'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaWhatsAppText: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Seção Equipe */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Nossa Equipe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título da Seção</Label>
            <Input
              value={pageTexts.teamTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, teamTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Seção Contato */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título da Seção</Label>
            <Input
              value={pageTexts.contactTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, contactTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Input
              value={pageTexts.contactSubtitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, contactSubtitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSave} className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Salvar Todas as Alterações
        </Button>
      </div>
    </div>
  );
};
