import * as SecureStore from 'expo-secure-store';
import { Note } from '../types';

const ENCRYPTION_KEY = 'user_encryption_key';

export class EncryptionService {
  private async getEncryptionKey(): Promise<string> {
    let key = await SecureStore.getItemAsync(ENCRYPTION_KEY);
    
    if (!key) {
      key = this.generateKey();
      await SecureStore.setItemAsync(ENCRYPTION_KEY, key);
    }
    
    return key;
  }

  private generateKey(): string {
    const array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  async encryptNote(note: Note): Promise<string> {
    const noteData = JSON.stringify({
      id: note.id,
      userId: note.userId,
      title: note.title,
      content: note.content,
      tags: note.tags,
      isPinned: note.isPinned,
      color: note.color,
      version: note.version,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    });

    const base64Data = btoa(noteData);
    
    return base64Data;
  }

  async decryptNote(encryptedData: string): Promise<Partial<Note>> {
    const decryptedData = atob(encryptedData);
    const noteData = JSON.parse(decryptedData);
    
    return {
      ...noteData,
      createdAt: new Date(noteData.createdAt),
      updatedAt: new Date(noteData.updatedAt),
    };
  }
}

export const encryptionService = new EncryptionService();
