import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';

const NOTES_KEY = '@privateme_notes';

export class StorageService {
  async saveNote(note: Note): Promise<void> {
    const notes = await this.getAllNotes();
    const index = notes.findIndex(n => n.id === note.id);
    
    if (index >= 0) {
      notes[index] = note;
    } else {
      notes.push(note);
    }
    
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }

  async getNote(noteId: string): Promise<Note | null> {
    const notes = await this.getAllNotes();
    return notes.find(n => n.id === noteId) || null;
  }

  async getAllNotes(): Promise<Note[]> {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    
    if (!data) {
      return [];
    }
    
    const notes = JSON.parse(data);
    return notes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
      deletedAt: note.deletedAt ? new Date(note.deletedAt) : undefined,
    }));
  }

  async deleteNote(noteId: string): Promise<void> {
    const notes = await this.getAllNotes();
    const filtered = notes.filter(n => n.id !== noteId);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  }

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(NOTES_KEY);
  }
}

export const storageService = new StorageService();
