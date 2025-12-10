import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { User, Employee } from '../../../shared/types';
import { usersAPI, employeesAPI } from '../../../shared/services/api';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (payload: { fullName: string; username: string; email: string; password: string; idNumber?: string; phone?: string }) => Promise<{ ok: boolean; message?: string }>;
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
        if (foundUser.role === 'librarian') {
          await ensureEmployeeForLibrarian(foundUser);
        }
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

  const ensureEmployeeForLibrarian = async (librarian: User) => {
    const employees = (await employeesAPI.getAll()).data;
    const match = employees.find((e) => (e.userId && e.userId === librarian.id) || e.email.toLowerCase() === librarian.email.toLowerCase());
    if (match) return;

    const [firstName, ...rest] = librarian.fullName.trim().split(' ');
    const lastName = rest.join(' ').trim() || firstName;

    const employee = new Employee(
      Date.now().toString(),
      firstName,
      lastName,
      librarian.email,
      '',
      'Bibliotecario',
      'circulation',
      new Date(),
      0,
      true
    );
    employee.userId = librarian.id;
    await employeesAPI.create(employee);
  };

  const register = async (payload: { fullName: string; username: string; email: string; password: string; idNumber?: string; phone?: string }): Promise<{ ok: boolean; message?: string }> => {
    setLoading(true);
    try {
      const existing = await usersAPI.getAll();
      const users = existing.data;
      const emailLower = payload.email.toLowerCase();
      const usernameLower = payload.username.toLowerCase();

      if (users.some((u: User) => u.username.toLowerCase() === usernameLower)) {
        return { ok: false, message: 'El nombre de usuario ya existe' };
      }
      if (users.some((u: User) => u.email.toLowerCase() === emailLower)) {
        return { ok: false, message: 'El correo ya está registrado' };
      }

      const isBibliotechMail = emailLower.endsWith('@bibliotech.com');
      const role: 'librarian' | 'member' = isBibliotechMail ? 'librarian' : 'member';

      const [firstName, ...rest] = payload.fullName.trim().split(' ');
      const lastName = rest.join(' ').trim() || firstName;

      const newUser = new User(
        Date.now().toString(),
        payload.username,
        payload.password,
        payload.email,
        role,
        payload.fullName,
        true
      );

      const response = await usersAPI.create(newUser);

      if (role === 'librarian') {
        const employee = new Employee(
          Date.now().toString(),
          firstName,
          lastName,
          payload.email,
          payload.phone || '',
          'Bibliotecario',
          'circulation',
          new Date(),
          0,
          true,
          payload.idNumber || ''
        );
        employee.userId = response.data.id;
        await employeesAPI.create(employee);
      }

      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return { ok: true };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { ok: false, message: 'No se pudo completar el registro. Intenta nuevamente.' };
    } finally {
      setLoading(false);
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

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'user') {
        const nextUser = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(nextUser);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading }}>
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
