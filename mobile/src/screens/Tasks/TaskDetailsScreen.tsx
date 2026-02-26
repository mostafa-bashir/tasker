import React, { useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import { 
  updateTaskStatus, 
  deleteTask, 
  TaskStatus 
} from '../../api/tasks';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../hooks/useTask';
import { colors } from '../../theme';
import { ScreenLayout } from '../../components/common/ScreenLayout';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TasksStackParamList } from '../../navigation/AppNavigator';
import styles from './TaskDetailsScreen.styles';

export function TaskDetailsScreen() {
  const route = useRoute<RouteProp<TasksStackParamList, 'TaskDetails'>>();
  const navigation = useNavigation<NavigationProp<TasksStackParamList>>();
  const { user } = useAuth();
  const { taskId } = route.params;

  const { task, setTask, isLoading, refresh } = useTask(taskId);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async () => {
    if (!task) return;
    const newStatus = task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;
    
    setUpdatingStatus(true);
    try {
      const updatedTask = await updateTaskStatus(task.id, newStatus);
      setTask(updatedTask);
    } catch (e) {
      console.error('Failed to update status', e);
      Alert.alert('Error', 'Failed to update task status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteTask(taskId);
              Alert.alert('Success', 'Task deleted successfully');
              navigation.goBack();
            } catch (e) {
              console.error('Failed to delete task', e);
              Alert.alert('Error', 'Failed to delete task');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!task) return null;

  const isAdmin = user?.role === 'ADMIN';
  const isPending = task.status === TaskStatus.PENDING;

  return (
    <ScreenLayout title="Task Details" scrollable showBackButton={true}>
      <View style={styles.content}>
        <View style={styles.statusSection}>
          <StatusBadge status={task.status} />
        </View>

        <Text style={styles.title}>{task.title}</Text>
        
        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : (
          <Text style={styles.descriptionMuted}>No description provided.</Text>
        )}

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>ASSIGNEE</Text>
            <Text style={styles.infoValue}>{task.assignedUser.email}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>CREATED BY</Text>
            <Text style={styles.infoValue}>{task.createdBy.email}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label={isPending ? 'Mark as Complete' : 'Reopen Task'}
            onPress={handleStatusChange}
            loading={updatingStatus}
          />

          {/* 
            Administrative Actions:
            - Edit Details / Delete Task: Only visible to users with ADMIN role.
          */}
          {isAdmin && (
            <View style={styles.adminActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditTask', { taskId: task.id })}
              >
                <Text style={styles.editButtonText}>Edit Details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color={colors.error} />
                ) : (
                  <Text style={styles.deleteButtonText}>Delete Task</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScreenLayout>
  );
}
