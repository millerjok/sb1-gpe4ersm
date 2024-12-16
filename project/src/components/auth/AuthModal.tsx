import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ResetPasswordForm } from './ResetPasswordForm';

type AuthView = 'login' | 'signup' | 'reset';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('login');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {view === 'login' && (
              <LoginForm
                onSignupClick={() => setView('signup')}
                onResetClick={() => setView('reset')}
              />
            )}

            {view === 'signup' && (
              <SignupForm
                onLoginClick={() => setView('login')}
              />
            )}

            {view === 'reset' && (
              <ResetPasswordForm
                onBackClick={() => setView('login')}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}