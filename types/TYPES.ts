// User data types

export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  emailVerified?: Date;
  image?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  accounts: Account[];
  sessions: Session[];
  Authenticator: Authenticator[]; // Optional WebAuthn support
  userSettings?: UserSetting;
  notes: Note[];
  noteTags: NoteTag[];
  noteHistory: NoteHistory[];

  // Optional user settings
  Tag: Tag[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;

  createdAt: Date;
  updatedAt: Date;

  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;

  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

// Optional WebAuthn support
export interface Authenticator {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string;

  user: User;
}

export interface UserSetting {
  userId: string;
  colorTheme: "light" | "dark";
  fontTheme: string;

  user: User;
}

export interface Note {
  id: string;
  noteId?: string;
  userId: string;
  title: string;
  content: string;
  archived: true | false;
  parentNoteId?: string; // Optional for nested notes
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user: User;
  parent?: Note;
  children: Note[];

  noteTags: NoteTag[];
  noteHistory: NoteHistory[];
}

export interface NoteTag {
  id: string;
  noteId: string;
  tagId: string;
  assignedAt: Date;

  note: Note;
  tag: Tag;
  User?: User;
  userId?: string;
  // Optional userId for user-specific tags
}

export interface Tag {
  tagId: string;
  name: string;
  userId?: string;

  // Relations
  user?: User;
  noteTags: NoteTag[];
}

export interface NoteHistory {
  historyId: string;
  noteId: string;
  versionNumber: number;
  contentSnapshot: string;
  updatedAt: Date;

  note: Note;
  User?: User;
  userId?: string;
}
