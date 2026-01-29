import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                      InSpectra
                    </Link>
                  </div>
                  <nav className="ml-10 flex space-x-4">
                    <Link
                      href="/"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/projects"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/documents"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Documents
                    </Link>
                    <Link
                      href="/scan"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Scan
                    </Link>
                    <Link
                      href="/analytics"
                      className="text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Analytics
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/auth/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
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
