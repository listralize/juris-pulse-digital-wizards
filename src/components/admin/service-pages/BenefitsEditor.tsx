
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage, Benefit } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { logger } from '@/utils/logger';

interface BenefitsEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const BenefitsEditor: React.FC<BenefitsEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const benefits = Array.isArray(page.benefits) ? page.benefits : [];

  const addBenefit = () => {
    logger.log('➕ Adicionando novo benefício');
    const newBenefit: Benefit = { 
      title: 'Novo Benefício', 
      description: 'Descrição do benefício', 
      icon: '⚖️' 
    };
    const updatedBenefits = [...benefits, newBenefit];
    logger.log('📝 Benefícios atualizados:', updatedBenefits);
    onUpdatePage(page.id, 'benefits', updatedBenefits);
  };

  const removeBenefit = (index: number) => {
    logger.log('🗑️ Removendo benefício:', index);
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    onUpdatePage(page.id, 'benefits', updatedBenefits);
  };

  const updateBenefit = (index: number, field: keyof Benefit, value: string) => {
    logger.log('✏️ Atualizando benefício:', index, field, value);
    const updatedBenefits = benefits.map((benefit, i) => 
      i === index ? { ...benefit, [field]: value } : benefit
    );
    onUpdatePage(page.id, 'benefits', updatedBenefits);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Benefícios ({benefits.length})
        </h3>
        <Button onClick={addBenefit} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={`benefit-${index}`} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Benefício {index + 1}</span>
              <Button onClick={() => removeBenefit(index)} size="sm" variant="destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">Título</Label>
                <Input
                  value={benefit.title || ''}
                  onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Ícone</Label>
                <Input
                  value={benefit.icon || ''}
                  onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                  placeholder="Ex: ⚖️"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Descrição</Label>
                <Textarea
                  value={benefit.description || ''}
                  onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                  rows={2}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
        {benefits.length === 0 && (
          <div className="text-center py-4">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhum benefício adicionado ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};