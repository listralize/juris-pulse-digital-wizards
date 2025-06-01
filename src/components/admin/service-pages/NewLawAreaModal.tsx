
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { useTheme } from '../../ThemeProvider';

interface NewLawAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (area: { id: string; title: string; description: string; color: string }) => void;
}

const colorOptions = [
  'bg-pink-500',
  'bg-green-500', 
  'bg-blue-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-yellow-500',
  'bg-gray-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-emerald-500'
];

export const NewLawAreaModal: React.FC<NewLawAreaModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

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
      description: description.trim(),
      color: selectedColor
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedColor(colorOptions[0]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Nova Área do Direito
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className={`${isDark ? 'text-white' : 'text-black'}`}>
              Nome da Área
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Direito Digital"
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
              placeholder="Descrição da área de atuação..."
              rows={3}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          
          <div>
            <Label className={`${isDark ? 'text-white' : 'text-black'}`}>
              Cor do Card
            </Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Criar Área
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
