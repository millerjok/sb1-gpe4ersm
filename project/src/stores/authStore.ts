import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthStore } from '../types/auth';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email
        },
        loading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email
        },
        loading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      await sendPasswordResetEmail(auth, email);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthStore.setState({
      user: {
        id: user.uid,
        email: user.email
      },
      loading: false
    });
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});