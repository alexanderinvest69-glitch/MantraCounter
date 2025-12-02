import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Modal, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CircularProgress } from '@/components/CircularProgress';
import { GoalModal } from '@/components/GoalModal';
import { Button } from '@/components/Button';
import { useCounter } from '@/context/CounterContext';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');
const HEADER_HEIGHT = 96;
const TAB_BAR_HEIGHT = 80;

export default function CountersScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { counters, activeCounterId, settings, incrementCount, decrementCount, resetCount } = useCounter();
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const previousCountRef = useRef(0);
  
  const scale = useSharedValue(1);

  const activeCounter = counters.find(c => c.id === activeCounterId);
  
  useEffect(() => {
    if (activeCounter && previousCountRef.current < activeCounter.goal && activeCounter.count >= activeCounter.goal) {
      setShowGoalModal(true);
      if (settings.hapticEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
    if (activeCounter) {
      previousCountRef.current = activeCounter.count;
    }
  }, [activeCounter?.count, activeCounter?.goal, settings.hapticEnabled]);

  if (!activeCounter) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText>No counter selected</ThemedText>
      </ThemedView>
    );
  }

  const progress = Math.min(activeCounter.count / activeCounter.goal, 1);

  const handleIncrement = () => {
    if (settings.hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    incrementCount();
    
    scale.value = withSpring(1.1, {
      damping: 10,
      stiffness: 300,
    }, () => {
      scale.value = withSpring(1);
    });
  };

  const handleDecrement = () => {
    if (settings.hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    decrementCount();
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetCount();
    setShowGoalModal(false);
    setShowResetConfirm(false);
    if (settings.hapticEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const animatedCountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.lg }]}>
        <ThemedText style={[styles.counterName, { color: activeCounter.color }]}>
          {activeCounter.name}
        </ThemedText>
        <ThemedText style={[styles.goalText, { color: theme.textSecondary }]}>
          Goal: {activeCounter.goal}
        </ThemedText>
      </View>

      <Pressable 
        style={styles.tapZone}
        onPress={handleIncrement}
      >
        <View style={styles.progressContainer}>
          <CircularProgress
            size={280}
            strokeWidth={12}
            progress={progress}
            color={activeCounter.color}
            backgroundColor={theme.backgroundSecondary}
          />
          <View style={styles.countContainer}>
            <Animated.View style={animatedCountStyle}>
              <ThemedText style={[styles.count, { color: activeCounter.color }]}>
                {activeCounter.count}
              </ThemedText>
            </Animated.View>

            {/* New: Today's and Lifetime counts */}
            <View style={styles.subCounts}>
              <View style={styles.subCountRow}>
                <ThemedText style={[styles.subCountLabel, { color: theme.textSecondary }]}>Today's count</ThemedText>
                <ThemedText style={[styles.subCountValue, { color: activeCounter.color }]}>{activeCounter.dailyCount ?? 0}</ThemedText>
              </View>
              <View style={styles.subCountRow}>
                <ThemedText style={[styles.subCountLabel, { color: theme.textSecondary }]}>Lifetime count</ThemedText>
                <ThemedText style={[styles.subCountValue, { color: activeCounter.color }]}>{activeCounter.lifetimeCount ?? 0}</ThemedText>
              </View>
            </View>

            <ThemedText style={[styles.progressText, { color: theme.textSecondary }]}>
              {Math.round(progress * 100)}%
            </ThemedText>
          </View>
        </View>
        
        <ThemedText style={[styles.tapHint, { color: theme.textSecondary }]}>
          Tap to count
        </ThemedText>
      </Pressable>

      <View style={[styles.controls, { paddingBottom: TAB_BAR_HEIGHT + Spacing.xl }]}>
        <Pressable
          style={[styles.controlButton, { backgroundColor: theme.backgroundSecondary }]}
          onPress={handleReset}
        >
          <Feather name="rotate-ccw" size={24} color={theme.text} />
          <ThemedText style={styles.controlLabel}>Reset</ThemedText>
        </Pressable>

        <Pressable
          style={[styles.controlButton, { backgroundColor: theme.backgroundSecondary }]}
          onPress={handleDecrement}
        >
          <Feather name="minus-circle" size={24} color={theme.text} />
          <ThemedText style={styles.controlLabel}>-1</ThemedText>
        </Pressable>
      </View>

      <GoalModal
        visible={showGoalModal}
        count={activeCounter.count}
        goal={activeCounter.goal}
        onContinue={() => setShowGoalModal(false)}
        onReset={() => {
          setShowGoalModal(false);
          setShowResetConfirm(true);
        }}
      />

      <Modal
        visible={showResetConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowResetConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.confirmModal, { backgroundColor: theme.backgroundDefault }]}>
            <ThemedText style={styles.confirmTitle}>Reset Counter</ThemedText>
            <ThemedText style={[styles.confirmMessage, { color: theme.textSecondary }]}>
              Are you sure you want to reset "{activeCounter.name}" to 0?
            </ThemedText>
            <View style={styles.confirmButtons}>
              <Pressable
                style={[styles.confirmButton, { backgroundColor: theme.backgroundSecondary }]}
                onPress={() => setShowResetConfirm(false)}
              >
                <ThemedText>Cancel</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.confirmButton, styles.confirmButtonDestructive]}
                onPress={confirmReset}
              >
                <ThemedText style={styles.confirmButtonDestructiveText}>Reset</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  counterName: {
    ...Typography.counterName,
    marginBottom: Spacing.xs,
  },
  goalText: {
    ...Typography.goalProgress,
  },
  tapZone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    ...Typography.countDisplay,
    textAlign: 'center',
  },
  subCounts: {
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  subCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  subCountLabel: {
    ...Typography.small,
    marginRight: Spacing.sm,
  },
  subCountValue: {
    ...Typography.body,
    fontWeight: '600',
  },
  progressText: {
    ...Typography.goalProgress,
    marginTop: Spacing.sm,
  },
  tapHint: {
    ...Typography.small,
    marginTop: Spacing.xl,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  controlLabel: {
    ...Typography.small,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  confirmModal: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
    gap: Spacing.lg,
  },
  confirmTitle: {
    ...Typography.h3,
    textAlign: 'center',
  },
  confirmMessage: {
    ...Typography.body,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  confirmButtonDestructive: {
    backgroundColor: '#FF3B30',
  },
  confirmButtonDestructiveText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
