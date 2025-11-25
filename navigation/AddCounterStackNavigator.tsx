import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCounterScreen from "@/screens/AddCounterScreen";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { useTheme } from "@/hooks/useTheme";

export type AddCounterStackParamList = {
  AddCounter: undefined;
};

const Stack = createNativeStackNavigator<AddCounterStackParamList>();

export default function AddCounterStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen 
        name="AddCounter" 
        component={AddCounterScreen}
        options={{
          title: "New Counter",
        }}
      />
    </Stack.Navigator>
  );
}
