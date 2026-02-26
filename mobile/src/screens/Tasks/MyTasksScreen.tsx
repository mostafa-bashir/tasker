import React from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TaskCard } from '../../components/tasks/TaskCard';
import { ScreenLayout } from '../../components/common/ScreenLayout';
import { useTasks } from '../../hooks/useTasks';
import { TasksStackParamList } from '../../navigation/AppNavigator';
import styles from './TaskScreen.styles';
import { colors } from '../../theme';
import { Task } from '../../api/tasks';

export function MyTasksScreen() {
  const navigation = useNavigation<NavigationProp<TasksStackParamList>>();
  const { tasks, isLoading, refreshing, refresh, error } = useTasks('my');

  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
      showAssignee={false}
    />
  );

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScreenLayout 
      title="My Tasks" 
      subtitle="Manage your daily goals"
    >
      {error ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.error }]}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={refresh} 
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks assigned to you yet.</Text>
            </View>
          }
        />
      )}
    </ScreenLayout>
  );
}



