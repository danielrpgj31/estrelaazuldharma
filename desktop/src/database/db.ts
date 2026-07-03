import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { User, StoredUser, Content } from '../types/app';
import { encryptData, decryptData } from './crypto';

export interface EncryptedUserRow {
  id?: number;
  encrypted: string;
  iv: string;
}

export interface SessionRow {
  id?: number;
  encrypted: string;
  iv: string;
}

export class AppDatabase extends Dexie {
  users!: Table<EncryptedUserRow, number>;
  contents!: Table<Content, number>;
  session!: Table<SessionRow, number>;

  constructor() {
    super('EstrelaAzulDharmaDB');
    this.version(1).stores({
      users: '++id',
      contents: '++id, title, authorId',
      session: '++id'
    });
  }

  async addEncryptedUser(user: StoredUser) {
    const encrypted = await encryptData(JSON.stringify(user));
    return this.users.add({
      encrypted: encrypted.ciphertext,
      iv: encrypted.iv
    });
  }

  async getDecryptedUsers(): Promise<StoredUser[]> {
    const rows = await this.users.toArray();
    const decryptedUsers: StoredUser[] = [];

    for (const row of rows) {
      try {
        const decrypted = await decryptData(row.encrypted, row.iv);
        const parsed = JSON.parse(decrypted) as StoredUser;
        decryptedUsers.push(parsed);
      } catch {
        // ignore invalid rows
      }
    }

    return decryptedUsers;
  }

  async setCurrentUser(user: User) {
    const encrypted = await encryptData(JSON.stringify(user));
    const existing = await this.session.toArray();
    if (existing.length > 0 && existing[0].id) {
      return this.session.update(existing[0].id, {
        encrypted: encrypted.ciphertext,
        iv: encrypted.iv
      });
    }
    return this.session.add({
      encrypted: encrypted.ciphertext,
      iv: encrypted.iv
    });
  }

  async getCurrentUser(): Promise<User | null> {
    const row = await this.session.toCollection().first();
    if (!row) {
      return null;
    }
    try {
      const decrypted = await decryptData(row.encrypted, row.iv);
      return JSON.parse(decrypted) as User;
    } catch {
      return null;
    }
  }

  async clearCurrentUser() {
    return this.session.clear();
  }
}

export const db = new AppDatabase();
