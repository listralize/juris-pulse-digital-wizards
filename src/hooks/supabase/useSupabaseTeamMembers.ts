
import { useState, useEffect } from 'react';
import { TeamMember } from '../../types/adminTypes';
import { supabase } from '../../integrations/supabase/client';

export const useSupabaseTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTeamMembers = async () => {
    console.log('🔄 [useSupabaseTeamMembers] Carregando membros da equipe...');
    setIsLoading(true);
    
    try {
      const { data: members, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('❌ Erro ao carregar membros da equipe:', error);
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
        console.log('✅ [useSupabaseTeamMembers] Membros carregados:', formattedMembers.length);
      }
    } catch (error) {
      console.error('❌ Erro crítico ao carregar membros:', error);
      setTeamMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTeamMembers = async (members: TeamMember[]) => {
    console.log('💾 [useSupabaseTeamMembers] Salvando membros da equipe...');
    
    try {
      // Primeiro, desativar todos os membros existentes
      await supabase
        .from('team_members')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // dummy condition para afetar todos

      // Depois, inserir/atualizar os novos membros
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
          console.error('❌ Erro ao salvar membro:', member.name, error);
        }
      }

      setTeamMembers([...members]);
      console.log('✅ [useSupabaseTeamMembers] Membros salvos com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro crítico ao salvar membros:', error);
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
