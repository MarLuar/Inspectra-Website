'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center">
        <a 
          href="/auth/login" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:block text-sm text-gray-700">
        Welcome, {currentUser.email}
      </div>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          isLoggingOut 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {isLoggingOut ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default UserProfile;