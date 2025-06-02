
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage, ProcessStep } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface ProcessEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const ProcessEditor: React.FC<ProcessEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const processSteps = page.process || [];

  const addProcess = () => {
    const nextStep = processSteps.length + 1;
    const newProcess: ProcessStep = { step: nextStep, title: '', description: '' };
    onUpdatePage(page.id, 'process', [...processSteps, newProcess]);
  };

  const removeProcess = (index: number) => {
    const updatedProcess = processSteps.filter((_, i) => i !== index).map((proc, i) => ({ ...proc, step: i + 1 }));
    onUpdatePage(page.id, 'process', updatedProcess);
  };

  const updateProcess = (index: number, field: keyof ProcessStep, value: string | number) => {
    const updatedProcess = processSteps.map((proc, i) => 
      i === index ? { ...proc, [field]: value } : proc
    );
    onUpdatePage(page.id, 'process', updatedProcess);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Processo ({processSteps.length} etapas)
        </h3>
        <Button onClick={addProcess} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-3">
        {processSteps.map((proc, index) => (
          <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Etapa {proc.step}</span>
              <Button onClick={() => removeProcess(index)} size="sm" variant="destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Título</Label>
                <Input
                  value={proc.title}
                  onChange={(e) => updateProcess(index, 'title', e.target.value)}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Descrição</Label>
                <Textarea
                  value={proc.description}
                  onChange={(e) => updateProcess(index, 'description', e.target.value)}
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
