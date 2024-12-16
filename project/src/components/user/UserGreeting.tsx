import React from 'react';
import { useUserStore } from '../../stores/userStore';

export function UserGreeting() {
  const { profile } = useUserStore();

  if (!profile?.fullName) return null;

  return (
    <div className="text-gray-700 font-medium">
      こんにちは、{profile.fullName}さん！
    </div>
  );
}