
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  profile: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
    profile, 
    loading, 
    signIn, 
    signOut, 
    isAdmin: supabaseIsAdmin,
    signUp: supabaseSignUp
  } = useSupabaseAuth();

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🔐 Tentativa de login:', email);
    
    try {
      const { data, error } = await signIn(email, password);
      if (!error && data.user) {
        console.log('✅ Login do Supabase bem-sucedido');
        return true;
      }
      console.log('❌ Falha no login do Supabase:', error);
      return false;
    } catch (error) {
      console.error('❌ Erro no login do Supabase:', error);
      return false;
    }
  };

  const logout = async () => {
    await signOut();
  };

  const isAdmin = () => {
    return supabaseIsAdmin();
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    return await supabaseSignUp(email, password, fullName);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      profile,
      loading,
      login, 
      logout,
      isAdmin,
      signUp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
