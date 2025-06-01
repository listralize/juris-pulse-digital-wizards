
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface BenefitsEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const BenefitsEditor: React.FC<BenefitsEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const addBenefit = () => {
    const newBenefit = { title: '', description: '', icon: '' };
    onUpdatePage(page.id, 'benefits', [...page.benefits, newBenefit]);
  };

  const removeBenefit = (index: number) => {
    onUpdatePage(page.id, 'benefits', page.benefits.filter((_, i) => i !== index));
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const updatedBenefits = page.benefits.map((benefit, i) => 
      i === index ? { ...benefit, [field]: value } : benefit
    );
    onUpdatePage(page.id, 'benefits', updatedBenefits);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Benefícios ({page.benefits.length})
        </h3>
        <Button onClick={addBenefit} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-3">
        {page.benefits.map((benefit, index) => (
          <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
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
                  value={benefit.title}
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
                  value={benefit.description}
                  onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                  rows={2}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
