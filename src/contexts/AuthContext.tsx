
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  profile: any;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciais locais como fallback
const LOCAL_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'stadv2024'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocalAuth, setIsLocalAuth] = useState(false);
  const { 
    user, 
    profile, 
    loading, 
    signIn, 
    signOut, 
    isAdmin: supabaseIsAdmin,
    signUp: supabaseSignUp
  } = useSupabaseAuth();

  useEffect(() => {
    // Check for local auth
    const localAuth = localStorage.getItem('isAdminAuthenticated');
    if (localAuth === 'true' && !user) {
      setIsLocalAuth(true);
    }
  }, [user]);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', username);
    
    // Try Supabase auth first
    if (username.includes('@')) {
      try {
        const { data, error } = await signIn(username, password);
        if (!error && data.user) {
          console.log('Supabase login successful');
          setIsLocalAuth(false);
          localStorage.removeItem('isAdminAuthenticated');
          return true;
        }
        console.log('Supabase login failed:', error);
      } catch (error) {
        console.error('Supabase login error:', error);
      }
    }
    
    // Fallback to local credentials
    if (username === LOCAL_ADMIN_CREDENTIALS.username && password === LOCAL_ADMIN_CREDENTIALS.password) {
      console.log('Local admin login successful');
      setIsLocalAuth(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      return true;
    }
    
    return false;
  };

  const logout = async () => {
    if (user) {
      await signOut();
    }
    setIsLocalAuth(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  const isAdmin = () => {
    return supabaseIsAdmin() || isLocalAuth;
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    return await supabaseSignUp(email, password, fullName);
  };

  const isAuthenticated = !!user || isLocalAuth;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user: user || (isLocalAuth ? { email: 'admin@local' } : null),
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
