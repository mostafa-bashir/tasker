import { useState, useEffect } from 'react';
import { fetchUsers, UserSummary } from '../api/tasks';

export function useUsers() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      console.error('Failed to load users', e);
      setError('Failed to load users for assignment.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    reload: loadUsers,
  };
}
