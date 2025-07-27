import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Users, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Lead {
  id: string;
  lead_data: any;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  title: string;
  content: string;
  logo_url?: string;
  background_color?: string;
  text_color?: string;
  button_color?: string;
  custom_html?: string;
  button_text?: string;
  button_url?: string;
  secondary_button_text?: string;
  secondary_button_url?: string;
  show_secondary_button?: boolean;
}

interface BulkEmailSenderProps {
  selectedLeads: Set<string>;
  leads: Lead[];
  emailTemplates: EmailTemplate[];
  onEmailsSent: () => void;
}

const parseLeadData = (leadData: any) => {
  try {
    if (typeof leadData === 'string') {
      leadData = JSON.parse(leadData);
    }
    
    return {
      name: leadData?.name || leadData?.nome || '',
      email: leadData?.email || '',
      phone: leadData?.phone || leadData?.telefone || '',
      service: leadData?.service || leadData?.servico || '',
      message: leadData?.message || leadData?.mensagem || '',
      urgent: leadData?.urgent || leadData?.urgente || false,
      ...leadData
    };
  } catch (error) {
    console.error('Erro ao parsear lead_data:', error);
    return {};
  }
};

export const BulkEmailSender: React.FC<BulkEmailSenderProps> = ({
  selectedLeads,
  leads,
  emailTemplates,
  onEmailsSent
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState({ sent: 0, total: 0 });

  const selectedLeadsList = leads.filter(lead => selectedLeads.has(lead.id));
  const validLeads = selectedLeadsList.filter(lead => {
    const leadData = parseLeadData(lead.lead_data);
    return leadData.email && leadData.email.includes('@');
  });

  const sendBulkEmails = async () => {
    if (!selectedTemplate) {
      toast.error('Selecione um template de email');
      return;
    }

    if (validLeads.length === 0) {
      toast.error('Nenhum lead selecionado possui email válido');
      return;
    }

    const confirmation = confirm(`Deseja enviar emails para ${validLeads.length} leads selecionados usando o template "${selectedTemplate.name}"?`);
    if (!confirmation) return;

    setIsSending(true);
    setProgress({ sent: 0, total: validLeads.length });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < validLeads.length; i++) {
      const lead = validLeads[i];
      
      try {
        const leadData = parseLeadData(lead.lead_data);
        
        console.log(`📧 Enviando email ${i + 1}/${validLeads.length} para:`, leadData.email);

        // Buscar template completo do banco de dados para ter todas as configurações
        const { data: fullTemplate } = await supabase
          .from('email_templates')
          .select('*')
          .eq('id', selectedTemplate.id)
          .single();

        const templateToUse = fullTemplate || selectedTemplate;

        const { data, error } = await supabase.functions.invoke('send-smtp-email', {
          body: {
            to: leadData.email,
            subject: templateToUse.subject
              .replace('{name}', leadData.name || 'Cliente')
              .replace('{service}', leadData.service || 'Consultoria Jurídica'),
            name: leadData.name || 'Cliente',
            service: leadData.service || 'Consultoria Jurídica',
            message: leadData.message || '',
            customTitle: templateToUse.title
              .replace('{name}', leadData.name || 'Cliente')
              .replace('{service}', leadData.service || 'Consultoria Jurídica'),
            customContent: templateToUse.content
              .replace('{name}', leadData.name || 'Cliente')
              .replace('{service}', leadData.service || 'nossos serviços')
              .replace('{message}', leadData.message || ''),
            logoUrl: templateToUse.logo_url,
            backgroundColor: templateToUse.background_color,
            textColor: templateToUse.text_color,
            buttonColor: templateToUse.button_color,
            customHtml: templateToUse.custom_html,
            buttonText: templateToUse.button_text,
            buttonUrl: templateToUse.button_url,
            secondaryButtonText: templateToUse.secondary_button_text,
            secondaryButtonUrl: templateToUse.secondary_button_url,
            showSecondaryButton: templateToUse.show_secondary_button
          }
        });

        if (error) {
          console.error(`❌ Erro ao enviar email para ${leadData.email}:`, error);
          errorCount++;
        } else {
          console.log(`✅ Email enviado para ${leadData.email}`);
          successCount++;
        }

        setProgress({ sent: i + 1, total: validLeads.length });
        
        // Delay entre emails para evitar spam
        if (i < validLeads.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error(`❌ Erro geral ao enviar email:`, error);
        errorCount++;
      }
    }

    setIsSending(false);
    
    if (successCount > 0) {
      toast.success(`✅ ${successCount} emails enviados com sucesso!`);
    }
    
    if (errorCount > 0) {
      toast.error(`❌ ${errorCount} emails falharam`);
    }

    setIsOpen(false);
    onEmailsSent();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          size="sm"
          disabled={selectedLeads.size === 0}
        >
          <Send className="h-4 w-4 mr-2" />
          Envio em Massa ({selectedLeads.size})
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Envio de Email em Massa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Total Selecionados
              </div>
              <div className="text-lg font-bold">{selectedLeads.size}</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                <Send className="h-4 w-4" />
                Emails Válidos
              </div>
              <div className="text-lg font-bold text-green-700">{validLeads.length}</div>
            </div>
          </div>

          {/* Seleção de template */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Template de Email:</label>
            <Select
              value={selectedTemplate?.id || ''}
              onValueChange={(value) => {
                const template = emailTemplates.find(t => t.id === value);
                setSelectedTemplate(template || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um template" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <span>{template.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {template.subject}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview do template selecionado */}
          {selectedTemplate && (
            <div className="p-3 bg-muted/30 rounded-lg space-y-1">
              <div className="text-sm font-medium">Preview do Template:</div>
              <div className="text-xs text-muted-foreground">
                <strong>Título:</strong> {selectedTemplate.title}
              </div>
              <div className="text-xs text-muted-foreground">
                <strong>Assunto:</strong> {selectedTemplate.subject}
              </div>
              <div className="text-xs text-muted-foreground">
                <strong>Conteúdo:</strong> {selectedTemplate.content.substring(0, 100)}...
              </div>
            </div>
          )}

          {/* Progress durante envio */}
          {isSending && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                <span className="text-sm">Enviando emails...</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.sent / progress.total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-center text-muted-foreground">
                {progress.sent} de {progress.total} emails enviados
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isSending}
            >
              Cancelar
            </Button>
            
            <Button
              className="flex-1"
              onClick={sendBulkEmails}
              disabled={!selectedTemplate || validLeads.length === 0 || isSending}
            >
              {isSending ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Emails
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};