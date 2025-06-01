
import React from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts, FooterTexts } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface FooterSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const updateFooterTexts = (field: keyof FooterTexts, value: string) => {
    const footerTexts = pageTexts.footerTexts || {
      companyDescription: '',
      address: '',
      email: '',
      phone: '',
      whatsappUrl: '',
      whatsappText: '',
      schedule: '',
      copyrightText: ''
    };
    
    onUpdatePageTexts({
      ...pageTexts,
      footerTexts: {
        ...footerTexts,
        [field]: value
      }
    });
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Rodapé
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Descrição da Empresa</Label>
          <Textarea
            value={pageTexts.footerTexts?.companyDescription || ''}
            onChange={(e) => updateFooterTexts('companyDescription', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={3}
          />
        </div>
        <div>
          <Label>Endereço Completo</Label>
          <Textarea
            value={pageTexts.footerTexts?.address || ''}
            onChange={(e) => updateFooterTexts('address', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              value={pageTexts.footerTexts?.email || ''}
              onChange={(e) => updateFooterTexts('email', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input
              value={pageTexts.footerTexts?.phone || ''}
              onChange={(e) => updateFooterTexts('phone', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
        <div>
          <Label>URL do WhatsApp</Label>
          <Input
            value={pageTexts.footerTexts?.whatsappUrl || ''}
            onChange={(e) => updateFooterTexts('whatsappUrl', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Texto do Botão WhatsApp</Label>
          <Input
            value={pageTexts.footerTexts?.whatsappText || ''}
            onChange={(e) => updateFooterTexts('whatsappText', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Horários de Atendimento</Label>
          <Textarea
            value={pageTexts.footerTexts?.schedule || ''}
            onChange={(e) => updateFooterTexts('schedule', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={2}
          />
        </div>
        <div>
          <Label>Texto de Copyright</Label>
          <Input
            value={pageTexts.footerTexts?.copyrightText || ''}
            onChange={(e) => updateFooterTexts('copyrightText', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>URL Política de Privacidade</Label>
            <Input
              value={pageTexts.footerTexts?.privacyPolicyUrl || ''}
              onChange={(e) => updateFooterTexts('privacyPolicyUrl', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>URL Termos de Uso</Label>
            <Input
              value={pageTexts.footerTexts?.termsOfUseUrl || ''}
              onChange={(e) => updateFooterTexts('termsOfUseUrl', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
