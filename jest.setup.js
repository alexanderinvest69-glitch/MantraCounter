/* Jest setup: mock haptics and provide safe web vibration fallback for tests */

// Mock expo-haptics to avoid triggering real device haptics during tests
jest.mock('expo-haptics', () => ({
  NotificationFeedbackType: {
    Success: 'Success',
    Warning: 'Warning',
    Error: 'Error',
  },
  ImpactFeedbackStyle: {
    Light: 'Light',
    Medium: 'Medium',
    Heavy: 'Heavy',
    Rigid: 'Rigid',
    Soft: 'Soft',
  },
  notificationAsync: jest.fn().mockResolvedValue(undefined),
  impactAsync: jest.fn().mockResolvedValue(undefined),
  selectionAsync: jest.fn().mockResolvedValue(undefined),
}));

// Provide a no-op web vibration API if referenced in tests
if (typeof global.navigator === 'undefined') {
  global.navigator = {};
}
if (typeof global.navigator.vibrate !== 'function') {
  global.navigator.vibrate = jest.fn();
}
