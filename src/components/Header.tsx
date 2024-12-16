import React from 'react';
import { Flower2, Cherry } from 'lucide-react';
import { UserProfileButton } from './user/UserProfileButton';

export function Header() {
  return (
    <>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 p-4">
        <Flower2 className="w-8 h-8 text-pink-400 animate-bounce" />
      </div>
      <div className="absolute top-0 right-0 p-4">
        <Cherry className="w-8 h-8 text-pink-400 animate-bounce" />
      </div>
      
      {/* User profile button */}
      <div className="absolute top-4 right-20">
        <UserProfileButton />
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 font-['Noto_Sans_JP']">
          Year 7-9 Japanese: iitomo junior
        </h1>
        <p className="text-lg text-gray-600">
          Choose a chapter to begin your learning journey!
        </p>
      </div>
    </>
  );
}