import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { User } from '../models';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios por defecto para demostración
const defaultUsers: User[] = [
  new User('1', 'admin', 'admin123', 'admin@bibliotech.com', 'admin', 'Administrador BiblioTech', true),
  new User('2', 'librarian', 'lib123', 'librarian@bibliotech.com', 'librarian', 'Bibliotecario Principal', true),
  new User('3', 'member', 'mem123', 'member@bibliotech.com', 'member', 'Usuario Miembro', true),
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const foundUser = defaultUsers.find(
      (u) => u.username === username && u.password === password && u.active
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
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
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
