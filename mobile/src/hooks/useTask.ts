import { useState, useEffect, useCallback } from 'react';
import { fetchTaskById, Task } from '../api/tasks';

export function useTask(taskId: number) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTask = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTaskById(taskId);
      setTask(data);
    } catch (e) {
      console.error('Failed to fetch task', e);
      setError('Failed to load task details.');
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    void loadTask();
  }, [loadTask]);

  return {
    task,
    setTask,
    isLoading,
    error,
    refresh: loadTask,
  };
}
