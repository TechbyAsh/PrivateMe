import { Note } from '../types';
import { apiService } from './api';
import { encryptionService } from './encryption';
import { storageService } from './storage';

export class SyncService {
  async syncNoteToS3(note: Note, userId: string): Promise<void> {
    try {
      const encryptedData = await encryptionService.encryptNote(note);
      
      await apiService.uploadNote(userId, note.id, encryptedData);
      
      const updatedNote = {
        ...note,
        syncStatus: 'synced' as const,
        updatedAt: new Date(),
      };
      
      await storageService.saveNote(updatedNote);
      
      console.log(`✅ Note ${note.id} synced to S3`);
    } catch (error) {
      console.error('Failed to sync note:', error);
      
      const updatedNote = {
        ...note,
        syncStatus: 'pending_sync' as const,
      };
      
      await storageService.saveNote(updatedNote);
      
      throw error;
    }
  }

  async fetchNoteFromS3(noteId: string, userId: string): Promise<Note | null> {
    try {
      const response = await apiService.fetchNote(userId, noteId);
      
      const decryptedData = await encryptionService.decryptNote(response.encryptedData);
      
      const note: Note = {
        id: decryptedData.id!,
        userId: decryptedData.userId!,
        title: decryptedData.title!,
        content: decryptedData.content!,
        tags: decryptedData.tags || [],
        isPinned: decryptedData.isPinned || false,
        color: decryptedData.color,
        version: decryptedData.version || 1,
        createdAt: decryptedData.createdAt!,
        updatedAt: decryptedData.updatedAt!,
        syncStatus: 'synced',
        isEncrypted: true,
      };
      
      await storageService.saveNote(note);
      
      return note;
    } catch (error) {
      console.error('Failed to fetch note from S3:', error);
      return null;
    }
  }

  async syncAllPendingNotes(userId: string): Promise<void> {
    const notes = await storageService.getAllNotes();
    const pendingNotes = notes.filter(n => n.syncStatus === 'pending_sync');
    
    for (const note of pendingNotes) {
      try {
        await this.syncNoteToS3(note, userId);
      } catch (error) {
        console.error(`Failed to sync note ${note.id}:`, error);
      }
    }
  }
}

export const syncService = new SyncService();
