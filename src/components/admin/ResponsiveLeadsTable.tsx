import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Eye, MessageSquare, Copy, Edit, Trash2 } from 'lucide-react';

interface Lead {
  id: string;
  lead_data: any;
  event_type: string;
  event_action: string;
  session_id: string;
  visitor_id?: string;
  form_id?: string;
  form_name?: string;
  page_url?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
  state?: string;
  capital?: string;
  region?: string;
  ddd?: number;
  ddd_locations?: {
    cities?: string;
  };
}

interface ResponsiveLeadsTableProps {
  leads: Lead[];
  selectedLeads: Set<string>;
  leadStatuses: { [key: string]: string };
  parseLeadData: (leadData: any) => any;
  isAllSelected: boolean;
  toggleSelectAll: () => void;
  toggleSelectLead: (id: string) => void;
  updateLeadStatus: (id: string, status: string) => void;
  viewLeadDetails: (lead: Lead) => void;
  copyToClipboard: (text: string, type: string) => void;
  handleEditLead: (id: string) => void;
  handleDeleteLead: (id: string) => void;
}

export const ResponsiveLeadsTable: React.FC<ResponsiveLeadsTableProps> = ({
  leads,
  selectedLeads,
  leadStatuses,
  parseLeadData,
  isAllSelected,
  toggleSelectAll,
  toggleSelectLead,
  updateLeadStatus,
  viewLeadDetails,
  copyToClipboard,
  handleEditLead,
  handleDeleteLead
}) => {
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {leads.map((lead) => {
          const leadData = parseLeadData(lead.lead_data);
          const status = leadStatuses[lead.id] || 'novo';

          return (
            <div key={lead.id} className="border rounded-lg p-4 bg-white dark:bg-black/50 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedLeads.has(lead.id)}
                    onCheckedChange={() => toggleSelectLead(lead.id)}
                  />
                   <div>
                     <div className="font-medium text-sm flex items-center gap-2">
                       {leadData.name || 'Nome não informado'}
                       {leadData.email && leadData.email !== 'Email não informado' && (
                         <Button
                           size="sm"
                           variant="ghost"
                           onClick={() => copyToClipboard(leadData.email, 'email')}
                           className="p-1 h-6 w-6"
                           title="Copiar email"
                         >
                           <Copy className="w-3 h-3" />
                         </Button>
                       )}
                     </div>
                     <div className="text-xs text-gray-500 truncate max-w-[200px]">
                       {leadData.email || 'Email não informado'}
                     </div>
                   </div>
                </div>
                <Badge variant="outline" className={
                  status === 'novo' ? 'bg-blue-50 text-blue-700' :
                  status === 'contato' ? 'bg-yellow-50 text-yellow-700' :
                  status === 'cliente' ? 'bg-green-50 text-green-700' :
                  'bg-red-50 text-red-700'
                }>
                  {status}
                </Badge>
              </div>

               <div className="space-y-2 text-sm">
                 <div className="flex items-center gap-2">
                   <strong>Telefone:</strong> 
                   <span>{leadData.phone || 'N/A'}</span>
                   {leadData.phone && leadData.phone !== 'N/A' && (
                     <Button
                       size="sm"
                       variant="ghost"
                       onClick={() => window.open(`https://api.whatsapp.com/send?phone=55${leadData.phone.replace(/\D/g, '')}`, '_blank')}
                       className="p-1 h-6 w-6"
                       title="Abrir WhatsApp"
                     >
                       <MessageSquare className="w-3 h-3" />
                     </Button>
                   )}
                 </div>
                 <div><strong>Serviço:</strong> {leadData.service || lead.form_name || 'N/A'}</div>
                 <div><strong>Localização:</strong> {lead.state ? `${lead.state} - ${lead.region}` : 'N/A'}</div>
                 <div><strong>Data:</strong> {new Date(lead.created_at).toLocaleDateString('pt-BR')}</div>
               </div>

               <div className="flex gap-2 pt-2">
                 <Button size="sm" variant="outline" onClick={() => viewLeadDetails(lead)}>
                   <Eye className="w-3 h-3 mr-1" />
                   Ver
                 </Button>
                 <Select value={status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                   <SelectTrigger className="w-20 h-8">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="novo">Novo</SelectItem>
                     <SelectItem value="contato">Contato</SelectItem>
                     <SelectItem value="cliente">Cliente</SelectItem>
                     <SelectItem value="perdido">Perdido</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Telefone</th>
              <th className="text-left p-2">Localização</th>
              <th className="text-left p-2">Serviço</th>
              <th className="text-left p-2">Data</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const leadData = parseLeadData(lead.lead_data);
              const status = leadStatuses[lead.id] || 'novo';

              return (
                <tr key={lead.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-2">
                    <Checkbox
                      checked={selectedLeads.has(lead.id)}
                      onCheckedChange={() => toggleSelectLead(lead.id)}
                    />
                  </td>
                  <td className="p-2">
                    <div className="max-w-[150px] truncate font-medium">
                      {leadData.name || 'Nome não informado'}
                    </div>
                  </td>
                   <td className="p-2">
                     <div className="flex items-center gap-2">
                       {leadData.email && leadData.email !== 'Email não informado' && leadData.email !== 'N/A' && (
                         <Button
                           size="sm"
                           variant="ghost"
                           onClick={() => copyToClipboard(leadData.email, 'email')}
                           title="Copiar email"
                           className="p-1 h-8 w-8"
                         >
                           <Copy className="w-4 h-4" />
                         </Button>
                       )}
                     </div>
                   </td>
                   <td className="p-2">
                     <div className="flex items-center gap-2">
                       {leadData.phone && leadData.phone !== 'N/A' && leadData.phone !== 'Não informado' && (
                         <Button
                           size="sm"
                           variant="ghost"
                           onClick={() => window.open(`https://api.whatsapp.com/send?phone=55${leadData.phone.replace(/\D/g, '')}`, '_blank')}
                           title="Abrir WhatsApp"
                           className="p-1 h-8 w-8"
                         >
                           <MessageSquare className="w-4 h-4" />
                         </Button>
                       )}
                     </div>
                   </td>
                  <td className="p-2 text-sm text-muted-foreground">
                    <div className="max-w-[150px] truncate">
                      {lead.state ? `${lead.state} - ${lead.region}` : 'N/A'}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="max-w-[150px] truncate">
                      {leadData.service || lead.form_name || 'N/A'}
                    </div>
                  </td>
                  <td className="p-2 text-sm">
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-2">
                    <Select value={status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="contato">Contato</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="perdido">Perdido</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => viewLeadDetails(lead)} title="Ver detalhes">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};