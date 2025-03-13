import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../hooks/useTheme";
import { RootStackParamList, MainTabParamList } from "./types";

// Import screens (we'll create these next)
import { AuthScreen } from "../screens/AuthScreen";
import { MorningScreen } from "../screens/MorningScreen";
import { GratitudeScreen } from "../screens/GratitudeScreen";
import { WellbeingScreen } from "../screens/WellbeingScreen";
import { EveningScreen } from "../screens/EveningScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Morning"
        component={MorningScreen}
        options={{
          tabBarLabel: "Morning",
          // We'll add icons later
        }}
      />
      <Tab.Screen
        name="Gratitude"
        component={GratitudeScreen}
        options={{
          tabBarLabel: "Gratitude",
        }}
      />
      <Tab.Screen
        name="Wellbeing"
        component={WellbeingScreen}
        options={{
          tabBarLabel: "Wellbeing",
        }}
      />
      <Tab.Screen
        name="Evening"
        component={EveningScreen}
        options={{
          tabBarLabel: "Evening",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
