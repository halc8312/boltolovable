export const validateEmail = (email: string): string | null => {
  if (!email) return 'メールアドレスは必須です';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return '有効なメールアドレスを入力してください';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'パスワードは必須です';
  if (password.length < 8) {
    return 'パスワードは8文字以上である必要があります';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'パスワードは大文字、小文字、数字を含む必要があります';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return 'ユーザー名は必須です';
  if (username.length < 3) {
    return 'ユーザー名は3文字以上である必要があります';
  }
  return null;
};