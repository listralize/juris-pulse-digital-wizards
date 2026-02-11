
import { useState, useEffect } from 'react';
import { TeamMember } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';
import { logger } from '../../utils/logger';

export const useSupabaseTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTeamMembers = async () => {
    setIsLoading(true);
    
    try {
      const { data: members, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Erro ao carregar membros da equipe:', error);
        setTeamMembers([]);
      } else {
        const formattedMembers = members.map(member => ({
          id: member.id,
          name: member.name,
          title: member.title,
          oab: member.oab,
          email: member.email,
          image: member.image || '',
          description: member.description || ''
        }));
        
        setTeamMembers(formattedMembers);
      }
    } catch (error) {
      console.error('Erro crítico ao carregar membros:', error);
      setTeamMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTeamMembers = async (members: TeamMember[]) => {
    try {
      await supabase
        .from('team_members')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      for (let i = 0; i < members.length; i++) {
        const member = members[i];
        const { error } = await supabase
          .from('team_members')
          .upsert({
            id: member.id,
            name: member.name,
            title: member.title,
            oab: member.oab,
            email: member.email,
            image: member.image,
            description: member.description,
            is_active: true,
            display_order: i
          }, { onConflict: 'id' });

        if (error) {
          console.error('Erro ao salvar membro:', member.name, error);
        }
      }

      setTeamMembers([...members]);
      
    } catch (error) {
      console.error('Erro crítico ao salvar membros:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  return {
    teamMembers,
    isLoading,
    loadTeamMembers,
    saveTeamMembers,
    setTeamMembers,
    refetch: loadTeamMembers
  };
};
