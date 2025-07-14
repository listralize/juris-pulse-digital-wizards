import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: string;
  title: string;
}

export function FormModal({ isOpen, onClose, formType, title }: FormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormConfig = () => {
    switch (formType) {
      case 'contact':
        return {
          title: '📞 Formulário de Contato',
          description: 'Entre em contato conosco e responderemos o mais breve possível',
          icon: Mail,
          fields: ['name', 'email', 'phone', 'message']
        };
      case 'consultation':
        return {
          title: '👨‍⚖️ Solicitação de Consulta',
          description: 'Agende uma consulta jurídica personalizada',
          icon: MessageSquare,
          fields: ['name', 'email', 'phone', 'service', 'message', 'urgency']
        };
      case 'quote':
        return {
          title: '💰 Solicitar Orçamento',
          description: 'Solicite um orçamento personalizado para seu caso',
          icon: Phone,
          fields: ['name', 'email', 'phone', 'service', 'message']
        };
      default:
        return {
          title: '📝 Formulário',
          description: 'Preencha o formulário abaixo',
          icon: Mail,
          fields: ['name', 'email', 'message']
        };
    }
  };

  const config = getFormConfig();
  const IconComponent = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio para o backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Formulário enviado com sucesso! Em breve entraremos em contato.');
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: '',
        urgency: 'normal'
      });
    } catch (error) {
      toast.error('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Direito Civil',
    'Direito do Trabalho', 
    'Direito de Família',
    'Direito Previdenciário',
    'Direito Empresarial',
    'Direito Tributário',
    'Direito Constitucional',
    'Direito Administrativo',
    'Direito do Consumidor',
    'Outro'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <IconComponent className="w-6 h-6 text-purple-500" />
            {config.title}
          </DialogTitle>
          <p className="text-gray-400 text-sm">{config.description}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {config.fields.includes('name') && (
            <div>
              <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome completo"
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          )}

          {config.fields.includes('email') && (
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          )}

          {config.fields.includes('phone') && (
            <div>
              <Label htmlFor="phone" className="text-gray-300">Telefone/WhatsApp</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          )}

          {config.fields.includes('service') && (
            <div>
              <Label htmlFor="service" className="text-gray-300">Área do Direito</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione a área jurídica" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {config.fields.includes('urgency') && (
            <div>
              <Label htmlFor="urgency" className="text-gray-300">Urgência</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Baixa - Até 7 dias</SelectItem>
                  <SelectItem value="normal">🟡 Normal - Até 3 dias</SelectItem>
                  <SelectItem value="high">🟠 Alta - Até 24h</SelectItem>
                  <SelectItem value="urgent">🔴 Urgente - Hoje</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {config.fields.includes('message') && (
            <div>
              <Label htmlFor="message" className="text-gray-300">Mensagem</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Descreva seu caso ou dúvida..."
                rows={4}
                required
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          )}

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
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}