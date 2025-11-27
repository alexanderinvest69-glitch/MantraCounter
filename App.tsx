import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";

import MainTabNavigator from "@/navigation/MainTabNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CounterProvider } from "@/context/CounterContext";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...Feather.font,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

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