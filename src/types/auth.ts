export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  bio?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface ProfileUpdateData {
  username?: string;
  bio?: string;
  profileImage?: string;
}