export interface User {
  id: string;
  email: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}