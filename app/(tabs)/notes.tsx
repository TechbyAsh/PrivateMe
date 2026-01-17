import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NoteCard } from '../../src/components/NoteCard';
import { Note } from '../../src/types';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../../src/constants/theme';
import { storageService } from '../../src/services/storage';
import { syncService } from '../../src/services/sync';

export default function NotesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const userId = 'user-123';

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const allNotes = await storageService.getAllNotes();
      const sortedNotes = allNotes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      });
      setNotes(sortedNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await syncService.syncAllPendingNotes(userId);
      await loadNotes();
    } catch (error) {
      console.error('Failed to sync notes:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleNotePress = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  const handleCreateNote = () => {
    router.push('/notes/new');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No notes yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Tap the + button to create your first note
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            PrivateMe
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            {notes.filter(n => n.syncStatus === 'pending_sync').length > 0 && 
              ` • ${notes.filter(n => n.syncStatus === 'pending_sync').length} pending sync`}
          </Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={{ fontSize: 20 }}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => handleNotePress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: colors.primary },
          Shadows.lg,
        ]}
        onPress={handleCreateNote}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.xxxl,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs / 2,
  },
  searchButton: {
    padding: Spacing.sm,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 100, // Space for FAB
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl + 60, // Above tab bar
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
