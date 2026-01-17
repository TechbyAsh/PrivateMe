import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export interface UploadNoteRequest {
  userId: string;
  noteId: string;
  encryptedData: string;
}

export interface UploadNoteResponse {
  success: boolean;
  message: string;
  key: string;
  etag: string;
}

export interface FetchNoteResponse {
  success: boolean;
  encryptedData: string;
  noteId: string;
  userId: string;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async uploadNote(
    userId: string,
    noteId: string,
    encryptedData: string
  ): Promise<UploadNoteResponse> {
    const response = await fetch(`${this.baseUrl}/notes/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        noteId,
        encryptedData,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload note');
    }

    return response.json();
  }

  async fetchNote(userId: string, noteId: string): Promise<FetchNoteResponse> {
    const response = await fetch(
      `${this.baseUrl}/notes/fetch?userId=${encodeURIComponent(userId)}&noteId=${encodeURIComponent(noteId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch note');
    }

    return response.json();
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/health`);
    
    if (!response.ok) {
      throw new Error('Health check failed');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
