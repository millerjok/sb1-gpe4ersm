export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  class: string;
}

export interface UserStore {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}