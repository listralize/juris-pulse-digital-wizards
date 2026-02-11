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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Mail, Plus, Save, Trash2, Eye, Send, Copy, Palette, Type, Link, Image, Code } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { logger } from '@/utils/logger';

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

export const EnhancedEmailTemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showAdvanced, setShowAdvanced] = useState(false);

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
      logger.log('Salvando template:', selectedTemplate);
      
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

      if (selectedTemplate.logo_url) {
        templateData.logo_url = selectedTemplate.logo_url;
      }

      if (!selectedTemplate.id || !templates.find(t => t.id === selectedTemplate.id)) {
        const { data, error } = await supabase
          .from('email_templates')
          .insert(templateData)
          .select()
          .single();

        if (error) throw error;
        
        setSelectedTemplate({ ...selectedTemplate, id: data.id });
      } else {
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
      background_color: '#1a1a2e',
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

  // Duplicar template
  const duplicateTemplate = (template: EmailTemplate) => {
    const duplicated = {
      ...template,
      id: crypto.randomUUID(),
      name: `${template.name} (Cópia)`,
      is_default: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setSelectedTemplate(duplicated);
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
      // Gerar HTML completo do template
      const fullHtml = generateEmailHTML();
      
      const { data, error } = await supabase.functions.invoke('send-smtp-email', {
        body: {
          to: testEmail,
          subject: selectedTemplate.subject.replace('{name}', 'Teste'),
          name: 'Teste',
          service: 'Teste de Template',
          message: 'Este é um email de teste do sistema.',
          customHtml: fullHtml // Usar o HTML completo gerado
        }
      });

      if (error) throw error;
      toast.success('Email de teste enviado!');
    } catch (error) {
      console.error('Erro ao enviar teste:', error);
      toast.error('Erro ao enviar email de teste');
    }
  };

  // Gerar HTML completo do email
  const generateEmailHTML = () => {
    if (!selectedTemplate) return '';

    // Se há HTML customizado, usar ele COMPLETO com substituições de variáveis
    if (selectedTemplate.custom_html && selectedTemplate.custom_html.trim() !== '') {
      let customHtml = selectedTemplate.custom_html;
      
      // Verificar se já é um HTML completo (com DOCTYPE e html tags)
      if (!customHtml.includes('<!DOCTYPE') && !customHtml.includes('<html')) {
        // Se não é HTML completo, envolver em estrutura básica
        customHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${selectedTemplate.title}</title>
</head>
<body>
    ${customHtml}
</body>
</html>`;
      }
      
      return customHtml
        .replace(/{name}/g, 'Teste')
        .replace(/{service}/g, 'Teste de Template')
        .replace(/{message}/g, 'Este é um email de teste do sistema.')
        .replace(/{email}/g, testEmail)
        .replace(/{date}/g, new Date().toLocaleDateString('pt-BR'))
        .replace(/{time}/g, new Date().toLocaleTimeString('pt-BR'));
    }

    // Senão, gerar template padrão baseado nas configurações
    const content = selectedTemplate.content
      .replace(/{name}/g, 'Teste')
      .replace(/{service}/g, 'Teste de Template')
      .replace(/{message}/g, 'Este é um email de teste do sistema.')
      .replace(/{email}/g, testEmail)
      .replace(/{date}/g, new Date().toLocaleDateString('pt-BR'))
      .replace(/{time}/g, new Date().toLocaleTimeString('pt-BR'));

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${selectedTemplate.title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: ${selectedTemplate.background_color || '#000000'}; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: ${selectedTemplate.background_color || '#000000'}; color: ${selectedTemplate.text_color || '#ffffff'};">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1a1a1a, #333333); padding: 40px 20px; text-align: center;">
                  ${selectedTemplate.logo_url ? `<div style="margin-bottom: 20px;"><img src="${selectedTemplate.logo_url}" alt="Logo" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" /></div>` : ''}
                  <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: ${selectedTemplate.text_color || '#ffffff'};">
                      ${selectedTemplate.title}
                  </h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px; color: ${selectedTemplate.text_color || '#ffffff'};">
                      Recebemos sua mensagem e entraremos em contato em breve
                  </p>
              </div>

              <!-- Content -->
              <div style="padding: 30px 20px; background-color: #111111;">
                  <p style="font-size: 18px; margin: 0 0 20px 0; color: ${selectedTemplate.text_color || '#ffffff'};">
                      Olá <strong style="color: ${selectedTemplate.button_color || '#4CAF50'};">Teste</strong>,
                  </p>
                  
                  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: ${selectedTemplate.text_color || '#ffffff'};">
                      ${content}
                  </p>

                  <div style="background-color: #1a1a1a; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                      <p style="margin: 0; font-size: 14px; color: #cccccc;">
                          <strong>Sua mensagem:</strong><br>
                          "Este é um email de teste do sistema."
                      </p>
                  </div>

                  <p style="font-size: 16px; line-height: 1.6; margin: 20px 0; color: #cccccc;">
                      Enquanto isso, fique à vontade para entrar em contato conosco através dos canais abaixo:
                  </p>

                  <!-- Action Buttons -->
                  <div style="text-align: center; margin: 30px 0;">
                      ${selectedTemplate.button_text ? `<a href="${selectedTemplate.button_url || '#'}" style="display: inline-block; background-color: ${selectedTemplate.button_color || '#4CAF50'}; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 0;">${selectedTemplate.button_text}</a>` : ''}
                      
                      ${selectedTemplate.show_secondary_button && selectedTemplate.secondary_button_text ? `<a href="${selectedTemplate.secondary_button_url || '#'}" style="display: inline-block; background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 0;">${selectedTemplate.secondary_button_text}</a>` : ''}
                  </div>

                  <!-- Contact Info -->
                  <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 30px 0;">
                      <h3 style="margin: 0 0 15px 0; color: #4CAF50; font-size: 18px;">Nossos Contatos</h3>
                      <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">📞 <strong>Telefone:</strong> (62) 99459-4496</p>
                      <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">📧 <strong>Email:</strong> contato@stadv.com.br</p>
                      <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">🌐 <strong>Website:</strong> www.stadv.com.br</p>
                  </div>

              </div>

              <!-- Footer -->
              <div style="background-color: #0a0a0a; padding: 20px; text-align: center; border-top: 1px solid #333333;">
                  <p style="margin: 0; font-size: 12px; color: #666666;">Este é um email automático. Não responda a este endereço.</p>
                  <p style="margin: 10px 0 0 0; font-size: 12px; color: #666666;">© 2024 Escritório de Advocacia. Todos os direitos reservados.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };

  // Definir como padrão
  const setAsDefault = async (id: string) => {
    try {
      await supabase
        .from('email_templates')
        .update({ is_default: false })
        .neq('id', '');

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

  // Função para inserir campo no cursor
  const insertField = (field: string, targetId: string) => {
    const textarea = document.getElementById(targetId) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const current = targetId === 'content' ? selectedTemplate?.content || '' : selectedTemplate?.subject || '';
      const newValue = current.substring(0, start) + field + current.substring(end);
      
      if (targetId === 'content') {
        setSelectedTemplate(prev => prev ? { ...prev, content: newValue } : null);
      } else {
        setSelectedTemplate(prev => prev ? { ...prev, subject: newValue } : null);
      }
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + field.length, start + field.length);
      }, 0);
    }
  };

  // Preview do email
  const generatePreview = () => {
    if (!selectedTemplate) return '';
    
    const content = selectedTemplate.content
      .replace(/{name}/g, 'João Silva')
      .replace(/{service}/g, 'Consultoria Jurídica')
      .replace(/{message}/g, 'Gostaria de agendar uma consulta.')
      .replace(/{email}/g, 'joao@email.com')
      .replace(/{phone}/g, '(11) 99999-9999')
      .replace(/{date}/g, new Date().toLocaleDateString('pt-BR'))
      .replace(/{time}/g, new Date().toLocaleTimeString('pt-BR'));

    return `
      <div style="
        max-width: ${previewMode === 'mobile' ? '320px' : '600px'};
        margin: 0 auto;
        background-color: ${selectedTemplate.background_color || '#000000'};
        color: ${selectedTemplate.text_color || '#ffffff'};
        font-family: Arial, sans-serif;
        padding: 20px;
        border-radius: 8px;
      ">
        ${selectedTemplate.logo_url ? `<img src="${selectedTemplate.logo_url}" alt="Logo" style="max-width: 200px; margin-bottom: 20px;">` : ''}
        <h1 style="color: ${selectedTemplate.text_color || '#ffffff'};">${selectedTemplate.title}</h1>
        <p style="line-height: 1.6;">${content}</p>
        ${selectedTemplate.button_text ? `
          <a href="${selectedTemplate.button_url}" style="
            display: inline-block;
            background-color: ${selectedTemplate.button_color || '#4CAF50'};
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px 5px;
          ">${selectedTemplate.button_text}</a>
        ` : ''}
        ${selectedTemplate.show_secondary_button && selectedTemplate.secondary_button_text ? `
          <a href="${selectedTemplate.secondary_button_url}" style="
            display: inline-block;
            background-color: #6c5ce7;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px 5px;
          ">${selectedTemplate.secondary_button_text}</a>
        ` : ''}
        ${selectedTemplate.custom_html || ''}
      </div>
    `;
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
          <h2 className="text-2xl font-bold">Templates de Email Avançados</h2>
          <p className="text-muted-foreground">Editor completo para criação de templates personalizados</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createNewTemplate} variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Novo Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lista de Templates */}
        <div className="space-y-3">
          <h3 className="font-semibold">Templates ({templates.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${selectedTemplate?.id === template.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{template.subject}</div>
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      {template.is_default && (
                        <Badge variant="default" className="text-xs">Padrão</Badge>
                      )}
                      {!template.is_active && (
                        <Badge variant="secondary" className="text-xs">Inativo</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateTemplate(template);
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTemplate(template.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Editor de Template */}
        <div className="lg:col-span-3">
          {selectedTemplate ? (
            <Tabs defaultValue="editor" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              {/* Editor Tab */}
              <TabsContent value="editor" className="space-y-4">
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
                    {isEditing && (
                      <>
                        {/* Campos Disponíveis */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Type className="h-4 w-4" />
                            Campos Dinâmicos
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Clique nos campos para inserir no conteúdo:
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { field: '{name}', label: 'Nome' },
                              { field: '{service}', label: 'Serviço' },
                              { field: '{email}', label: 'Email' },
                              { field: '{phone}', label: 'Telefone' },
                              { field: '{message}', label: 'Mensagem' },
                              { field: '{date}', label: 'Data' },
                              { field: '{time}', label: 'Hora' }
                            ].map(({ field, label }) => (
                              <Button
                                key={field}
                                variant="outline"
                                size="sm"
                                onClick={() => insertField(field, 'content')}
                                className="text-xs justify-start"
                              >
                                {field}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Configurações Básicas */}
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
                          <div className="space-y-2">
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
                                  onClick={() => insertField(field, 'subject')}
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
                          <Textarea
                            id="content"
                            value={selectedTemplate.content}
                            onChange={(e) => setSelectedTemplate({
                              ...selectedTemplate,
                              content: e.target.value
                            })}
                            placeholder="Use {name}, {service}, {message} etc."
                            rows={8}
                          />
                        </div>

                        {/* Configurações Avançadas */}
                        <div className="border-t pt-4">
                          <Button
                            variant="ghost"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="mb-4"
                          >
                            <Code className="h-4 w-4 mr-2" />
                            {showAdvanced ? 'Ocultar' : 'Mostrar'} Configurações Avançadas
                          </Button>
                          
                          {showAdvanced && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="custom_html">HTML Completo do Email</Label>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Aqui você pode criar o HTML completo do email. Use as variáveis {'{name}'}, {'{service}'}, {'{message}'}, etc. Se preenchido, este HTML será usado no lugar do template padrão.
                                </p>
                                <Textarea
                                  id="custom_html"
                                  value={selectedTemplate.custom_html || ''}
                                  onChange={(e) => setSelectedTemplate({
                                    ...selectedTemplate,
                                    custom_html: e.target.value
                                  })}
                                  placeholder={`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Email Personalizado</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff;">
        <!-- Seu HTML aqui -->
        <h1 style="color: #ffffff;">Olá {name}!</h1>
        <p>Mensagem: {message}</p>
        <a href="https://api.whatsapp.com/send?phone=5562994594496" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px;">Falar no WhatsApp</a>
    </div>
</body>
</html>`}
                                  rows={20}
                                  className="font-mono text-sm"
                                />
                              </div>
                              
                              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                                <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">💡 Dicas importantes:</h5>
                                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                  <li>• Se você preencher o HTML customizado, ele substituirá completamente o template padrão</li>
                                  <li>• Use as variáveis: {'{name}'}, {'{service}'}, {'{message}'}, {'{email}'}, {'{date}'}, {'{time}'}</li>
                                  <li>• Inclua estilos inline para melhor compatibilidade com clientes de email</li>
                                  <li>• Teste sempre antes de usar em produção</li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Personalização Visual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Cores */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Cores</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bg_color">Cor de Fundo</Label>
                            <div className="flex gap-2">
                              <Input
                                id="bg_color"
                                type="color"
                                value={selectedTemplate.background_color || '#000000'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  background_color: e.target.value
                                })}
                                className="w-16 h-10"
                              />
                              <Input
                                value={selectedTemplate.background_color || '#000000'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  background_color: e.target.value
                                })}
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="text_color">Cor do Texto</Label>
                            <div className="flex gap-2">
                              <Input
                                id="text_color"
                                type="color"
                                value={selectedTemplate.text_color || '#ffffff'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  text_color: e.target.value
                                })}
                                className="w-16 h-10"
                              />
                              <Input
                                value={selectedTemplate.text_color || '#ffffff'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  text_color: e.target.value
                                })}
                                placeholder="#ffffff"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="button_color">Cor do Botão</Label>
                            <div className="flex gap-2">
                              <Input
                                id="button_color"
                                type="color"
                                value={selectedTemplate.button_color || '#4CAF50'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  button_color: e.target.value
                                })}
                                className="w-16 h-10"
                              />
                              <Input
                                value={selectedTemplate.button_color || '#4CAF50'}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  button_color: e.target.value
                                })}
                                placeholder="#4CAF50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Logo e Botões */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Logo e Botões</h4>
                        <div>
                          <Label htmlFor="logo_url">URL do Logo</Label>
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
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="button_text">Texto do Botão Principal</Label>
                              <Input
                                id="button_text"
                                value={selectedTemplate.button_text || ''}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  button_text: e.target.value
                                })}
                                placeholder="Falar no WhatsApp"
                              />
                            </div>
                            <div>
                              <Label htmlFor="button_url">URL do Botão Principal</Label>
                              <Input
                                id="button_url"
                                value={selectedTemplate.button_url || ''}
                                onChange={(e) => setSelectedTemplate({
                                  ...selectedTemplate,
                                  button_url: e.target.value
                                })}
                                placeholder="https://api.whatsapp.com/send?phone=..."
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={selectedTemplate.show_secondary_button || false}
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
                                  value={selectedTemplate.secondary_button_text || ''}
                                  onChange={(e) => setSelectedTemplate({
                                    ...selectedTemplate,
                                    secondary_button_text: e.target.value
                                  })}
                                  placeholder="Seguir no Instagram"
                                />
                              </div>
                              <div>
                                <Label htmlFor="secondary_button_url">URL do Botão Secundário</Label>
                                <Input
                                  id="secondary_button_url"
                                  value={selectedTemplate.secondary_button_url || ''}
                                  onChange={(e) => setSelectedTemplate({
                                    ...selectedTemplate,
                                    secondary_button_url: e.target.value
                                  })}
                                  placeholder="https://instagram.com/seu_perfil"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={saveTemplate}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Preview do Email
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant={previewMode === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('desktop')}
                      >
                        Desktop
                      </Button>
                      <Button
                        variant={previewMode === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('mobile')}
                      >
                        Mobile
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div 
                        dangerouslySetInnerHTML={{ __html: generatePreview() }}
                        className="max-h-96 overflow-y-auto"
                      />
                    </div>
                    
                    {/* Teste de Email */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Enviar Email de Teste
                      </h4>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Digite o email para teste"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          type="email"
                        />
                        <Button onClick={sendTestEmail} disabled={!testEmail}>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Teste
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Selecione um template para começar a editar</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};