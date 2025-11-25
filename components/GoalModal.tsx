import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';

interface GoalModalProps {
  visible: boolean;
  count: number;
  goal: number;
  onContinue: () => void;
  onReset: () => void;
}

export function GoalModal({ visible, count, goal, onContinue, onReset }: GoalModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinue}
    >
      <View style={styles.overlay}>
        <ThemedView style={[styles.modal, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.iconContainer}>
            <Feather name="check-circle" size={64} color={theme.success} />
          </View>
          
          <ThemedText style={styles.title}>Goal Reached!</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            You've completed {count} out of {goal}
          </ThemedText>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={onContinue}
            >
              <ThemedText style={[styles.buttonText, { color: '#FFFFFF' }]}>
                Continue Counting
              </ThemedText>
            </Pressable>

            <Pressable
              style={[styles.button, styles.secondaryButton, { borderColor: theme.primary }]}
              onPress={onReset}
            >
              <ThemedText style={[styles.buttonText, { color: theme.primary }]}>
                Reset Counter
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  button: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    ...Typography.buttonLabel,
  },
});
