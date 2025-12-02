import React, { createContext, useContext, useState, useCallback } from 'react';
import { Counter, AppSettings } from '@/types/counter';

interface CounterContextType {
  counters: Counter[];
  activeCounterId: string | null;
  settings: AppSettings;
  addCounter: (counter: Omit<Counter, 'id' | 'createdAt'>) => void;
  updateCounter: (id: string, updates: Partial<Counter>) => void;
  deleteCounter: (id: string) => void;
  setActiveCounter: (id: string) => void;
  incrementCount: () => void;
  decrementCount: () => void;
  resetCount: () => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

export const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [counters, setCounters] = useState<Counter[]>([
    {
      id: '1',
      name: 'Daily Practice',
      count: 0,
      goal: 108,
      color: '#6B4BA6',
      createdAt: Date.now(),
      dailyCount: 0,
      lifetimeCount: 0,
    },
  ]);
  const [activeCounterId, setActiveCounterId] = useState<string | null>('1');
  const [settings, setSettings] = useState<AppSettings>({
    displayName: 'Practitioner',
    avatar: 'lotus',
    hapticEnabled: true,
    soundEnabled: false,
    theme: 'auto',
    defaultGoal: 108,
  });

  const addCounter = useCallback((counter: Omit<Counter, 'id' | 'createdAt'>) => {
    const newCounter: Counter = {
      ...counter,
      id: Date.now().toString(),
      createdAt: Date.now(),
      dailyCount: counter.dailyCount ?? 0,
      lifetimeCount: counter.lifetimeCount ?? 0,
    };
    setCounters(prev => [...prev, newCounter]);
    setActiveCounterId(newCounter.id);
  }, []);

  const updateCounter = useCallback((id: string, updates: Partial<Counter>) => {
    setCounters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCounter = useCallback((id: string) => {
    setCounters(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (activeCounterId === id && filtered.length > 0) {
        setActiveCounterId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeCounterId]);

  const setActiveCounter = useCallback((id: string) => {
    setActiveCounterId(id);
  }, []);

  const incrementCount = useCallback(() => {
    if (!activeCounterId) return;
    setCounters(prev => prev.map(c => 
      c.id === activeCounterId ? { ...c, count: Math.min(c.count + 1, 9999), dailyCount: (c.dailyCount ?? 0) + 1, lifetimeCount: (c.lifetimeCount ?? 0) + 1 } : c
    ));
  }, [activeCounterId]);

  const decrementCount = useCallback(() => {
    if (!activeCounterId) return;
    setCounters(prev => prev.map(c => 
      c.id === activeCounterId ? { ...c, count: Math.max(c.count - 1, 0), dailyCount: Math.max((c.dailyCount ?? 0) - 1, 0), lifetimeCount: Math.max((c.lifetimeCount ?? 0) - 1, 0) } : c
    ));
  }, [activeCounterId]);

  const resetCount = useCallback(() => {
    if (!activeCounterId) return;
    setCounters(prev => prev.map(c => 
      c.id === activeCounterId ? { ...c, count: 0 } : c
    ));
  }, [activeCounterId]);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const value = {
    counters,
    activeCounterId,
    settings,
    addCounter,
    updateCounter,
    deleteCounter,
    setActiveCounter,
    incrementCount,
    decrementCount,
    resetCount,
    updateSettings,
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
}
