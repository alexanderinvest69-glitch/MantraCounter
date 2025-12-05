import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Trigger a single vibration/haptic when a counter goal is reached.
 * - Uses Expo Haptics on native (iOS/Android)
 * - Falls back to the Web Vibration API on web, if available
 * - Safe no-op in unsupported environments (tests/node)
 */
export async function vibrateGoalSuccess(): Promise<void> {
  try {
    // Native haptics (iOS/Android). On unsupported platforms this is a no-op.
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // Ignore any runtime/platform errors
  }

  // Web fallback using the Vibration API where available.
  if (Platform.OS === 'web') {
    try {
      // navigator may be undefined in tests/node
      const nav: any = typeof navigator !== 'undefined' ? navigator : null;
      if (nav && typeof nav.vibrate === 'function') {
        nav.vibrate(200);
      }
    } catch {
      // Ignore any runtime/platform errors on web
    }
  }
}
