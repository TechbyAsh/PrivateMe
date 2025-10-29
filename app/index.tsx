import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../src/components/Button';
import { Colors, Spacing, FontSizes, FontWeights } from '../src/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.content}>
        {/* Logo/Icon Placeholder */}
        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.logoText}>🔐</Text>
        </View>
        
        {/* App Name */}
        <Text style={[styles.appName, { color: colors.text }]}>PrivateMe</Text>
        
        {/* Tagline */}
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Your thoughts, truly private
        </Text>
        
        {/* Features */}
        <View style={styles.features}>
          <FeatureItem
            icon="🔒"
            text="End-to-end encrypted"
            colors={colors}
          />
          <FeatureItem
            icon="📱"
            text="Works offline"
            colors={colors}
          />
          <FeatureItem
            icon="☁️"
            text="Syncs everywhere"
            colors={colors}
          />
        </View>
      </View>
      
      {/* CTA Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/auth/signup')}
          size="large"
          fullWidth
        />
        
        <Button
          title="Sign In"
          onPress={() => router.push('/auth/login')}
          variant="ghost"
          size="large"
          fullWidth
          style={{ marginTop: Spacing.md }}
        />
      </View>
    </View>
  );
}

interface FeatureItemProps {
  icon: string;
  text: string;
  colors: typeof Colors.light;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, colors }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={[styles.featureText, { color: colors.textSecondary }]}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.xxxl,
    textAlign: 'center',
  },
  features: {
    width: '100%',
    gap: Spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureIcon: {
    fontSize: FontSizes.xxl,
  },
  featureText: {
    fontSize: FontSizes.md,
  },
  buttonContainer: {
    paddingBottom: Spacing.xxxl,
    width: '100%',
  },
});
