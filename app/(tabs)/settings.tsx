import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../src/constants/theme';

interface SettingsItemProps {
  title: string;
  value?: string;
  onPress: () => void;
  colors: typeof Colors.light;
  showChevron?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  value,
  onPress,
  colors,
  showChevron = true,
}) => (
  <TouchableOpacity
    style={[styles.settingsItem, { backgroundColor: colors.surface }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.settingsItemTitle, { color: colors.text }]}>
      {title}
    </Text>
    <View style={styles.settingsItemRight}>
      {value && (
        <Text style={[styles.settingsItemValue, { color: colors.textSecondary }]}>
          {value}
        </Text>
      )}
      {showChevron && (
        <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
      )}
    </View>
  </TouchableOpacity>
);

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  colors: typeof Colors.light;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, colors }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
      {title}
    </Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleSignOut = () => {
    // TODO: Implement sign out
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Account Section */}
        <SettingsSection title="ACCOUNT" colors={colors}>
          <SettingsItem
            title="Email"
            value="user@example.com"
            onPress={() => {}}
            colors={colors}
            showChevron={false}
          />
          <SettingsItem
            title="Display Name"
            value="Not set"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="Change Password"
            onPress={() => {}}
            colors={colors}
          />
        </SettingsSection>

        {/* Security Section */}
        <SettingsSection title="SECURITY" colors={colors}>
          <SettingsItem
            title="Biometric Unlock"
            value="Off"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="Auto-Lock"
            value="5 minutes"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="End-to-End Encryption"
            value="Coming soon"
            onPress={() => {}}
            colors={colors}
            showChevron={false}
          />
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="APPEARANCE" colors={colors}>
          <SettingsItem
            title="Theme"
            value="System"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="Note View"
            value="List"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="Font Size"
            value="Medium"
            onPress={() => {}}
            colors={colors}
          />
        </SettingsSection>

        {/* Data & Sync Section */}
        <SettingsSection title="DATA & SYNC" colors={colors}>
          <SettingsItem
            title="Last Sync"
            value="Just now"
            onPress={() => {}}
            colors={colors}
            showChevron={false}
          />
          <SettingsItem
            title="Sync Now"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="Export Notes"
            onPress={() => {}}
            colors={colors}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="ABOUT" colors={colors}>
          <SettingsItem
            title="App Version"
            value="1.0.0"
            onPress={() => {}}
            colors={colors}
            showChevron={false}
          />
          <SettingsItem
            title="Privacy Policy"
            onPress={() => {}}
            colors={colors}
          />
          <SettingsItem
            title="Terms of Service"
            onPress={() => {}}
            colors={colors}
          />
        </SettingsSection>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={[styles.signOutButton, { backgroundColor: colors.error }]}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    letterSpacing: 0.5,
  },
  sectionContent: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingsItemTitle: {
    fontSize: FontSizes.md,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingsItemValue: {
    fontSize: FontSizes.md,
  },
  chevron: {
    fontSize: FontSizes.xxl,
    fontWeight: '300',
  },
  signOutButton: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
