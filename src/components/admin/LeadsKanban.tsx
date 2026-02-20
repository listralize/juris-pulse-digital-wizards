import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ChevronDown, Mail, MessageSquare } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Lead {
  id: string;
  lead_data: any;
  event_type: string;
  page_url?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
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

interface LeadsKanbanProps {
  filteredLeads: Lead[];
  leadStatuses: { [key: string]: string };
  updateLeadStatus: (leadId: string, status: string) => void;
  onLeadClick: (lead: Lead) => void;
}

const INITIAL_VISIBLE = 10;

export const LeadsKanban: React.FC<LeadsKanbanProps> = ({
  filteredLeads,
  leadStatuses,
  updateLeadStatus,
  onLeadClick
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedColumns, setExpandedColumns] = useState<{ [key: string]: boolean }>({});

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

    const lead = filteredLeads.find(l => l.id === draggableId);
    if (lead) {
      updateLeadStatus(lead.id, destination.droppableId);
    }
  };

  const toggleExpand = (status: string) => {
    setExpandedColumns(prev => ({ ...prev, [status]: !prev[status] }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {['novo', 'contatado', 'qualificado', 'proposta', 'convertido', 'perdido'].map(status => {
          const allStatusLeads = filteredLeads.filter(lead => {
            const leadStatus = leadStatuses[lead.id];
            return leadStatus === status || (status === 'novo' && !leadStatus);
          });
          
          const isExpanded = expandedColumns[status] || false;
          const visibleLeads = isExpanded ? allStatusLeads : allStatusLeads.slice(0, INITIAL_VISIBLE);
          const hasMore = allStatusLeads.length > INITIAL_VISIBLE;
          
          return (
            <div key={status} className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
              <h3 className={`font-semibold mb-3 capitalize ${isDark ? 'text-white' : 'text-black'}`}>
                {status} ({allStatusLeads.length})
              </h3>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-2 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-blue-50/50' : ''}`}
                  >
                    {visibleLeads.map((lead, index) => {
                      const leadData = parseLeadData(lead.lead_data);
                      return (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 rounded border cursor-pointer hover:shadow-md transition-shadow ${
                                snapshot.isDragging 
                                  ? 'shadow-lg rotate-2' 
                                  : isDark 
                                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                              onClick={() => !snapshot.isDragging && onLeadClick(lead)}
                            >
                              <h4 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                                {leadData.name || 'Nome não informado'}
                              </h4>
                              <p className="text-xs text-muted-foreground">{leadData.email}</p>
                              {leadData.service && (
                                <p className="text-xs text-blue-600 mt-1">{leadData.service}</p>
                              )}
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                </span>
                                {leadData.urgent && (
                                  <Badge variant="destructive" className="text-xs">Urgente</Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {hasMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs"
                  onClick={() => toggleExpand(status)}
                >
                  <ChevronDown className={`h-3 w-3 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  {isExpanded ? 'Mostrar menos' : `Ver mais ${allStatusLeads.length - INITIAL_VISIBLE} leads`}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
