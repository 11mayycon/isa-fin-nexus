import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  matricula: string;
  name: string;
  email?: string;
  phone: string;
  balance: number;
  plan_type: string;
  subscription_status: string;
}

interface AuthContextType {
  user: User | null;
  login: (matricula: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (matricula: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('matricula', matricula)
        .maybeSingle();

      if (error || !data) {
        return { success: false, error: 'Matrícula não encontrada' };
      }

      const userData: User = {
        id: data.id,
        matricula: data.matricula,
        name: data.name,
        email: data.email,
        phone: data.phone,
        balance: Number(data.balance) || 0,
        plan_type: data.plan_type || 'free',
        subscription_status: data.subscription_status || 'inactive',
      };

      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erro interno do servidor' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}