import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, Calendar, Globe, ExternalLink, MessageSquare, Database } from 'lucide-react';
import { LeadComments } from './LeadComments';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  event_type: string;
  event_action: string;
  form_id?: string;
  form_name?: string;
  lead_data: any;
  page_url?: string;
  referrer?: string;
  created_at: string;
  session_id: string;
  visitor_id?: string;
}

interface LeadDetailDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (lead: Lead, templateId?: string) => void;
  emailTemplates: any[];
  selectedTemplate: any;
  setSelectedTemplate: (template: any) => void;
}

const parseLeadData = (leadData: any) => {
  try {
    let parsedData: any = {};
    
    // Se leadData for string, faz parse JSON
    if (typeof leadData === 'string') {
      parsedData = JSON.parse(leadData);
    } else if (leadData && typeof leadData === 'object') {
      parsedData = leadData;
    }

    // Extrair dados básicos com fallbacks mais robustos
    const result = {
      name: parsedData?.name || parsedData?.nome || parsedData?.full_name || parsedData?.first_name || '',
      email: parsedData?.email || parsedData?.e_mail || parsedData?.mail || '',
      phone: parsedData?.phone || parsedData?.telefone || parsedData?.tel || parsedData?.celular || '',
      service: parsedData?.service || parsedData?.servico || parsedData?.subject || parsedData?.assunto || 'Não especificado',
      message: parsedData?.message || parsedData?.mensagem || parsedData?.msg || parsedData?.description || parsedData?.observacoes || '',
      urgent: parsedData?.urgent || parsedData?.isUrgent || false,
      source: parsedData?.source || parsedData?.origem || '',
      timestamp: parsedData?.timestamp || parsedData?.webhook_timestamp || '',
      company: parsedData?.company || parsedData?.empresa || '',
      customFields: parsedData?.customFields || {},
      formConfig: parsedData?.formConfig || {},
      processing_method: parsedData?.processing_method || '',
      webhook_source: parsedData?.webhook_source || '',
      // Preservar todos os outros dados originais
      ...parsedData
    };

    // Se tem campos customizados, mesclar com o resultado
    if (parsedData?.customFields && typeof parsedData.customFields === 'object') {
      Object.keys(parsedData.customFields).forEach(key => {
        if (!result[key]) {
          result[key] = parsedData.customFields[key];
        }
      });
    }

    // Adicionar todos os campos que começam com letras minúsculas e não são objetos
    Object.keys(parsedData).forEach(key => {
      if (typeof parsedData[key] !== 'object' && parsedData[key] !== null && parsedData[key] !== undefined && parsedData[key] !== '') {
        if (!result[key]) {
          result[key] = parsedData[key];
        }
      }
    });

    return result;
  } catch (error) {
    console.error('Erro ao parsear lead_data:', error);
    return {};
  }
};

