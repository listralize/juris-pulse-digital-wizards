
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

  const process = Array.isArray(page.process) ? page.process : [];

  const addProcessStep = () => {
    
    const newStep: ProcessStep = { 
      step: process.length + 1,
      title: `Etapa ${process.length + 1}`, 
      description: 'Descrição da etapa do processo' 
    };
    const updatedProcess = [...process, newStep];
    
    onUpdatePage(page.id, 'process', updatedProcess);
  };

  const removeProcessStep = (index: number) => {
    
    const updatedProcess = process.filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, step: i + 1 })); // Renumerar os steps
    onUpdatePage(page.id, 'process', updatedProcess);
  };

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string | number) => {
    
    const updatedProcess = process.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    );
    onUpdatePage(page.id, 'process', updatedProcess);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Processo ({process.length} etapas)
        </h3>
        <Button onClick={addProcessStep} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Etapa
        </Button>
      </div>
      <div className="space-y-3">
        {process.map((step, index) => (
          <div key={`process-${index}`} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Etapa {step.step || index + 1}</span>
              <Button onClick={() => removeProcessStep(index)} size="sm" variant="destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">Número da Etapa</Label>
                <Input
                  type="number"
                  value={step.step || index + 1}
                  onChange={(e) => updateProcessStep(index, 'step', parseInt(e.target.value) || index + 1)}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Título da Etapa</Label>
                <Input
                  value={step.title || ''}
                  onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                  placeholder="Ex: Consulta Inicial"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Descrição</Label>
                <Textarea
                  value={step.description || ''}
                  onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                  rows={2}
                  placeholder="Descreva o que acontece nesta etapa..."
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
        {process.length === 0 && (
          <div className="text-center py-4">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhuma etapa do processo adicionada ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
