import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { login as loginRequest, register as registerRequest } from '../api/auth';
import {
  clearAuthToken,
  getAuthToken,
  saveAuthToken,
} from '../storage/authToken.storage';

import { jwtDecode } from 'jwt-decode';

interface UserInfo {
  id: number;
  email: string;
  role: string;
}

interface AuthContextValue {
  isLoading: boolean;
  isInitializing: boolean;
  token: string | null;
  user: UserInfo | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const decodeAndSetUser = useCallback((jwt: string) => {
    try {
      const decoded: any = jwtDecode(jwt);
      setUser({
        id: decoded.sub,
        email: decoded.email || '', // Assuming email is in payload or needed
        role: decoded.role,
      });
    } catch (e) {
      console.error('Failed to decode token', e);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await getAuthToken();
        if (storedToken) {
          setToken(storedToken);
          decodeAndSetUser(storedToken);
        }
      } finally {
        setIsInitializing(false);
      }
    };

    void bootstrap();
  }, [decodeAndSetUser]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await loginRequest({ email, password });
        await saveAuthToken(response.access_token);
        setToken(response.access_token);
        decodeAndSetUser(response.access_token);
      } finally {
        setIsLoading(false);
      }
    },
    [decodeAndSetUser],
  );

  const signUp = useCallback(
    async (email: string, password: string, role: string) => {
      setIsLoading(true);
      try {
        const response = await registerRequest({ email, password, role });
        await saveAuthToken(response.access_token);
        setToken(response.access_token);
        decodeAndSetUser(response.access_token);
      } finally {
        setIsLoading(false);
      }
    },
    [decodeAndSetUser],
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await clearAuthToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isInitializing,
      token,
      user,
      signIn,
      signUp,
      signOut,
    }),
    [isLoading, isInitializing, token, user, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

