import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Mail, MessageSquare } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  useDroppable,
} from '@dnd-kit/core';

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

// Helper para parsear dados do lead
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

export const LeadsKanban: React.FC<LeadsKanbanProps> = ({
  filteredLeads,
  leadStatuses,
  updateLeadStatus,
  onLeadClick
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Paginação para Kanban
  const [kanbanCurrentPage, setKanbanCurrentPage] = useState(1);
  const [kanbanLeadsPerPage] = useState(8);

  // Calcular dados de paginação para Kanban
  const kanbanIndexOfLastLead = kanbanCurrentPage * kanbanLeadsPerPage;
  const kanbanIndexOfFirstLead = kanbanIndexOfLastLead - kanbanLeadsPerPage;
  const kanbanTotalPages = Math.ceil(filteredLeads.length / kanbanLeadsPerPage);

  const goToKanbanNextPage = () => {
    setKanbanCurrentPage(prev => Math.min(prev + 1, kanbanTotalPages));
  };

  const goToKanbanPreviousPage = () => {
    setKanbanCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const leadId = active.id as string;
    const newStatus = over.id as string;

    // Verifica se foi solto em uma coluna válida
    const validStatuses = ['novo', 'contatado', 'qualificado', 'proposta', 'convertido', 'perdido'];
    if (!validStatuses.includes(newStatus)) {
      return;
    }

    // Encontrar o lead e atualizar o status
    const lead = filteredLeads.find(l => l.id === leadId);
    if (lead) {
      console.log('🎯 Movendo lead:', {
        leadId,
        to: newStatus,
        leadName: parseLeadData(lead.lead_data).name
      });
      
      updateLeadStatus(lead.id, newStatus);
    } else {
      console.error('❌ Lead não encontrado:', leadId);
    }
  };

  // Componente para item arrastável
  const DraggableLeadCard = ({ lead, index }: { lead: Lead; index: number }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: lead.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const leadData = parseLeadData(lead.lead_data);

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`p-3 rounded border cursor-pointer hover:shadow-md transition-shadow ${
          isDragging 
            ? 'shadow-lg opacity-50' 
            : isDark 
              ? 'bg-white/5 border-white/10 hover:bg-white/10' 
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => !isDragging && onLeadClick(lead)}
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
    );
  };

  // Componente para coluna droppable
  const DroppableColumn = ({ status, children }: { status: string; children: React.ReactNode }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: status,
    });

    return (
      <div
        ref={setNodeRef}
        className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} border rounded-lg p-4 ${
          isOver ? 'bg-blue-50/50 border-blue-300' : ''
        }`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Paginação do Kanban */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Mostrando {kanbanIndexOfFirstLead + 1}-{Math.min(kanbanIndexOfLastLead, filteredLeads.length)} de {filteredLeads.length} leads
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToKanbanPreviousPage}
            disabled={kanbanCurrentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <span className="text-sm">
            Página {kanbanCurrentPage} de {kanbanTotalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToKanbanNextPage}
            disabled={kanbanCurrentPage === kanbanTotalPages}
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Board Kanban com Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {['novo', 'contatado', 'qualificado', 'proposta', 'convertido', 'perdido'].map(status => {
            // Mapear status da tabela para Kanban
            const getKanbanStatus = (tableStatus: string) => {
              const statusMap: { [key: string]: string } = {
                'contato': 'contatado',
                'em contato': 'contatado', 
                'descartado': 'perdido',
                'novo': 'novo',
                'qualificado': 'qualificado',
                'proposta': 'proposta', 
                'convertido': 'convertido',
                'perdido': 'perdido',
                'contatado': 'contatado'
              };
              return statusMap[tableStatus?.toLowerCase()] || tableStatus;
            };

            const allStatusLeads = filteredLeads.filter(lead => {
              const leadStatus = leadStatuses[lead.id];
              const kanbanStatus = getKanbanStatus(leadStatus);
              return kanbanStatus === status || (status === 'novo' && !leadStatus);
            });
            const statusLeads = allStatusLeads.slice(kanbanIndexOfFirstLead, kanbanIndexOfLastLead);
            const leadIds = statusLeads.map(lead => lead.id);
            
            return (
              <DroppableColumn key={status} status={status}>
                <h3 className={`font-semibold mb-3 capitalize ${isDark ? 'text-white' : 'text-black'}`}>
                  {status} ({allStatusLeads.length})
                </h3>
                <SortableContext items={leadIds} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2 min-h-[200px]">
                    {statusLeads.map((lead, index) => (
                      <DraggableLeadCard key={lead.id} lead={lead} index={index} />
                    ))}
                  </div>
                </SortableContext>
              </DroppableColumn>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};