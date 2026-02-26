import { apiClient } from './client';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface UserSummary {
  id: number;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  assignedUser: UserSummary;
  createdBy: UserSummary;
}

export interface TaskPayload {
  title?: string;
  description?: string;
  assignedUserId?: number;
}

export async function fetchAllTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
}

export async function fetchMyTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/tasks/my');
  return response.data;
}

export async function fetchTaskById(id: number): Promise<Task> {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
}

export async function createTask(payload: Required<Pick<TaskPayload, 'title' | 'assignedUserId'>> & TaskPayload): Promise<Task> {
  const response = await apiClient.post<Task>('/tasks', payload);
  return response.data;
}

export async function updateTask(id: number, payload: TaskPayload): Promise<Task> {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, payload);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await apiClient.delete(`/tasks/${id}`);
}

export async function updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  const response = await apiClient.patch<Task>(`/tasks/${id}/status`, { status });
  return response.data;
}

export async function fetchUsers(): Promise<UserSummary[]> {
  const response = await apiClient.get<UserSummary[]>('/users');
  return response.data;
}
