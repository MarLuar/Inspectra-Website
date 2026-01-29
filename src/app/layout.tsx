import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

// Explicitly import Tailwind directives to ensure they're processed in production
if (typeof document !== 'undefined') {
  // This ensures Tailwind classes are recognized by the production build
  const twClasses = [
    'bg-gray-50', 'bg-white', 'bg-blue-600',
    'text-blue-600', 'text-gray-700', 'text-gray-900', 'text-gray-600', 'text-gray-500', 'text-white',
    'shadow', 'rounded-md', 'rounded-lg', 'rounded-full',
    'flex', 'flex-col', 'flex-grow', 'flex-shrink-0', 'items-center', 'justify-between', 'justify-center', 'justify-start',
    'h-16', 'h-8', 'h-6', 'h-screen', 'min-h-screen', 'min-h-dvh',
    'w-8', 'w-6', 'w-full',
    'p-4', 'p-6', 'py-2', 'py-6', 'px-4', 'px-6', 'px-8',
    'm-0', 'mb-2', 'mt-4', 'mt-8', 'mt-12', 'gap-2', 'gap-4',
    'space-x-4', 'space-x-6', 'space-y-6',
    'grid', 'grid-cols-1', 'grid-rows-[auto_1fr_auto]', 'md:grid-cols-3',
    'max-w-7xl', 'max-w-3xl', 'max-w-4xl', 'mx-auto',
    'text-xl', 'text-lg', 'text-sm', 'text-4xl', 'text-5xl',
    'font-bold', 'font-medium', 'font-semibold',
    'tracking-tighter', 'text-pretty',
    'border', 'border-b', 'border-t', 'border-gray-200', 'border-dashed', 'border-purple-500',
    'hover:bg-gray-50', 'hover:text-gray-900', 'hover:bg-blue-700', 'hover:text-blue-600', 'hover:text-gray-500',
    'transition-colors', 'transition-all',
    'absolute', 'relative', 'static',
    'opacity-0', 'opacity-100',
    'outline-none', 'focus-visible:outline-none', 'focus-visible:ring-1', 'focus-visible:ring-blue-600', 'focus-visible:ring-gray-900',
    'shadow-sm', 'shadow-lg',
    'overflow-hidden',
    'text-center',
    'sm:text-5xl',
    'sm:p-6',
    'lg:p-8',
    'md:flex',
    'md:items-center',
    'md:justify-between',
    'md:justify-start',
    'md:h-16',
    'md:flex-row',
    'md:inline-block',
    'hidden',
    'inline-block',
    'block',
    'bg-cover',
    'bg-center',
    'object-cover',
    'cursor-pointer',
    'select-none',
    'appearance-none',
    'resize-none',
    'pointer-events-none',
    'z-0',
    'z-10',
    'z-50'
  ];
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                      InSpectra
                    </Link>
                  </div>
                  <nav className="ml-6 flex space-x-4">
                    <Link
                      href="/"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/projects"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/documents"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                    >
                      Documents
                    </Link>
                    <Link
                      href="/scan"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                    >
                      Scan
                    </Link>
                    <Link
                      href="/analytics"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                    >
                      Analytics
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex justify-center md:justify-start">
                  <p className="text-center text-sm text-gray-500">
                    © 2026 InSpectra. All rights reserved.
                  </p>
                </div>
                <div className="mt-4 flex justify-center md:mt-0">
                  <div className="flex space-x-6">
                    <Link href="/terms" className="text-gray-400 hover:text-gray-500">
                      Terms
                    </Link>
                    <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
                      Privacy
                    </Link>
                    <Link href="/security" className="text-gray-400 hover:text-gray-500">
                      Security
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
