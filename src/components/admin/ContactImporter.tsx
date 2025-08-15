import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, UserPlus, Download } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
// import * as XLSX from 'xlsx'; // Removido temporariamente por vulnerabilidade de segurança

interface ContactImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onContactsAdded: () => void;
}

interface Contact {
  name: string;
  email: string;
  phone: string;
  service?: string;
}

export const ContactImporter: React.FC<ContactImporterProps> = ({
  isOpen,
  onClose,
  onContactsAdded
}) => {
  const [manualContact, setManualContact] = useState<Contact>({
    name: '',
    email: '',
    phone: '',
    service: ''
  });
  const [importedContacts, setImportedContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Adicionar contato manual
  const handleAddManualContact = async () => {
    if (!manualContact.name || !manualContact.email) {
      toast.error('Nome e email são obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      const leadData = {
        name: manualContact.name,
        email: manualContact.email,
        phone: manualContact.phone,
        service: manualContact.service || 'Contato manual',
        message: 'Contato adicionado manualmente'
      };

      const { error } = await supabase
        .from('conversion_events')
        .insert({
          event_type: 'form_submission',
          event_action: 'manual_contact',
          event_category: 'lead',
          lead_data: leadData,
          session_id: `manual-${Date.now()}`,
          page_url: '/admin/leads',
          form_id: 'manual-contact',
          form_name: 'Contato Manual'
        });

      if (error) throw error;

      toast.success('Contato adicionado com sucesso!');
      setManualContact({ name: '', email: '', phone: '', service: '' });
      onContactsAdded();
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
      toast.error('Erro ao adicionar contato');
    } finally {
      setIsLoading(false);
    }
  };

  // Processar arquivo Excel (DESABILITADO - xlsx removido por segurança)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast.error('Funcionalidade de importação Excel temporariamente desabilitada por segurança');
    return;
    
    /* CÓDIGO COMENTADO - SERÁ REATIVADO APÓS RESOLUÇÃO DE VULNERABILIDADE
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const contacts: Contact[] = jsonData.map((row: any) => ({
          name: row.nome || row.name || row.Nome || row.Name || '',
          email: row.email || row.Email || '',
          phone: row.telefone || row.phone || row.Telefone || row.Phone || '',
          service: row.servico || row.service || row.Servico || row.Service || 'Importação Excel'
        })).filter(contact => contact.name && contact.email);

        setImportedContacts(contacts);
        toast.success(`${contacts.length} contatos processados do Excel`);
      } catch (error) {
        console.error('Erro ao processar Excel:', error);
        toast.error('Erro ao processar arquivo Excel');
      }
    };
    reader.readAsArrayBuffer(file);
    */
  };

  // Importar contatos do Excel
  const handleImportContacts = async () => {
    if (importedContacts.length === 0) {
      toast.error('Nenhum contato para importar');
      return;
    }

    setIsLoading(true);
    try {
      const events = importedContacts.map(contact => ({
        event_type: 'form_submission',
        event_action: 'excel_import',
        event_category: 'lead',
        lead_data: {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          service: contact.service,
          message: 'Contato importado via Excel'
        },
        session_id: `excel-${Date.now()}-${Math.random()}`,
        page_url: '/admin/leads',
        form_id: 'excel-import',
        form_name: 'Importação Excel'
      }));

      const { error } = await supabase
        .from('conversion_events')
        .insert(events);

      if (error) throw error;

      toast.success(`${importedContacts.length} contatos importados com sucesso!`);
      setImportedContacts([]);
      onContactsAdded();
    } catch (error) {
      console.error('Erro ao importar contatos:', error);
      toast.error('Erro ao importar contatos');
    } finally {
      setIsLoading(false);
    }
  };

  // Download template Excel (DESABILITADO - xlsx removido por segurança)
  const downloadTemplate = () => {
    toast.error('Funcionalidade de template Excel temporariamente desabilitada por segurança');
    return;
    
    /* CÓDIGO COMENTADO - SERÁ REATIVADO APÓS RESOLUÇÃO DE VULNERABILIDADE
    const templateData = [
      { nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999', servico: 'Direito Civil' },
      { nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 88888-8888', servico: 'Direito Trabalhista' }
    ];
    
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contatos');
    XLSX.writeFile(wb, 'template_contatos.xlsx');
    */
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Contatos</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Adicionar Manual</TabsTrigger>
            <TabsTrigger value="excel">Importar Excel</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Adicionar Contato Manual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={manualContact.name}
                      onChange={(e) => setManualContact({ ...manualContact, name: e.target.value })}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={manualContact.email}
                      onChange={(e) => setManualContact({ ...manualContact, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={manualContact.phone}
                      onChange={(e) => setManualContact({ ...manualContact, phone: e.target.value })}
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Serviço</Label>
                    <Input
                      id="service"
                      value={manualContact.service}
                      onChange={(e) => setManualContact({ ...manualContact, service: e.target.value })}
                      placeholder="Área de interesse"
                    />
                  </div>
                </div>
                <Button onClick={handleAddManualContact} disabled={isLoading} className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Contato
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="excel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Importar do Excel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button onClick={downloadTemplate} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Template
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Baixe o template para ver o formato correto
                  </span>
                </div>
                
                <div>
                  <Label htmlFor="excel-file">Arquivo Excel</Label>
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Colunas esperadas: nome, email, telefone, servico
                  </p>
                </div>

                {importedContacts.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Contatos a importar ({importedContacts.length}):</h3>
                    <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-1">
                      {importedContacts.slice(0, 10).map((contact, index) => (
                        <div key={index} className="text-sm flex justify-between">
                          <span>{contact.name}</span>
                          <span className="text-muted-foreground">{contact.email}</span>
                        </div>
                      ))}
                      {importedContacts.length > 10 && (
                        <p className="text-sm text-muted-foreground">
                          ... e mais {importedContacts.length - 10} contatos
                        </p>
                      )}
                    </div>
                    <Button onClick={handleImportContacts} disabled={isLoading} className="w-full mt-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Importar {importedContacts.length} Contatos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};