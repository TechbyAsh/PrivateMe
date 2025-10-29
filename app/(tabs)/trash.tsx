import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, Spacing, FontSizes } from '../../src/constants/theme';

export default function TrashScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View style={styles.content}>
        <Text style={styles.icon}>🗑️</Text>
        <Text style={[styles.title, { color: colors.text }]}>Trash</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Deleted notes are stored here for 30 days
        </Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No deleted notes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  icon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSizes.sm,
  },
});
