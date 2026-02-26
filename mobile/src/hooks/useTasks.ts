import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllTasks, fetchMyTasks, Task } from '../api/tasks';

export function useTasks(type: 'all' | 'my' = 'all') {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setError(null);
    try {
      const data = type === 'all' ? await fetchAllTasks() : await fetchMyTasks();
      setTasks(data);
    } catch (e) {
      console.error(`Failed to load ${type} tasks`, e);
      setError(`Failed to load tasks. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTasks(true);
    setRefreshing(false);
  }, [loadTasks]);

  useFocusEffect(
    useCallback(() => {
      void loadTasks();
    }, [loadTasks])
  );

  return {
    tasks,
    isLoading,
    refreshing,
    error,
    refresh: onRefresh,
    reload: loadTasks,
  };
}
