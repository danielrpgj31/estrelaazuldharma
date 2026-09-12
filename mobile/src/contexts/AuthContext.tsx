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
  unlockNextLevel: () => Promise<void>;
  hasMinimumLevel: (requiredLevel: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultAdminUsername = 'admin';
const defaultAdminEmail = 'admin@estrelaazul.org';
const defaultAdminPassword = 'admin123';
const LEVEL_ONE = 1;

const defaultContents: Omit<Content, 'id'>[] = [
  {
    title: 'Os Mistérios da Estrela Azul',
    body: 'Conheça os segredos ocultos da antiga ordem que guarda a sabedoria da Estrela Azul...',
    authorId: 1,
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Rituais e Cerimônias',
    body: 'Aprenda sobre os ritos sagrados praticados há séculos pelos nossos membros...',
    authorId: 1,
    thumbnailUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Introdução Nível 1 - Vídeo Exclusivo',
    body: 'Assista à introdução especial do Instituto com reflexões e orientações para sua jornada interna.',
    authorId: 1,
    thumbnailUrl: 'https://img.youtube.com/vi/cyQ-W5dORz8/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=cyQ-W5dORz8',
    createdAt: new Date().toISOString()
  }
];

const ensureAccessLevel = (u: User | StoredUser): number => {
  const lvl = Number((u as StoredUser).accessLevel);
  return Number.isFinite(lvl) && lvl >= 1 ? lvl : LEVEL_ONE;
};

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
          passwordHash,
          passwordSalt,
          createdAt: new Date().toISOString(),
          accessLevel: LEVEL_ONE
        };
        await db.addEncryptedUser(adminUser);
      }

      const contentsCount = await db.contents.count();
      if (contentsCount === 0) {
        await db.contents.bulkAdd(defaultContents);
      }

      const storedUser = await db.getCurrentUser();
      if (storedUser) {
        const migrated: User = {
          ...storedUser,
          accessLevel: ensureAccessLevel(storedUser)
        };
        setUser(migrated);
        await db.setCurrentUser(migrated);
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

    const accessLevel = ensureAccessLevel(foundUser);
    const safeUser: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      accessLevel
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
      createdAt: new Date().toISOString(),
      accessLevel: LEVEL_ONE
    };

    await db.addEncryptedUser(newUser);
    return true;
  };

  const unlockNextLevel = async () => {
    if (!user || !user.id) return;

    const currentLevel = ensureAccessLevel(user);
    const newLevel = Math.min(currentLevel + 1, 3);
    if (newLevel === currentLevel) return;

    const updated: User = { ...user, accessLevel: newLevel };
    await db.updateEncryptedUserAccessLevel(user.id, newLevel);
    await db.setCurrentUser(updated);
    setUser(updated);
  };

  const hasMinimumLevel = (requiredLevel: number) => {
    if (!user) return false;
    return ensureAccessLevel(user) >= requiredLevel;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        contents,
        unlockNextLevel,
        hasMinimumLevel
      }}
    >
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
