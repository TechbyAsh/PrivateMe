export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  biometricEnabled: boolean;
  e2eeEnabled: boolean;
  autoLockMinutes: number;
  theme: 'light' | 'dark' | 'system';
  noteView: 'grid' | 'list';
  fontSize: 'small' | 'medium' | 'large';
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  color?: NoteColor;
  
  // Sync metadata
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  syncStatus: SyncStatus;
  
  // E2EE metadata (future)
  isEncrypted: boolean;
  encryptionIV?: string;
}

export type SyncStatus = 'synced' | 'pending_sync' | 'conflict';

export type NoteColor = 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

export interface SyncState {
  lastSyncAt: Date | null;
  pendingChanges: number;
  conflictCount: number;
  isSyncing: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  noteCount: number;
}
