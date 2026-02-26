import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createTask } from '../../api/tasks';
import { TextField } from '../../components/common/TextField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useUsers } from '../../hooks/useUsers';
import { colors } from '../../theme';
import styles from './TaskForm.styles';

import { ScreenLayout } from '../../components/common/ScreenLayout';

export function CreateTaskScreen() {
  const navigation = useNavigation<any>();
  const { users, isLoading: fetchingUsers } = useUsers();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title || !selectedUserId) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTask({
        title,
        description,
        assignedUserId: selectedUserId,
      });
      
      Alert.alert('Success', 'Task created successfully');
      navigation.navigate('AllTasks');
      
      // Reset form
      setTitle('');
      setDescription('');
      setSelectedUserId(null);
    } catch (e) {
      console.error('Failed to create task', e);
      Alert.alert('Error', 'Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenLayout title="Create New Task" scrollable>
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
          label="Create Task"
          onPress={handleCreate}
          loading={isSubmitting}
          disabled={!title || !selectedUserId}
        />
      </View>
    </ScreenLayout>
  );
}



