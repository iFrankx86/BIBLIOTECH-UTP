import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { User } from '../models';
import { usersAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const foundUser = await usersAPI.login(username, password);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
