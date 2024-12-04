import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { PasswordResetForm } from './components/auth/PasswordResetForm';
import { ProfileForm } from './components/profile/ProfileForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { useAuth } from './contexts/AuthContext';

type AuthView = 'login' | 'register' | 'reset-password';

function AuthContent() {
  const [view, setView] = useState<AuthView>('login');

  const content = {
    login: <LoginForm />,
    register: <RegisterForm />,
    'reset-password': <PasswordResetForm />,
  };

  return (
    <div className="flex flex-col items-center">
      {content[view]}
      <div className="mt-4 space-x-4 text-sm">
        {view !== 'login' && (
          <button
            onClick={() => setView('login')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            ログイン
          </button>
        )}
        {view !== 'register' && (
          <button
            onClick={() => setView('register')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            新規登録
          </button>
        )}
        {view !== 'reset-password' && (
          <button
            onClick={() => setView('reset-password')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            パスワードを忘れた方
          </button>
        )}
      </div>
    </div>
  );
}

function MainContent() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex-1 bg-gray-50">
      {isAuthenticated ? <Dashboard /> : <AuthContent />}
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <MainContent />
      </div>
    </AuthProvider>
  );
}

export default App;