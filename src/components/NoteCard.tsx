import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { format } from 'date-fns';
import { Note } from '../types';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows, NoteColors } from '../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onLongPress?: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, onLongPress }) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const noteColorScheme = colorScheme === 'dark' ? 'dark' : 'light';
  
  const accentColor = note.color 
    ? NoteColors[note.color][noteColorScheme]
    : colors.border;

  const getPreview = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { 
          backgroundColor: colors.surface,
          borderLeftColor: accentColor,
        },
        Shadows.sm,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text 
          style={[styles.title, { color: colors.text }]} 
          numberOfLines={1}
        >
          {note.title || 'Untitled'}
        </Text>
        {note.isPinned && <Text style={styles.pinIcon}>📌</Text>}
      </View>

      {note.content && (
        <Text 
          style={[styles.content, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {getPreview(note.content)}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {format(note.updatedAt, 'MMM d, yyyy')}
        </Text>
        
        {note.tags.length > 0 && (
          <View style={styles.tags}>
            {note.tags.slice(0, 2).map((tag, index) => (
              <View 
                key={index}
                style={[styles.tag, { backgroundColor: colors.border }]}
              >
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                  {tag}
                </Text>
              </View>
            ))}
            {note.tags.length > 2 && (
              <Text style={[styles.moreText, { color: colors.textSecondary }]}>
                +{note.tags.length - 2}
              </Text>
            )}
          </View>
        )}
      </View>

      {note.syncStatus !== 'synced' && (
        <View style={styles.syncBadge}>
          <Text style={styles.syncIcon}>
            {note.syncStatus === 'pending_sync' ? '⟳' : '⚠️'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    flex: 1,
  },
  pinIcon: {
    fontSize: FontSizes.md,
    marginLeft: Spacing.sm,
  },
  content: {
    fontSize: FontSizes.md,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: FontSizes.xs,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  tagText: {
    fontSize: FontSizes.xs,
  },
  moreText: {
    fontSize: FontSizes.xs,
  },
  syncBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  syncIcon: {
    fontSize: FontSizes.sm,
  },
});
