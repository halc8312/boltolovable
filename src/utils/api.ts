import type { RegisterData, ProfileUpdateData, User } from '../types/auth';

const API_DELAY = 1000; // 開発用の遅延をシミュレート

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// モックユーザーストレージ
const users: User[] = [];

export const api = {
  async login(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    const user = users.find(u => u.email === email);
    if (!user) throw new ApiError(401, 'メールアドレスまたはパスワードが正しくありません');
    return user;
  },

  async register(data: RegisterData): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    if (users.some(u => u.email === data.email)) {
      throw new ApiError(409, 'このメールアドレスは既に登録されています');
    }
    const newUser: User = {
      id: String(users.length + 1),
      email: data.email,
      username: data.username,
    };
    users.push(newUser);
    return newUser;
  },

  async requestPasswordReset(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    const user = users.find(u => u.email === email);
    if (!user) throw new ApiError(404, 'ユーザーが見つかりません');
    // 実際のアプリケーションではここでメール送信処理を行う
  },

  async updateProfile(userId: string, data: ProfileUpdateData): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new ApiError(404, 'ユーザーが見つかりません');
    
    const updatedUser = {
      ...users[userIndex],
      ...data,
    };
    users[userIndex] = updatedUser;
    return updatedUser;
  },
};