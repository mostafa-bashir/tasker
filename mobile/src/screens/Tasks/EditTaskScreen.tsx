import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { updateTask } from '../../api/tasks';
import { TextField } from '../../components/common/TextField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useUsers } from '../../hooks/useUsers';
import { useTask } from '../../hooks/useTask';
import { TasksStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme';
import styles from './TaskForm.styles';

import { ScreenLayout } from '../../components/common/ScreenLayout';

export function EditTaskScreen() {
  const route = useRoute<RouteProp<TasksStackParamList, 'EditTask'>>();
  const navigation = useNavigation<NavigationProp<TasksStackParamList>>();
  const { taskId } = route.params;
  
  const { users, isLoading: fetchingUsers } = useUsers();
  const { task, isLoading: isInitializing } = useTask(taskId);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setSelectedUserId(task.assignedUser.id);
    }
  }, [task]);

  const handleUpdate = async () => {
    if (!title || !selectedUserId) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTask(taskId, {
        title,
        description,
        assignedUserId: selectedUserId,
      });
      Alert.alert('Success', 'Task updated successfully');
      navigation.goBack();
    } catch (e) {
      console.error('Failed to update task', e);
      Alert.alert('Error', 'Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitializing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScreenLayout title="Edit Task" scrollable showBackButton={true}>
      <TextField
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="What needs to be done?"
      />

      <TextField
        label="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="Add more details..."
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />

      <Text style={styles.sectionLabel}>Assign To</Text>
      
      {fetchingUsers ? (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.userList}>
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={[
                styles.userButton,
                selectedUserId === user.id && styles.userButtonSelected,
              ]}
              onPress={() => setSelectedUserId(user.id)}
            >
              <Text style={[
                styles.userButtonText,
                selectedUserId === user.id && styles.userButtonTextSelected,
              ]}>
                {user.email}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Save Changes"
          onPress={handleUpdate}
          loading={isSubmitting}
          disabled={!title || !selectedUserId}
        />
      </View>
    </ScreenLayout>
  );
}



