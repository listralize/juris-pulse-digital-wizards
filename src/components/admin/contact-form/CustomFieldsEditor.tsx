
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { FormField } from '../../../types/contactFormTypes';

interface CustomFieldsEditorProps {
  customFields: FormField[];
  onUpdateCustomFields: (fields: FormField[]) => void;
}

export const CustomFieldsEditor: React.FC<CustomFieldsEditorProps> = ({
  customFields,
  onUpdateCustomFields
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const addCustomField = () => {
    const newField: FormField = {
      id: `custom_${Date.now()}`,
      name: `campo_${customFields.length + 1}`,
      label: 'Novo Campo',
      type: 'text',
      required: false,
      placeholder: '',
      order: customFields.length
    };
    onUpdateCustomFields([...customFields, newField]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const updatedFields = [...customFields];
    updatedFields[index] = { ...updatedFields[index], ...updates };
    onUpdateCustomFields(updatedFields);
  };

  const removeField = (index: number) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    onUpdateCustomFields(updatedFields);
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === customFields.length - 1)
    ) {
      return;
    }

    const updatedFields = [...customFields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [updatedFields[index], updatedFields[targetIndex]] = [updatedFields[targetIndex], updatedFields[index]];
    
    // Atualiza a ordem
    updatedFields.forEach((field, i) => {
      field.order = i;
    });
    
    onUpdateCustomFields(updatedFields);
  };

  const addSelectOption = (fieldIndex: number) => {
    const field = customFields[fieldIndex];
    const newOptions = [
      ...(field.options || []),
      { value: `opcao_${(field.options?.length || 0) + 1}`, label: 'Nova Opção' }
    ];
    updateField(fieldIndex, { options: newOptions });
  };

  const updateSelectOption = (fieldIndex: number, optionIndex: number, updates: { value?: string; label?: string }) => {
    const field = customFields[fieldIndex];
    const updatedOptions = [...(field.options || [])];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], ...updates };
    updateField(fieldIndex, { options: updatedOptions });
  };

  const removeSelectOption = (fieldIndex: number, optionIndex: number) => {
    const field = customFields[fieldIndex];
    const updatedOptions = field.options?.filter((_, i) => i !== optionIndex) || [];
    updateField(fieldIndex, { options: updatedOptions });
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            📝 Campos Personalizados
          </CardTitle>
          <Button onClick={addCustomField} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Campo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {customFields.map((field, index) => (
          <Card key={field.id} className={`p-4 ${isDark ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  Campo {index + 1}
                </h4>
                <div className="flex gap-2">
                  <Button
                    onClick={() => moveField(index, 'up')}
                    disabled={index === 0}
                    size="sm"
                    variant="outline"
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => moveField(index, 'down')}
                    disabled={index === customFields.length - 1}
                    size="sm"
                    variant="outline"
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeField(index)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome do Campo</Label>
                  <Input
                    value={field.name}
                    onChange={(e) => updateField(index, { name: e.target.value })}
                    placeholder="nome_do_campo"
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
                <div>
                  <Label>Rótulo Exibido</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                    placeholder="Rótulo do campo"
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
                <div>
                  <Label>Tipo do Campo</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value: any) => updateField(index, { type: value })}
                  >
                    <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="tel">Telefone</SelectItem>
                      <SelectItem value="textarea">Área de Texto</SelectItem>
                      <SelectItem value="select">Seleção</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Placeholder (opcional)</Label>
                  <Input
                    value={field.placeholder || ''}
                    onChange={(e) => updateField(index, { placeholder: e.target.value })}
                    placeholder="Texto de ajuda"
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`required-${field.id}`}
                  checked={field.required}
                  onCheckedChange={(checked) => updateField(index, { required: checked as boolean })}
                />
                <Label htmlFor={`required-${field.id}`}>Campo obrigatório</Label>
              </div>

              {field.type === 'select' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Opções de Seleção</Label>
                    <Button
                      onClick={() => addSelectOption(index)}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Opção
                    </Button>
                  </div>
                  {field.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-2 items-center">
                      <Input
                        placeholder="Valor"
                        value={option.value}
                        onChange={(e) => updateSelectOption(index, optionIndex, { value: e.target.value })}
                        className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                      <Input
                        placeholder="Texto exibido"
                        value={option.label}
                        onChange={(e) => updateSelectOption(index, optionIndex, { label: e.target.value })}
                        className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                      <Button
                        onClick={() => removeSelectOption(index, optionIndex)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}

        {customFields.length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Nenhum campo personalizado criado ainda.</p>
            <p>Clique em "Adicionar Campo" para criar seu primeiro campo customizado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
