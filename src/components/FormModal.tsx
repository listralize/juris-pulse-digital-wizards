import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { FormConfig } from '@/types/contactFormTypes';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formConfig: FormConfig;
  title: string;
}

export function FormModal({ isOpen, onClose, formConfig, title }: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    const requiredFields = formConfig.allFields.filter(field => field.required && !(field as any).disabled);
    const missingFields = requiredFields.filter(field => !formData[field.name]);
    
    if (missingFields.length > 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (formConfig.webhookUrl) {
        const submissionData = {
          ...formData,
          formId: formConfig.id,
          timestamp: new Date().toISOString(),
          source: 'Link Tree Modal'
        };
        
        const response = await fetch(formConfig.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });

        if (response.ok) {
          toast.success(formConfig.formTexts.successMessage || 'Mensagem enviada com sucesso!');
        } else {
          throw new Error('Erro na resposta do webhook');
        }
      } else {
        console.log('Dados do formulário:', formData);
        toast.success(formConfig.formTexts.successMessage || 'Mensagem enviada com sucesso!');
      }
      
      onClose();
      setFormData({});
    } catch (error) {
      toast.error(formConfig.formTexts.errorMessage || 'Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const renderField = (field: any) => {
    if ((field as any).disabled) return null;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-gray-300">
              {field.label}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
              required={field.required}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-gray-300">
              {field.label}
            </Label>
            <Textarea
              id={field.id}
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
              required={field.required}
              rows={4}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-gray-300">
              {field.label}
            </Label>
            <Select
              value={formData[field.name] || ''}
              onValueChange={(value) => handleFieldChange(field.name, value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder={field.placeholder || 'Selecione uma opção'} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )) || formConfig.serviceOptions?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.name] || false}
              onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
            />
            <Label htmlFor={field.id} className="text-gray-300">
              {field.label}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  // Ordenar campos por order
  const sortedFields = [...formConfig.allFields].sort((a, b) => a.order - b.order);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            {title || formConfig.formTexts.headerTitle}
          </DialogTitle>
          <p className="text-gray-400 mt-2">
            {formConfig.formTexts.headerSubtitle}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {sortedFields.map(field => renderField(field))}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {formConfig.formTexts.submitButton}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}