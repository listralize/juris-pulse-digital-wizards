
import { useSupabaseDataNew } from './useSupabaseDataNew';
import { useSupabaseBlog } from './supabase/useSupabaseBlog';

export const useAdminData = () => {
  const {
    servicePages,
    categories,
    teamMembers,
    pageTexts,
    isLoading: dataLoading,
    saveServicePages,
    saveCategories,
    saveTeamMembers,
    savePageTexts,
    setServicePages,
    setTeamMembers,
    setPageTexts,
    refreshData
  } = useSupabaseDataNew();

  const {
    blogPosts,
    isLoading: blogLoading,
    saveBlogPosts
  } = useSupabaseBlog();

  const isLoading = dataLoading || blogLoading;

  return {
    servicePages,
    categories,
    teamMembers,
    pageTexts,
    blogPosts,
    isLoading,
    saveServicePages,
    saveCategories,
    saveTeamMembers,
    savePageTexts,
    saveBlogPosts,
    setServicePages,
    setTeamMembers,
    setPageTexts,
    refreshData
  };
};
