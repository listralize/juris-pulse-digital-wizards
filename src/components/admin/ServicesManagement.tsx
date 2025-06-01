
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { SpecializedService } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

interface ServicesManagementProps {
  services: SpecializedService[];
  onAddService: () => void;
  onRemoveService: (id: string) => void;
  onUpdateService: (id: string, field: keyof SpecializedService, value: string | boolean) => void;
  onSave: () => void;
}

export const ServicesManagement: React.FC<ServicesManagementProps> = ({
  services,
  onAddService,
  onRemoveService,
  onUpdateService,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Serviços Especializados
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={onAddService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Serviço
            </Button>
            <Button onClick={onSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service, index) => (
          <Card key={service.id} className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => onUpdateService(service.id, 'title', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        value={service.href}
                        onChange={(e) => onUpdateService(service.id, 'href', e.target.value)}
                        className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => onUpdateService(service.id, 'description', e.target.value)}
                      className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      rows={3}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => onRemoveService(service.id)}
                  size="sm"
                  variant="destructive"
                  className="ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
