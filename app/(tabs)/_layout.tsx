import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../src/constants/theme';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <TabIcon icon="📝" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          title: 'Tags',
          tabBarIcon: ({ color }) => <TabIcon icon="🏷️" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          title: 'Trash',
          tabBarIcon: ({ color }) => <TabIcon icon="🗑️" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabIcon icon="⚙️" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Simple icon component using emoji
const TabIcon = ({ icon, color }: { icon: string; color: string }) => (
  <span style={{ fontSize: 24 }}>{icon}</span>
);
