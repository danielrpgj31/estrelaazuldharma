import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

export interface Content {
  id?: number;
  title: string;
  body: string;
  authorId: number;
  createdAt: Date;
}

const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  if (!users) {
    const defaultUsers: User[] = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        email: 'admin@estrelaazul.org',
        createdAt: new Date()
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(users);
};

const getContents = (): Content[] => {
  const contents = localStorage.getItem('contents');
  if (!contents) {
    const defaultContents: Content[] = [
      {
        id: 1,
        title: 'Os Mistérios da Estrela Azul',
        body: 'Conheça os segredos ocultos da antiga ordem que guarda a sabedoria da Estrela Azul...',
        authorId: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        title: 'Rituais e Cerimônias',
        body: 'Aprenda sobre os ritos sagrados praticados há séculos pelos nossos membros...',
        authorId: 1,
        createdAt: new Date()
      }
    ];
    localStorage.setItem('contents', JSON.stringify(defaultContents));
    return defaultContents;
  }
  return JSON.parse(contents);
};

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string, email: string) => boolean;
  contents: Content[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    getUsers();
    setContents(getContents());
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const users = getUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (username: string, password: string, email: string): boolean => {
    const users = getUsers();
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return false;
    }
    const newUser: User = {
      id: users.length + 1,
      username,
      password,
      email,
      createdAt: new Date()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, contents }}>
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
