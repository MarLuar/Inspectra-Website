'use client';

import React, { useEffect, useState } from 'react';
import { ToastType } from '@/context/ToastContext';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onDismiss: (id: string) => void;
}

const toastConfig: Record<ToastType, { icon: React.ReactNode; colors: string }> = {
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    colors: 'bg-green-50 border-green-400 text-green-800',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    colors: 'bg-red-50 border-red-400 text-red-800',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    colors: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  },
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colors: 'bg-blue-50 border-blue-400 text-blue-800',
  },
};

const Toast: React.FC<ToastProps> = ({ id, type, message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const config = toastConfig[type];

  useEffect(() => {
    // Trigger enter animation
    const enterTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(enterTimeout);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setIsVisible(false);
    
    // Wait for exit animation to complete before removing from DOM
    setTimeout(() => {
      onDismiss(id);
    }, 300);
  };

  return (
    <div
      className={`
        pointer-events-auto
        w-full max-w-sm
        rounded-lg border shadow-lg
        transform transition-all duration-300 ease-out
        ${config.colors}
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="ml-3 flex-1 pt-0.5">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          type="button"
          className={`
            ml-4 flex-shrink-0 inline-flex rounded-md p-1.5
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${type === 'success' ? 'hover:bg-green-100 focus:ring-green-500' : ''}
            ${type === 'error' ? 'hover:bg-red-100 focus:ring-red-500' : ''}
            ${type === 'warning' ? 'hover:bg-yellow-100 focus:ring-yellow-500' : ''}
            ${type === 'info' ? 'hover:bg-blue-100 focus:ring-blue-500' : ''}
          `}
          onClick={handleDismiss}
          aria-label="Close notification"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
