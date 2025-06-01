
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Save, Trash2, Briefcase } from 'lucide-react';
import { SpecializedService, categories } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

interface ServicesManagementProps {
  specializedServices: SpecializedService[];
  onAddSpecializedService: () => void;
  onRemoveSpecializedService: (id: string) => void;
  onUpdateSpecializedService: (id: string, field: keyof SpecializedService, value: string) => void;
  onSave: () => void;
}

export const ServicesManagement: React.FC<ServicesManagementProps> = ({
  specializedServices,
  onAddSpecializedService,
  onRemoveSpecializedService,
  onUpdateSpecializedService,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Briefcase className="w-5 h-5" />
            Serviços Especializados ({specializedServices.length} serviços)
          </CardTitle>
          <div className="space-x-2">
            <Button onClick={onAddSpecializedService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
            <Button onClick={onSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {specializedServices.map((service) => (
          <div key={service.id} className={`p-6 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                {service.title || 'Novo Serviço'}
              </h3>
              <Button 
                onClick={() => onRemoveSpecializedService(service.id)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Título do Serviço</Label>
                <Input
                  value={service.title}
                  onChange={(e) => onUpdateSpecializedService(service.id, 'title', e.target.value)}
                  placeholder="Ex: Divórcio Consensual"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Categoria</Label>
                <Select 
                  value={service.category} 
                  onValueChange={(value) => onUpdateSpecializedService(service.id, 'category', value)}
                >
                  <SelectTrigger className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Link do Serviço</Label>
                <Input
                  value={service.href}
                  onChange={(e) => onUpdateSpecializedService(service.id, 'href', e.target.value)}
                  placeholder="Ex: /services/divorcio"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) => onUpdateSpecializedService(service.id, 'description', e.target.value)}
                  placeholder="Descreva o serviço oferecido..."
                  rows={3}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
