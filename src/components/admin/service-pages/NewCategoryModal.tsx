
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { useTheme } from '../../ThemeProvider';

interface NewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: { id: string; title: string; description: string }) => void;
}

export const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    
    const id = title.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    onSave({
      id,
      title: title.trim(),
      description: description.trim()
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Nova Categoria de Serviço
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className={`${isDark ? 'text-white' : 'text-black'}`}>
              Nome da Categoria
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Contratos Digitais"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          
          <div>
            <Label className={`${isDark ? 'text-white' : 'text-black'}`}>
              Descrição
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição dos serviços desta categoria..."
              rows={3}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Criar Categoria
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