export const LeadDetailDialog: React.FC<LeadDetailDialogProps> = ({
  lead,
  isOpen,
  onClose,
  onSendEmail,
  emailTemplates,
  selectedTemplate,
  setSelectedTemplate
}) => {
  const { toast } = useToast();

  if (!lead) return null;

  const leadData = parseLeadData(lead.lead_data);
  const whatsappMessage = encodeURIComponent(
    `Olá ${leadData.name}, vi que você entrou em contato conosco através do site. Como posso ajudá-lo(a)?`
  );
  
  const phoneNumber = leadData.phone ? 
    leadData.phone.replace(/\D/g, '') : 
    '5562994594496';
  
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Lead</span>
            {leadData.urgent && (
              <Badge variant="destructive">Urgente</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Informações</TabsTrigger>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="technical">Dados Técnicos</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Informações do Lead */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{leadData.name || 'Nome não informado'}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{leadData.email || 'Email não informado'}</span>
                    </div>
                    {leadData.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{leadData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(lead.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  {leadData.service && (
                    <div className="pt-2 border-t">
                      <span className="text-xs font-medium text-muted-foreground">SERVIÇO</span>
                      <p className="text-sm mt-1">{leadData.service}</p>
                    </div>
                  )}

                  {leadData.source && (
                    <div className="pt-2 border-t">
                      <span className="text-xs font-medium text-muted-foreground">ORIGEM</span>
                      <p className="text-sm mt-1">{leadData.source}</p>
                    </div>
                  )}

                  {leadData.message && (
                    <div className="pt-2 border-t">
                      <span className="text-xs font-medium text-muted-foreground">MENSAGEM</span>
                      <p className="text-sm mt-1 p-2 bg-muted/30 rounded text-xs max-h-20 overflow-y-auto">
                        {leadData.message}
                      </p>
                    </div>
                  )}

                  {/* Campos customizados e extras */}
                  {Object.keys(leadData).filter(key => 
                    !['name', 'email', 'phone', 'service', 'message', 'source', 'urgent', 'isUrgent', 'customFields', 'formConfig', 'timestamp', 'webhook_timestamp', 'webhook_source', 'processing_method'].includes(key) &&
                    typeof leadData[key] !== 'object' &&
                    leadData[key] !== null &&
                    leadData[key] !== undefined &&
                    leadData[key] !== ''
                  ).length > 0 && (
                    <div className="pt-2 border-t">
                      <span className="text-xs font-medium text-muted-foreground">CAMPOS ADICIONAIS</span>
                      <div className="mt-1 space-y-1">
                        {Object.keys(leadData).filter(key => 
                          !['name', 'email', 'phone', 'service', 'message', 'source', 'urgent', 'isUrgent', 'customFields', 'formConfig', 'timestamp', 'webhook_timestamp', 'webhook_source', 'processing_method'].includes(key) &&
                          typeof leadData[key] !== 'object' &&
                          leadData[key] !== null &&
                          leadData[key] !== undefined &&
                          leadData[key] !== ''
                        ).map((key) => (
                          <div key={key} className="text-xs">
                            <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                            <span className="ml-1">{String(leadData[key])}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Campos customizados estruturados */}
                  {leadData.customFields && Object.keys(leadData.customFields).length > 0 && (
                    <div className="pt-2 border-t">
                      <span className="text-xs font-medium text-muted-foreground">CAMPOS CUSTOMIZADOS</span>
                      <div className="mt-1 space-y-1">
                        {Object.entries(leadData.customFields).map(([key, value]: [string, any]) => (
                          <div key={key} className="text-xs">
                            <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                            <span className="ml-1">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ações */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h4 className="font-medium">Ações Rápidas</h4>
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4 text-green-600" />
                        Contatar via WhatsApp
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        if (leadData.email) {
                          navigator.clipboard.writeText(leadData.email);
                          toast({ title: "Email copiado!" });
                        }
                      }}
                    >
                      <Mail className="h-4 w-4 text-blue-600" />
                      Copiar Email
                    </Button>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <label className="text-xs font-medium text-muted-foreground">
                      TEMPLATE DE EMAIL
                    </label>
                    <Select
                      value={selectedTemplate?.id || ''}
                      onValueChange={(value) => {
                        const template = emailTemplates.find(t => t.id === value);
                        setSelectedTemplate(template);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button
                      className="w-full"
                      onClick={() => onSendEmail(lead)}
                      disabled={!selectedTemplate}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <LeadComments leadId={lead.id} />
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-4 w-4" />
                  <h4 className="font-medium">Dados Técnicos</h4>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="font-medium text-muted-foreground">ID do Lead:</span>
                      <span className="ml-2 break-all">{lead.id}</span>
                    </div>
                    
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="font-medium text-muted-foreground">Session ID:</span>
                      <span className="ml-2 break-all">{lead.session_id}</span>
                    </div>
                    
                    {lead.form_id && (
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="font-medium text-muted-foreground">Form ID:</span>
                        <span className="ml-2">{lead.form_id}</span>
                      </div>
                    )}
                    
                    {lead.form_name && (
                      <div className="p-2 bg-muted/30 rounded">
                        <span className="font-medium text-muted-foreground">Formulário:</span>
                        <span className="ml-2">{lead.form_name}</span>
                      </div>
                    )}
                  </div>
                  
                  {lead.page_url && (
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="font-medium text-muted-foreground flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Página:
                      </span>
                      <span className="ml-2 break-all">{lead.page_url}</span>
                    </div>
                  )}
                  
                  {lead.referrer && (
                    <div className="p-2 bg-muted/30 rounded">
                      <span className="font-medium text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Origem:
                      </span>
                      <span className="ml-2 break-all">{lead.referrer}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};