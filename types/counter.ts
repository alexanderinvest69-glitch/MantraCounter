export interface Counter {
  id: string;
  name: string;
  count: number;
  goal: number;
  color: string;
  createdAt: number;
  // optional counts for tracking
  dailyCount?: number;
  lifetimeCount?: number;
}

export interface AppSettings {
  displayName: string;
  avatar: string;
  hapticEnabled: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  defaultGoal: number;
}

export const PRESET_COLORS = [
  '#6B4BA6',
  '#D4A574',
  '#4CAF50',
  '#2196F3',
  '#FF6B6B',
  '#9C27B0',
  '#FF9800',
  '#00BCD4',
];

export const DEFAULT_GOALS = [108, 216, 432, 1008];
