import { create } from 'zustand';
import { UserProfile, UserStore } from '../types/user';

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  loading: false,
  error: null,

  updateProfile: async (data: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      
      // Update local storage
      const currentProfile = localStorage.getItem('userProfile');
      const profile = currentProfile ? JSON.parse(currentProfile) : null;
      const updatedProfile = { ...profile, ...data };
      
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      set({ profile: updatedProfile as UserProfile, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));

// Initialize profile from localStorage
const savedProfile = localStorage.getItem('userProfile');
if (savedProfile) {
  useUserStore.setState({ profile: JSON.parse(savedProfile) });
}