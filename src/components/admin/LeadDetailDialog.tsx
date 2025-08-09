import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Phone, Mail, Calendar, Globe, ExternalLink, MessageSquare, Database, Edit3, Check, X, MapPin } from 'lucide-react';
import { LeadComments } from './LeadComments';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  state?: string;
  capital?: string;
  region?: string;
  ddd?: number;
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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [showTechnicalModal, setShowTechnicalModal] = useState(false);

  if (!lead) return null;

  const leadData = parseLeadData(lead.lead_data);
  
  // Debug: log para verificar os dados de localização
  console.log('Lead data:', { 
    id: lead.id, 
    state: lead.state, 
    capital: lead.capital, 
    region: lead.region, 
    ddd: lead.ddd 
  });
  const whatsappMessage = encodeURIComponent(
    `Olá ${leadData.name}, vi que você entrou em contato conosco através do site. Como posso ajudá-lo(a)?`
  );
  
  const phoneNumber = leadData.phone ? 
    leadData.phone.replace(/\D/g, '') : 
    '5562994594496';
  
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`;

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSave = async (field: string) => {
    try {
      const newValue = editValues[field];
      
      // Atualizar no Supabase
      const { error } = await supabase
        .from('conversion_events')
        .update({
          lead_data: {
            ...leadData,
            [field]: newValue
          }
        })
        .eq('id', lead.id);

      if (error) {
        throw error;
      }

      // Atualizar localmente
      lead.lead_data = {
        ...leadData,
        [field]: newValue
      };

      setEditingField(null);
      toast({ title: `${field} atualizado com sucesso!` });
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({ 
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar a alteração.',
        variant: 'destructive'
      });
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValues({});
  };

  // Função para renderizar campos editáveis
  const renderEditableField = (field: string, value: string, icon: React.ReactNode) => {
    const isEditing = editingField === field;
    const currentValue = isEditing ? (editValues[field] ?? value) : value;

    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {isEditing ? (
          <div className="flex items-center gap-1 flex-1">
            <Input 
              value={currentValue}
              onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
              className="h-6 text-xs"
            />
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleSave(field)}>
              <Check className="h-3 w-3 text-green-600" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={handleCancel}>
              <X className="h-3 w-3 text-red-600" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1 flex-1">
            <span>{currentValue || 'Não informado'}</span>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
              onClick={() => handleEdit(field, value)}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Função para obter campos dinâmicos do webhook
  const getDynamicFields = () => {
    const excludeKeys = [
      'name', 'email', 'phone', 'telefone', 'service', 'message', 
      'urgent', 'isUrgent', 'customFields', 'formConfig', 'timestamp', 
      'webhook_timestamp', 'webhook_source', 'processing_method', 'subject', 'Assunto'
    ];
    
    return Object.keys(leadData).filter(key => 
      !excludeKeys.includes(key) &&
      typeof leadData[key] !== 'object' &&
      leadData[key] !== null &&
      leadData[key] !== undefined &&
      leadData[key] !== ''
    );
  };

  const TechnicalModal = () => (
    <Dialog open={showTechnicalModal} onOpenChange={setShowTechnicalModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Dados Técnicos
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-1 gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Detalhes do Lead</span>
              {leadData.urgent && (
                <Badge variant="destructive">Urgente</Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Visualize e gerencie as informações do lead
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Informações</TabsTrigger>
              <TabsTrigger value="comments">Comentários</TabsTrigger>
            </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Informações do Lead - 2 colunas */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardContent className="p-4 space-y-3 group">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{leadData.name || 'Nome não informado'}</h3>
                      {renderEditableField('email', leadData.email, <Mail className="h-4 w-4" />)}
                       {renderEditableField('phone', leadData.phone || leadData.telefone, <Phone className="h-4 w-4" />)}
                       {(lead.state || lead.region || lead.capital || lead.ddd) && (
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                           <MapPin className="h-4 w-4" />
                           <span>
                             {lead.capital && `${lead.capital}`}
                             {lead.state && ` - ${lead.state}`}
                             {lead.region && ` (${lead.region})`}
                             {lead.ddd && ` - DDD ${lead.ddd}`}
                           </span>
                         </div>
                       )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(lead.created_at).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>

                    {leadData.service && (
                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium text-foreground mb-1">Serviço</h4>
                        <p className="text-sm">{leadData.service}</p>
                      </div>
                    )}

                    {(leadData.subject || leadData.Assunto) && (
                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium text-foreground mb-1">Assunto</h4>
                        <p className="text-sm p-2 bg-muted/30 rounded max-h-20 overflow-y-auto">
                          {leadData.subject || leadData.Assunto}
                        </p>
                      </div>
                    )}

                    {leadData.message && (
                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium text-foreground mb-1">Mensagem</h4>
                        <p className="text-sm p-2 bg-muted/30 rounded max-h-20 overflow-y-auto">
                          {leadData.message}
                        </p>
                      </div>
                    )}

                    {/* Campos dinâmicos do webhook */}
                    {getDynamicFields().map((key) => (
                      <div key={key} className="pt-2 border-t">
                        <h4 className="text-sm font-medium text-foreground mb-1 capitalize">
                          {key.replace(/_/g, ' ')}
                        </h4>
                        <p className="text-sm">{String(leadData[key])}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Ações - 1 coluna à direita */}
              <div className="space-y-4">
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

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setShowTechnicalModal(true)}
                      >
                        <Database className="h-4 w-4 text-gray-600" />
                        Ver Dados Técnicos
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
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <LeadComments leadId={lead.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
    <TechnicalModal />
    </>
  );
};