import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { SignInScreen } from '../screens/Auth/SignInScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { MainTabNavigator } from './MainTabNavigator';

export type TasksStackParamList = {
  TaskList: undefined;
  AllTasksList: undefined;
  TaskDetails: { taskId: number };
  EditTask: { taskId: number };
};

export type RootStackParamList = {
  SignIn: undefined;
  Register: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import { colors } from '../theme';

import { DarkTheme as NavigationDarkTheme, DefaultTheme } from '@react-navigation/native';

const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.error,
  },
};

import { SafeAreaProvider } from 'react-native-safe-area-context';

export function AppNavigator() {
  const { token, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen
              name="Main"
              component={MainTabNavigator}
            />
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

