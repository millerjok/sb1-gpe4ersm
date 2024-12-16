import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export function UserProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthStore();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
          <User className="w-5 h-5 text-pink-600" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-40
                       border border-gray-100 py-1"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900">
                  {user.email}
                </div>
              </div>

              <button
                onClick={signOut}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50
                         flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}