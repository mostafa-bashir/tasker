import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllTasksScreen } from '../screens/Tasks/AllTasksScreen';
import { MyTasksScreen } from '../screens/Tasks/MyTasksScreen';
import { CreateTaskScreen } from '../screens/Tasks/CreateTaskScreen';
import { TaskDetailsScreen } from '../screens/Tasks/TaskDetailsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { useAuth } from '../context/AuthContext';
import { View, Text } from 'react-native';

import { EditTaskScreen } from '../screens/Tasks/EditTaskScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TasksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="TaskList" 
        component={MyTasksScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TaskDetails" 
        component={TaskDetailsScreen} 
        options={{ title: 'Task Details' }} 
      />
      <Stack.Screen 
        name="EditTask" 
        component={EditTaskScreen} 
        options={{ title: 'Edit Task' }} 
      />
    </Stack.Navigator>
  );
}

function AdminAllTasksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="AllTasksList" 
        component={AllTasksScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TaskDetails" 
        component={TaskDetailsScreen} 
        options={{ title: 'Task Details' }} 
      />
      <Stack.Screen 
        name="EditTask" 
        component={EditTaskScreen} 
        options={{ title: 'Edit Task' }} 
      />
    </Stack.Navigator>
  );
}


import { colors, typography } from '../theme';

export function MainTabNavigator() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.background, // Match app background
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 10,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerShown: false,
      }}
    >
      {isAdmin && (
        <>
      <Tab.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="+" />,
        }}
      />
      <Tab.Screen
        name="AllTasks"
        component={AdminAllTasksStack}
        options={{
          title: 'All Tasks',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="ALL" />,
        }}
      />
        </>
      )}
      <Tab.Screen
        name="MyTasks"
        component={TasksStack}
        options={{
          title: 'My Tasks',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="MY" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="PER" />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ color, text }: { color: string; text: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
      <Text style={[typography.label, { color, fontSize: 12 }]}>{text}</Text>
    </View>
  );
}

