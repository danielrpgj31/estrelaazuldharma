import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, Content, StoredUser } from '../types/app';
import { db } from '../database/db';
import { derivePasswordHash, generateSalt } from '../database/crypto';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  contents: Content[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultAdminUsername = 'admin';
const defaultAdminEmail = 'admin@estrelaazul.org';
const defaultAdminPassword = 'admin123';

const defaultContents: Omit<Content, 'id'>[] = [
  {
    title: 'Os Mistérios da Estrela Azul',
    body: 'Conheça os segredos ocultos da antiga ordem que guarda a sabedoria da Estrela Azul...',
    authorId: 1,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Rituais e Cerimônias',
    body: 'Aprenda sobre os ritos sagrados praticados há séculos pelos nossos membros...',
    authorId: 1,
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const initialize = async () => {
      await db.open();
      const users = await db.getDecryptedUsers();
      if (!users.some((u) => u.username === defaultAdminUsername)) {
        const passwordSalt = generateSalt();
        const passwordHash = await derivePasswordHash(defaultAdminPassword, passwordSalt);
        const adminUser: StoredUser = {
          username: defaultAdminUsername,
          email: defaultAdminEmail,
          passwordSalt,
          passwordHash,
          createdAt: new Date().toISOString()
        };
        await db.addEncryptedUser(adminUser);
      }

      const contentsCount = await db.contents.count();
      if (contentsCount === 0) {
        await db.contents.bulkAdd(defaultContents);
      }

      const storedUser = await db.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }

      setContents(await db.contents.toArray());
    };

    initialize();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = await db.getDecryptedUsers();
    const foundUser = users.find((u) => u.username === username);
    if (!foundUser) {
      return false;
    }

    const passwordHash = await derivePasswordHash(password, foundUser.passwordSalt);
    if (passwordHash !== foundUser.passwordHash) {
      return false;
    }

    const safeUser: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt
    };
    setUser(safeUser);
    await db.setCurrentUser(safeUser);
    return true;
  };

  const logout = async () => {
    setUser(null);
    await db.clearCurrentUser();
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ): Promise<boolean> => {
    const users = await db.getDecryptedUsers();
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return false;
    }

    const passwordSalt = generateSalt();
    const newUser: StoredUser = {
      username,
      email,
      passwordSalt,
      passwordHash: await derivePasswordHash(password, passwordSalt),
      createdAt: new Date().toISOString()
    };

    await db.addEncryptedUser(newUser);
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
