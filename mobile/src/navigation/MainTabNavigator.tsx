import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import { AllTasksScreen } from '../screens/Tasks/AllTasksScreen';
import { MyTasksScreen } from '../screens/Tasks/MyTasksScreen';
import { CreateTaskScreen } from '../screens/Tasks/CreateTaskScreen';
import { TaskDetailsScreen } from '../screens/Tasks/TaskDetailsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { EditTaskScreen } from '../screens/Tasks/EditTaskScreen';
import { useAuth } from '../context/AuthContext';
import { colors, typography } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ color, text }: { color: string; text: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
      <Text style={[typography.label, { color, fontSize: 12 }]}>{text}</Text>
    </View>
  );
}

function TasksStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskList" component={MyTasksScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
    </Stack.Navigator>
  );
}

function AdminAllTasksStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllTasksList" component={AllTasksScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
    </Stack.Navigator>
  );
}

export function MainTabNavigator() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      }}
    >
      {isAdmin ? (
        <Tab.Group>
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
        </Tab.Group>
      ) : null}
      
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
