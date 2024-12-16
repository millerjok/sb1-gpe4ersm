import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { AuthModal } from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = React.useState(!user);

  React.useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

  if (!user) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    );
  }

  return <>{children}</>;
}