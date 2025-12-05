import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { ColorPicker } from '@/components/ColorPicker';
import { useCounter } from '@/context/CounterContext';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '@/constants/theme';
import { DEFAULT_GOALS } from '@/types/counter';
import { Feather } from '@expo/vector-icons';

export default function EditCounterScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { counters, activeCounterId, updateCounter } = useCounter();

  const activeCounter = useMemo(
    () => counters.find((c) => c.id === activeCounterId),
    [counters, activeCounterId]
  );

  const [name, setName] = useState(activeCounter?.name ?? '');
  const [goal, setGoal] = useState(activeCounter?.goal ?? 108);
  const [color, setColor] = useState(activeCounter?.color ?? '#6B4BA6');

  if (!activeCounter) {
    // Nothing to edit, return to previous screen
    navigation.goBack();
    return null;
  }

  const handleSave = () => {
    if (!name.trim() || !activeCounterId) return;

    updateCounter(activeCounterId, {
      name: name.trim(),
      goal,
      color,
    });

    navigation.goBack();
  };

  const canSave = name.trim().length > 0;

  return (
    <ThemedView style={styles.container}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.label}>Counter Name</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundSecondary,
                color: theme.text,
                borderColor: theme.backgroundTertiary,
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="e.g., Daily Practice"
            placeholderTextColor={theme.textSecondary}
            maxLength={20}
          />
          <ThemedText style={[styles.hint, { color: theme.textSecondary }]}>
            {name.length}/20 characters
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Goal Count</ThemedText>
          <View style={styles.goalButtons}>
            {DEFAULT_GOALS.map((presetGoal) => (
              <Pressable
                key={presetGoal}
                style={[
                  styles.goalButton,
                  {
                    backgroundColor:
                      goal === presetGoal ? theme.accent : theme.backgroundSecondary,
                    borderColor: theme.backgroundTertiary,
                  },
                ]}
                onPress={() => setGoal(presetGoal)}
              >
                <ThemedText
                  style={[
                    styles.goalButtonText,
                    { color: goal === presetGoal ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {presetGoal}
                </ThemedText>
              </Pressable>
            ))}
          </View>
          <View style={styles.customGoalContainer}>
            <ThemedText style={[styles.hint, { color: theme.textSecondary }]}>
              Or enter custom:
            </ThemedText>
            <TextInput
              style={[
                styles.customGoalInput,
                {
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.text,
                  borderColor: theme.backgroundTertiary,
                },
              ]}
              value={goal.toString()}
              onChangeText={(text) => {
                const num = parseInt(text, 10);
                if (!isNaN(num) && num > 0 && num <= 9999) {
                  setGoal(num);
                }
              }}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.label}>Theme Color</ThemedText>
          <ColorPicker selectedColor={color} onColorSelect={setColor} />
        </View>

        <View
          style={[
            styles.preview,
            { backgroundColor: theme.backgroundSecondary, borderColor: color },
          ]}
        >
          <ThemedText style={[styles.previewLabel, { color: theme.textSecondary }]}>
            Preview
          </ThemedText>
          <ThemedText style={[styles.previewName, { color }]}>
            {name || 'Counter Name'}
          </ThemedText>
          <ThemedText style={[styles.previewGoal, { color: theme.textSecondary }]}>
            Goal: {goal}
          </ThemedText>
        </View>

        <Pressable
          style={[
            styles.saveButton,
            {
              backgroundColor: canSave ? theme.accent : theme.backgroundTertiary,
            },
          ]}
          onPress={handleSave}
          disabled={!canSave}
        >
          <Feather name="save" size={20} color="#FFFFFF" />
          <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
        </Pressable>
      </ScreenKeyboardAwareScrollView>
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
  label: {
    ...Typography.h4,
  },
  input: {
    ...Typography.body,
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
  },
  hint: {
    ...Typography.small,
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
  customGoalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  customGoalInput: {
    ...Typography.body,
    width: 100,
    height: 44,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    textAlign: 'center',
  },
  preview: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    borderWidth: 3,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  previewLabel: {
    ...Typography.small,
    marginBottom: Spacing.sm,
  },
  previewName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  previewGoal: {
    ...Typography.body,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.lg,
  },
  saveButtonText: {
    ...Typography.buttonLabel,
    color: '#FFFFFF',
  },
});
