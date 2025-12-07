import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';

import MainTabNavigator from "@/navigation/MainTabNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CounterProvider } from "@/context/CounterContext";

// Pre-load the font
Feather.loadFont();

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
            <CounterProvider>
              <NavigationContainer>
                <MainTabNavigator />
              </NavigationContainer>
              <StatusBar style="auto" />
            </CounterProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});