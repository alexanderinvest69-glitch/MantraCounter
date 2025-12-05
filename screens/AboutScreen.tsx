import React from "react";
import { StyleSheet, Pressable, Linking } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

export default function AboutScreen() {
  const { theme } = useTheme();

  return (
    <ThemedView style={[styles.container]}>
      <ThemedText style={[styles.title]}>About Us</ThemedText>
      <Pressable
        accessibilityRole="link"
        onPress={() => Linking.openURL('https://buymeacoffee.com/orbitofhope')}
        style={[styles.donateButton, { backgroundColor: theme.cta }]}
      >
        <Feather name="coffee" size={20} color="#1F1F1F" />
        <ThemedText style={styles.donateLabel}>Love at first tap? How about a coffee 😉</ThemedText>
      </Pressable>
      <ThemedText style={[styles.paragraph, { color: theme.textSecondary }]}>
        Just Counter helps you focus on your practice with a clean, minimal experience.
        Set a goal, tap to count, and enjoy gentle feedback when you reach it.
      </ThemedText>
      <ThemedText style={[styles.paragraph, { color: theme.textSecondary }]}>
        Built with care to be distraction-free and soothing. We hope it supports your journey.
      </ThemedText>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    textAlign: "center",
  },
  paragraph: {
    ...Typography.body,
    textAlign: "center",
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  donateLabel: {
    ...Typography.buttonLabel,
    color: "#1F1F1F",
  },
});
