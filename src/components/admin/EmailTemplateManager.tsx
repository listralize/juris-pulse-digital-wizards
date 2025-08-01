import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Mail, Plus, Save, Trash2, Eye, Send } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface EmailTemplate {
  id: string;
  name: string;
  title: string;
  subject: string;
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
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const EmailTemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testEmail, setTestEmail] = useState('');

  // Carregar templates
  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTemplates(data || []);
      if (!selectedTemplate && data && data.length > 0) {
        setSelectedTemplate(data.find(t => t.is_default) || data[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      toast.error('Erro ao carregar templates de email');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Salvar template
  const saveTemplate = async () => {
    if (!selectedTemplate) return;

    try {
      console.log('Salvando template:', selectedTemplate);
      
      // Verificar primeiro se logo_url existe na tabela
      const { data: tableInfo, error: tableError } = await supabase
        .from('email_templates')
        .select('*')
        .limit(1);

      // Usar apenas os campos que existem no schema da tabela
      const templateData: any = {
        name: selectedTemplate.name,
        title: selectedTemplate.title,
        subject: selectedTemplate.subject,
        content: selectedTemplate.content,
        is_default: selectedTemplate.is_default,
        is_active: selectedTemplate.is_active,
        button_text: selectedTemplate.button_text || 'Falar no WhatsApp',
        button_url: selectedTemplate.button_url || 'https://api.whatsapp.com/send?phone=5562994594496',
        secondary_button_text: selectedTemplate.secondary_button_text || 'Seguir no Instagram',
        secondary_button_url: selectedTemplate.secondary_button_url || 'https://instagram.com/seu_perfil',
        show_secondary_button: selectedTemplate.show_secondary_button ?? true,
        background_color: selectedTemplate.background_color || '#000000',
        text_color: selectedTemplate.text_color || '#ffffff',
        button_color: selectedTemplate.button_color || '#4CAF50',
        custom_html: selectedTemplate.custom_html || ''
      };

      // Adicionar logo_url se estiver disponível
      if (selectedTemplate.logo_url) {
        templateData.logo_url = selectedTemplate.logo_url;
      }

      // Se é um novo template, fazer insert
      if (!selectedTemplate.id || !templates.find(t => t.id === selectedTemplate.id)) {
        const { data, error } = await supabase
          .from('email_templates')
          .insert(templateData)
          .select()
          .single();

        if (error) throw error;
        
        setSelectedTemplate({ ...selectedTemplate, id: data.id });
      } else {
        // Senão, fazer update
        const { error } = await supabase
          .from('email_templates')
          .update(templateData)
          .eq('id', selectedTemplate.id);

        if (error) throw error;
      }

      toast.success('Template salvo com sucesso!');
      setIsEditing(false);
      loadTemplates();
    } catch (error) {
      console.error('Erro ao salvar template:', error);
      toast.error(`Erro ao salvar template: ${error.message}`);
    }
  };

  // Criar novo template
  const createNewTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: crypto.randomUUID(),
      name: 'Novo Template',
      title: 'Obrigado pelo seu contato!',
      subject: 'Obrigado pelo contato, {name}! 📧',
      content: 'Agradecemos seu interesse em nossos serviços de {service}. Nossa equipe entrará em contato em breve.',
      logo_url: '/logo-email.png',
      background_color: '#000000',
      text_color: '#ffffff',
      button_color: '#4CAF50',
      custom_html: '',
      button_text: 'Falar no WhatsApp',
      button_url: 'https://api.whatsapp.com/send?phone=5562994594496',
      secondary_button_text: 'Seguir no Instagram',
      secondary_button_url: 'https://instagram.com/seu_perfil',
      show_secondary_button: true,
      is_default: false,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  // Deletar template
  const deleteTemplate = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este template?')) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Template deletado com sucesso!');
      loadTemplates();
      
      if (selectedTemplate?.id === id) {
        setSelectedTemplate(templates.find(t => t.id !== id) || null);
      }
    } catch (error) {
      console.error('Erro ao deletar template:', error);
      toast.error('Erro ao deletar template');
    }
  };

  // Enviar email de teste
  const sendTestEmail = async () => {
    if (!testEmail || !selectedTemplate) {
      toast.error('Preencha o email de teste');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-smtp-email', {
        body: {
          to: testEmail,
          subject: selectedTemplate.subject.replace('{name}', 'Teste'),
          name: 'Teste',
          service: 'Teste de Template',
          message: 'Este é um email de teste do sistema.',
          customTitle: selectedTemplate.title,
          customContent: selectedTemplate.content.replace('{service}', 'teste').replace('{name}', 'Teste'),
          logoUrl: selectedTemplate.logo_url,
          backgroundColor: selectedTemplate.background_color,
          textColor: selectedTemplate.text_color,
          buttonColor: selectedTemplate.button_color,
          customHtml: selectedTemplate.custom_html,
          buttonText: selectedTemplate.button_text,
          buttonUrl: selectedTemplate.button_url,
          secondaryButtonText: selectedTemplate.secondary_button_text,
          secondaryButtonUrl: selectedTemplate.secondary_button_url,
          showSecondaryButton: selectedTemplate.show_secondary_button
        }
      });

      if (error) throw error;
      toast.success('Email de teste enviado!');
    } catch (error) {
      console.error('Erro ao enviar teste:', error);
      toast.error('Erro ao enviar email de teste');
    }
  };

  // Definir como padrão
  const setAsDefault = async (id: string) => {
    try {
      // Remover padrão de todos
      await supabase
        .from('email_templates')
        .update({ is_default: false })
        .neq('id', '');

      // Definir novo padrão
      const { error } = await supabase
        .from('email_templates')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      toast.success('Template definido como padrão!');
      loadTemplates();
    } catch (error) {
      console.error('Erro ao definir padrão:', error);
      toast.error('Erro ao definir template padrão');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Carregando templates...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Templates de Email</h2>
          <p className="text-muted-foreground">Gerencie os templates para envio automático de emails</p>
        </div>
        <Button onClick={createNewTemplate}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Templates */}
        <div className="space-y-3">
          <h3 className="font-semibold">Templates ({templates.length})</h3>
          <div className="space-y-2">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{template.subject}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {template.is_default && (
                        <Badge variant="default" className="text-xs">Padrão</Badge>
                      )}
                      {!template.is_active && (
                        <Badge variant="secondary" className="text-xs">Inativo</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Editor de Template */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {isEditing ? 'Editando Template' : selectedTemplate.name}
                </CardTitle>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setAsDefault(selectedTemplate.id)}
                        disabled={selectedTemplate.is_default}
                      >
                        Definir como Padrão
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => deleteTemplate(selectedTemplate.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={saveTemplate}>
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    {/* Campos Disponíveis */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2">📝 Campos Disponíveis</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Clique nos campos abaixo para inserir automaticamente no conteúdo:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { field: '{name}', label: 'Nome do Cliente' },
                          { field: '{service}', label: 'Serviço Solicitado' },
                          { field: '{email}', label: 'Email do Cliente' },
                          { field: '{phone}', label: 'Telefone' },
                          { field: '{message}', label: 'Mensagem' },
                          { field: '{date}', label: 'Data Atual' },
                          { field: '{time}', label: 'Hora Atual' }
                        ].map(({ field, label }) => (
                          <Button
                            key={field}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const textarea = document.getElementById('content') as HTMLTextAreaElement;
                              if (textarea) {
                                const start = textarea.selectionStart;
                                const end = textarea.selectionEnd;
                                const value = selectedTemplate.content;
                                const newValue = value.substring(0, start) + field + value.substring(end);
                                setSelectedTemplate({
                                  ...selectedTemplate,
                                  content: newValue
                                });
                                // Restaurar foco e posição do cursor
                                setTimeout(() => {
                                  textarea.focus();
                                  textarea.setSelectionRange(start + field.length, start + field.length);
                                }, 0);
                              }
                            }}
                            className="text-xs"
                          >
                            {field} - {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome do Template</Label>
                        <Input
                          id="name"
                          value={selectedTemplate.name}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            name: e.target.value
                          })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={selectedTemplate.is_active}
                          onCheckedChange={(checked) => setSelectedTemplate({
                            ...selectedTemplate,
                            is_active: checked
                          })}
                        />
                        <Label>Template Ativo</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Título do Email</Label>
                      <Input
                        id="title"
                        value={selectedTemplate.title}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          title: e.target.value
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Assunto do Email</Label>
                      <div className="flex gap-2">
                        <Input
                          id="subject"
                          value={selectedTemplate.subject}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            subject: e.target.value
                          })}
                          placeholder="Use {name} para o nome do cliente"
                        />
                        <div className="flex gap-1">
                          {['{name}', '{service}'].map(field => (
                            <Button
                              key={field}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const input = document.getElementById('subject') as HTMLInputElement;
                                if (input) {
                                  const start = input.selectionStart || 0;
                                  const end = input.selectionEnd || 0;
                                  const value = selectedTemplate.subject;
                                  const newValue = value.substring(0, start) + field + value.substring(end);
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    subject: newValue
                                  });
                                }
                              }}
                              className="text-xs"
                            >
                              {field}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                     <div>
                       <Label htmlFor="content">Conteúdo Principal do Email</Label>
                       <div className="space-y-2">
                         <Textarea
                           id="content"
                           value={selectedTemplate.content}
                           onChange={(e) => setSelectedTemplate({
                             ...selectedTemplate,
                             content: e.target.value
                           })}
                           rows={12}
                           placeholder="Digite o conteúdo principal do email. Use os campos disponíveis para personalizar. Por exemplo:

