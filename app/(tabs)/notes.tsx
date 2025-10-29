import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NoteCard } from '../../src/components/NoteCard';
import { Note } from '../../src/types';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../../src/constants/theme';

// Sample data for demonstration
const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Welcome to PrivateMe',
    content: 'This is your first note! All your notes are stored securely and encrypted. Start writing your thoughts here.',
    tags: ['welcome', 'tutorial'],
    isPinned: true,
    color: 'purple',
    version: 1,
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-17'),
    syncStatus: 'synced',
    isEncrypted: false,
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Shopping List',
    content: 'Milk, Eggs, Bread, Coffee, Fruits, Vegetables',
    tags: ['personal'],
    isPinned: false,
    color: 'green',
    version: 1,
    createdAt: new Date('2025-10-16'),
    updatedAt: new Date('2025-10-16'),
    syncStatus: 'synced',
    isEncrypted: false,
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Project Ideas',
    content: 'Build a mobile app for tracking habits. Create a personal finance dashboard. Learn machine learning basics.',
    tags: ['work', 'ideas'],
    isPinned: false,
    color: 'blue',
    version: 1,
    createdAt: new Date('2025-10-14'),
    updatedAt: new Date('2025-10-15'),
    syncStatus: 'pending_sync',
    isEncrypted: false,
  },
];

export default function NotesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [notes] = useState<Note[]>(SAMPLE_NOTES);

  const handleNotePress = (noteId: string) => {
    // TODO: Navigate to note editor
    console.log('Open note:', noteId);
  };

  const handleCreateNote = () => {
    // TODO: Navigate to new note screen
    console.log('Create new note');
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
