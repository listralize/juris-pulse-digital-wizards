import { useContext } from 'react';
import { SupabaseDataContext, SupabaseDataContextType } from '../contexts/SupabaseDataContext';

export const useSupabaseData = (): SupabaseDataContextType => {
  const context = useContext(SupabaseDataContext);
  if (!context) {
    throw new Error('useSupabaseData must be used within a SupabaseDataProvider');
  }
  return context;
};
