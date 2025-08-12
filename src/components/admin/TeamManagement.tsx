
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Save, Trash2, Users } from 'lucide-react';
import { TeamMember } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

interface TeamManagementProps {
  teamMembers: TeamMember[];
  onAddTeamMember: () => void;
  onRemoveTeamMember: (id: string) => void;
  onUpdateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  onSave: () => void;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({
  teamMembers,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Users className="w-5 h-5" />
            Gerenciar Equipe ({teamMembers.length} membros)
          </CardTitle>
          <div className="space-x-2">
            <Button onClick={onAddTeamMember} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
            <Button onClick={onSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {teamMembers.map((member) => (
          <div key={member.id} className={`p-6 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                {member.name || 'Novo Membro'}
              </h3>
              <Button 
                onClick={() => onRemoveTeamMember(member.id)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Nome Completo</Label>
                <Input
                  value={member.name}
                  onChange={(e) => onUpdateTeamMember(member.id, 'name', e.target.value)}
                  placeholder="Ex: Dr. João Silva"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Cargo</Label>
                <Input
                  value={member.title}
                  onChange={(e) => onUpdateTeamMember(member.id, 'title', e.target.value)}
                  placeholder="Ex: Advogado Sócio"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Registro OAB</Label>
                <Input
                  value={member.oab}
                  onChange={(e) => onUpdateTeamMember(member.id, 'oab', e.target.value)}
                  placeholder="Ex: OAB/GO: 12345"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  value={member.email}
                  onChange={(e) => onUpdateTeamMember(member.id, 'email', e.target.value)}
                  placeholder="Ex: joao@stadv.com"
                  type="email"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Foto do Membro</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={member.image}
                    onChange={(e) => onUpdateTeamMember(member.id, 'image', e.target.value)}
                    placeholder="URL da imagem ou selecione da galeria"
                    className={`flex-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Implementar abertura da galeria
                      console.log('Abrir galeria para membro:', member.id);
                    }}
                    className="px-3"
                  >
                    📁
                  </Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Biografia</Label>
                <Textarea
                  value={member.description}
                  onChange={(e) => onUpdateTeamMember(member.id, 'description', e.target.value)}
                  placeholder="Descreva a experiência e qualificações do advogado..."
                  rows={4}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
