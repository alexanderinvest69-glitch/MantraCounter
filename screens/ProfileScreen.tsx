import React from 'react';
import { View, StyleSheet, TextInput, Pressable, Switch, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { AvatarPicker } from '@/components/AvatarPicker';
import { useCounter } from '@/context/CounterContext';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '@/constants/theme';
import { DEFAULT_GOALS } from '@/types/counter';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { settings, updateSettings } = useCounter();

  return (
    <ThemedView style={styles.container}>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Avatar</ThemedText>
          <AvatarPicker
            selectedAvatar={settings.avatar}
            onAvatarSelect={(avatar) => updateSettings({ avatar })}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Display Name</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: theme.backgroundTertiary,
              },
            ]}
            value={settings.displayName}
            onChangeText={(text) => updateSettings({ displayName: text })}
            placeholder="Your Name"
            placeholderTextColor={theme.textSecondary}
            maxLength={30}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
          
          <View style={[styles.settingRow, { backgroundColor: theme.backgroundSecondary }]}>
            <View style={styles.settingInfo}>
              <Feather name="smartphone" size={20} color={theme.text} />
              <ThemedText style={styles.settingLabel}>Haptic Feedback</ThemedText>
            </View>
            <Switch
              value={settings.hapticEnabled}
              onValueChange={(value) => updateSettings({ hapticEnabled: value })}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary }}
            />
          </View>

          <View style={[styles.settingRow, { backgroundColor: theme.backgroundSecondary }]}>
            <View style={styles.settingInfo}>
              <Feather name="volume-2" size={20} color={theme.text} />
              <ThemedText style={styles.settingLabel}>Sound Feedback</ThemedText>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSettings({ soundEnabled: value })}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Default Goal Count</ThemedText>
          <View style={styles.goalButtons}>
            {DEFAULT_GOALS.map((goal) => (
              <Pressable
                key={goal}
                style={[
                  styles.goalButton,
                  {
                    backgroundColor: settings.defaultGoal === goal ? theme.primary : theme.backgroundSecondary,
                    borderColor: theme.backgroundTertiary,
                  },
                ]}
                onPress={() => updateSettings({ defaultGoal: goal })}
              >
                <ThemedText
                  style={[
                    styles.goalButtonText,
                    { color: settings.defaultGoal === goal ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {goal}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.infoSection, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="volume-2" size={20} color={theme.primary} />
          <View style={styles.infoText}>
            <ThemedText style={[styles.infoDescription, { color: theme.textSecondary }]}>
              Use your device's volume buttons to increment (volume up) and decrement (volume down) your counter during meditation.
            </ThemedText>
          </View>
        </View>

        <View style={[styles.aboutSection, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="info" size={24} color={theme.primary} />
          <View style={styles.aboutText}>
            <ThemedText style={styles.aboutTitle}>About Mantra Counter</ThemedText>
            <ThemedText style={[styles.aboutDescription, { color: theme.textSecondary }]}>
              A mindful counting companion for your meditation practice. Track your mantras with ease and focus.
            </ThemedText>
          </View>
        </View>

        <Pressable onPress={() => Linking.openURL('https://buymeacoffee.com/orbitofhope')}>
          <View style={[styles.aboutSection, { backgroundColor: theme.backgroundSecondary }]}>
            <Feather name="coffee" size={24} color={theme.primary} />
            <View style={styles.aboutText}>
              <ThemedText style={styles.aboutTitle}>Enjoying the app?</ThemedText>
              <ThemedText style={[styles.aboutDescription, { color: theme.textSecondary }]}>
                If this app is helpful to you then please support me for more at buymeacoffee.com/orbitofhope
              </ThemedText>
            </View>
          </View>
        </Pressable>
      </ScreenScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.xl,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
  },
  input: {
    ...Typography.body,
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingLabel: {
    ...Typography.body,
  },
  goalButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  goalButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  goalButtonText: {
    ...Typography.buttonLabel,
  },
  infoSection: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
  },
  infoDescription: {
    ...Typography.small,
    lineHeight: 20,
  },
  aboutSection: {
    flexDirection: 'row',
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  aboutText: {
    flex: 1,
    gap: Spacing.xs,
  },
  aboutTitle: {
    ...Typography.h4,
  },
  aboutDescription: {
    ...Typography.small,
  },
});
