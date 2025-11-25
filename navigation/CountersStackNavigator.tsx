import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountersScreen from "@/screens/CountersScreen";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { useTheme } from "@/hooks/useTheme";

export type CountersStackParamList = {
  Counters: undefined;
};

const Stack = createNativeStackNavigator<CountersStackParamList>();

export default function CountersStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen 
        name="Counters" 
        component={CountersScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
