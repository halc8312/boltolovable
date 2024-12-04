import React, { createContext, useContext, useState } from 'react';
import type { User, AuthState, RegisterData, ProfileUpdateData } from '../types/auth';
import { api } from '../utils/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await api.login(email, password);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await api.register(data);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
      }));
      throw error;
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    if (!authState.user) return;
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const updatedUser = await api.updateProfile(authState.user.id, data);
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
      }));
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await api.requestPasswordReset(email);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
      }));
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
      updateProfile,
      requestPasswordReset,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}