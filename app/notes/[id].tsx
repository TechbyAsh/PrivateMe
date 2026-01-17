import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import { Note } from '../../src/types';
import { Colors, Spacing, FontSizes } from '../../src/constants/theme';
import { storageService } from '../../src/services/storage';
import { syncService } from '../../src/services/sync';

export default function NoteEditorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending_sync' | 'syncing'>('synced');

  const isNewNote = id === 'new';
  const userId = 'user-123';

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async () => {
    if (isNewNote) {
      setIsLoading(false);
      return;
    }

    try {
      const note = await storageService.getNote(id as string);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        const status = note.syncStatus === 'conflict' ? 'pending_sync' : note.syncStatus;
        setSyncStatus(status as 'synced' | 'pending_sync' | 'syncing');
      }
    } catch (error) {
      console.error('Failed to load note:', error);
      Alert.alert('Error', 'Failed to load note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty Note', 'Please add a title or content');
      return;
    }

    setIsSaving(true);
    setSyncStatus('syncing');

    try {
      const noteId = isNewNote ? uuid.v4() as string : (id as string);
      const now = new Date();

      const note: Note = {
        id: noteId,
        userId,
        title: title.trim() || 'Untitled',
        content: content.trim(),
        tags: [],
        isPinned: false,
        version: 1,
        createdAt: isNewNote ? now : (await storageService.getNote(noteId))?.createdAt || now,
        updatedAt: now,
        syncStatus: 'pending_sync',
        isEncrypted: false,
      };

      await storageService.saveNote(note);

      try {
        await syncService.syncNoteToS3(note, userId);
        setSyncStatus('synced');
        Alert.alert('Success', 'Note saved and synced to cloud!');
      } catch (syncError) {
        setSyncStatus('pending_sync');
        Alert.alert('Saved Locally', 'Note saved locally. Will sync when online.');
      }

      if (isNewNote) {
        router.replace('/(tabs)/notes');
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      Alert.alert('Error', 'Failed to save note');
      setSyncStatus('pending_sync');
    } finally {
      setIsSaving(false);
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'synced':
        return '✓';
      case 'syncing':
        return '⟳';
      case 'pending_sync':
        return '⚠';
      default:
        return '';
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'synced':
        return '#48BB78';
      case 'syncing':
        return '#4299E1';
      case 'pending_sync':
        return '#ED8936';
      default:
        return colors.textSecondary;
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {isNewNote ? 'New Note' : 'Edit Note'}
          </Text>
          <View style={styles.syncStatusContainer}>
            <Text style={[styles.syncStatus, { color: getSyncStatusColor() }]}>
              {getSyncStatusIcon()} {syncStatus === 'synced' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Pending'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.editor}
        contentContainerStyle={styles.editorContent}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={[styles.titleInput, { color: colors.text }]}
          placeholder="Note title"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          autoFocus={isNewNote}
        />
        
        <TextInput
          style={[styles.contentInput, { color: colors.text }]}
          placeholder="Start writing..."
          placeholderTextColor={colors.textSecondary}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingTop: Spacing.xxxl,
  },
  headerButton: {
    padding: Spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  syncStatusContainer: {
    marginTop: Spacing.xs / 2,
  },
  syncStatus: {
    fontSize: FontSizes.xs,
  },
  saveButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  editor: {
    flex: 1,
  },
  editorContent: {
    padding: Spacing.lg,
  },
  titleInput: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  contentInput: {
    fontSize: FontSizes.md,
    lineHeight: 24,
    minHeight: 400,
  },
});
