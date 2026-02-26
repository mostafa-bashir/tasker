import axios, { InternalAxiosRequestHeaders } from 'axios';
import { Platform } from 'react-native';
import { getAuthToken } from '../storage/authToken.storage';

// Update this to your machine's local IP address for physical devices/emulators
// You can find your IP by running `ifconfig` (look for en0 or Similar)
export const API_BASE_URL = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://192.168.1.2:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();

  if (token) {
    if (!config.headers) {
      config.headers = {} as InternalAxiosRequestHeaders;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