Olá {name}!

Agradecemos seu interesse em nossos serviços de {service}. Nossa equipe de advogados especializados analisará sua solicitação e retornará o contato o mais breve possível.

Sua mensagem: {message}

Atenciosamente,
Equipe Jurídica"
                         />
                         <div className="text-xs text-muted-foreground">
                           💡 Dica: Use {'{name}'} para o nome, {'{service}'} para o serviço, {'{message}'} para mostrar a mensagem completa do cliente.
                         </div>
                       </div>
                     </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="logo_url">URL da Logo</Label>
                      <Input
                        id="logo_url"
                        value={selectedTemplate.logo_url || ''}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          logo_url: e.target.value
                        })}
                        placeholder="https://exemplo.com/logo.png"
                      />
                    </div>
                      <div>
                        <Label htmlFor="background_color">Cor de Fundo</Label>
                        <Input
                          id="background_color"
                          type="color"
                          value={selectedTemplate.background_color || '#000000'}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            background_color: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="text_color">Cor do Texto</Label>
                        <Input
                          id="text_color"
                          type="color"
                          value={selectedTemplate.text_color || '#ffffff'}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            text_color: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="button_color">Cor dos Botões</Label>
                        <Input
                          id="button_color"
                          type="color"
                          value={selectedTemplate.button_color || '#4CAF50'}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            button_color: e.target.value
                          })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Botões de Call-to-Action</Label>
                      <div className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="button_text">Texto do Botão Principal</Label>
                            <Input
                              id="button_text"
                              value={selectedTemplate.button_text || 'Falar no WhatsApp'}
                              onChange={(e) => setSelectedTemplate({
                                ...selectedTemplate,
                                button_text: e.target.value
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="button_url">URL do Botão Principal</Label>
                            <Input
                              id="button_url"
                              value={selectedTemplate.button_url || 'https://api.whatsapp.com/send?phone=5562994594496'}
                              onChange={(e) => setSelectedTemplate({
                                ...selectedTemplate,
                                button_url: e.target.value
                              })}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={selectedTemplate.show_secondary_button ?? true}
                            onCheckedChange={(checked) => setSelectedTemplate({
                              ...selectedTemplate,
                              show_secondary_button: checked
                            })}
                          />
                          <Label>Mostrar Botão Secundário</Label>
                        </div>

                        {selectedTemplate.show_secondary_button && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="secondary_button_text">Texto do Botão Secundário</Label>
                              <Input
                                id="secondary_button_text"
                                value={selectedTemplate.secondary_button_text || 'Seguir no Instagram'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  secondary_button_text: e.target.value
                                })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="secondary_button_url">URL do Botão Secundário</Label>
                              <Input
                                id="secondary_button_url"
                                value={selectedTemplate.secondary_button_url || 'https://instagram.com/seu_perfil'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  secondary_button_url: e.target.value
                                })}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="custom_html">HTML Personalizado (Opcional)</Label>
                      <Textarea
                        id="custom_html"
                        value={selectedTemplate.custom_html || ''}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          custom_html: e.target.value
                        })}
                        rows={8}
                        placeholder="HTML personalizado adicional para o template"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Título</Label>
                      <div className="p-2 bg-muted rounded">{selectedTemplate.title}</div>
                    </div>
                    <div>
                      <Label>Assunto</Label>
                      <div className="p-2 bg-muted rounded">{selectedTemplate.subject}</div>
                    </div>
                    <div>
                      <Label>Conteúdo</Label>
                      <div className="p-2 bg-muted rounded whitespace-pre-wrap">{selectedTemplate.content}</div>
                    </div>
                  </div>
                )}

                {/* Teste de Email */}
                <div className="border-t pt-4">
                  <Label>Testar Template</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Email para teste"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      type="email"
                    />
                    <Button onClick={sendTestEmail} variant="outline">
                      <Send className="w-4 h-4 mr-1" />
                      Enviar Teste
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Selecione um template para visualizar ou criar um novo</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};