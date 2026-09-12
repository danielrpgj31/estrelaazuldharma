export interface User {
  id?: number;
  username: string;
  email: string;
  createdAt: string;
  accessLevel: number;
}

export interface StoredUser extends User {
  passwordHash: string;
  passwordSalt: string;
}

export interface Content {
  id?: number;
  title: string;
  body: string;
  authorId: number;
  createdAt: string;
  thumbnailUrl?: string;
  youtubeUrl?: string;
}
