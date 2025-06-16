
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

interface FormFieldsManagerProps {
  formFields: FormField[];
  onUpdateFormFields: (fields: FormField[]) => void;
}

export const FormFieldsManager: React.FC<FormFieldsManagerProps> = ({
  formFields,
  onUpdateFormFields
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const addCustomField = () => {
    const newField: FormField = {
      id: `custom_${Date.now()}`,
      name: `campo_${formFields.filter(f => !f.isDefault).length + 1}`,
      label: 'Novo Campo',
      type: 'text',
      required: false,
      placeholder: '',
      order: formFields.length,
      isDefault: false
    };
    onUpdateFormFields([...formFields, newField]);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    const updatedFields = formFields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onUpdateFormFields(updatedFields);
  };

  const removeField = (fieldId: string) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    if (field.isDefault) {
      // Para campos padrão, não remover mas desabilitar
      const updatedFields = formFields.map(f => 
        f.id === fieldId ? { ...f, required: false } : f
      );
      onUpdateFormFields(updatedFields);
    } else {
      // Para campos personalizados, remover completamente
      const updatedFields = formFields.filter(f => f.id !== fieldId);
      // Reordenar os campos restantes
      const reorderedFields = updatedFields.map((field, index) => ({
        ...field,
        order: index
      }));
      onUpdateFormFields(reorderedFields);
    }
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const fieldIndex = formFields.findIndex(f => f.id === fieldId);
    if (fieldIndex === -1) return;

    if (
      (direction === 'up' && fieldIndex === 0) ||
      (direction === 'down' && fieldIndex === formFields.length - 1)
    ) {
      return;
    }

    const updatedFields = [...formFields];
    const targetIndex = direction === 'up' ? fieldIndex - 1 : fieldIndex + 1;
    [updatedFields[fieldIndex], updatedFields[targetIndex]] = [updatedFields[targetIndex], updatedFields[fieldIndex]];
    
    // Atualiza a ordem
    updatedFields.forEach((field, i) => {
      field.order = i;
    });
    
    onUpdateFormFields(updatedFields);
  };

  const addSelectOption = (fieldId: string) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    const newOptions = [
      ...(field.options || []),
      { value: `opcao_${(field.options?.length || 0) + 1}`, label: 'Nova Opção' }
    ];
    updateField(fieldId, { options: newOptions });
  };

  const updateSelectOption = (fieldId: string, optionIndex: number, updates: { value?: string; label?: string }) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    const updatedOptions = [...(field.options || [])];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], ...updates };
    updateField(fieldId, { options: updatedOptions });
  };

  const removeSelectOption = (fieldId: string, optionIndex: number) => {
    const field = formFields.find(f => f.id === fieldId);
    if (!field) return;

    const updatedOptions = field.options?.filter((_, i) => i !== optionIndex) || [];
    updateField(fieldId, { options: updatedOptions });
  };

  // Ordena os campos pela propriedade order
  const sortedFields = [...formFields].sort((a, b) => a.order - b.order);

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            📋 Gestão Completa dos Campos
          </CardTitle>
          <Button onClick={addCustomField} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Campo
          </Button>
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Gerencie todos os campos do formulário - padrão e personalizados
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedFields.map((field, index) => (
          <Card key={field.id} className={`p-4 ${isDark ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                    {field.isDefault ? '🔒' : '📝'} {field.label}
                  </h4>
                  {field.isDefault && (
                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                      Campo Padrão
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => moveField(field.id, 'up')}
                    disabled={index === 0}
                    size="sm"
                    variant="outline"
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => moveField(field.id, 'down')}
                    disabled={index === sortedFields.length - 1}
                    size="sm"
                    variant="outline"
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeField(field.id)}
                    size="sm"
                    variant="destructive"
                    title={field.isDefault ? 'Desabilitar campo padrão' : 'Deletar campo personalizado'}
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
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    placeholder="nome_do_campo"
                    disabled={field.isDefault}
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'} ${
                      field.isDefault ? 'opacity-60' : ''
                    }`}
                  />
                </div>
                <div>
                  <Label>Rótulo Exibido</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    placeholder="Rótulo do campo"
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
                <div>
                  <Label>Tipo do Campo</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value: any) => updateField(field.id, { type: value })}
                    disabled={field.isDefault}
                  >
                    <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'} ${
                      field.isDefault ? 'opacity-60' : ''
                    }`}>
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
                  <Label>Placeholder</Label>
                  <Input
                    value={field.placeholder || ''}
                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                    placeholder="Texto de ajuda"
                    className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`required-${field.id}`}
                  checked={field.required}
                  onCheckedChange={(checked) => updateField(field.id, { required: checked as boolean })}
                />
                <Label htmlFor={`required-${field.id}`}>Campo obrigatório</Label>
              </div>

              {field.type === 'select' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Opções de Seleção</Label>
                    <Button
                      onClick={() => addSelectOption(field.id)}
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
                        onChange={(e) => updateSelectOption(field.id, optionIndex, { value: e.target.value })}
                        className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                      <Input
                        placeholder="Texto exibido"
                        value={option.label}
                        onChange={(e) => updateSelectOption(field.id, optionIndex, { label: e.target.value })}
                        className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                      />
                      <Button
                        onClick={() => removeSelectOption(field.id, optionIndex)}
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

        {formFields.filter(f => !f.isDefault).length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Apenas campos padrão estão configurados.</p>
            <p>Clique em "Adicionar Campo" para criar campos personalizados.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
