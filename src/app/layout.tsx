import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center md:hidden">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                      InSpectra
                    </Link>
                  </div>
                  <nav className="hidden md:flex space-x-4">
                    <Link
                      href="/"
                      className="text-blue-600 hover:bg-gray-50 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-blue-600 hover:bg-gray-50 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/projects"
                      className="text-blue-600 hover:bg-gray-50 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/documents"
                      className="text-blue-600 hover:bg-gray-50 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Documents
                    </Link>
                    <Link
                      href="/scan"
                      className="text-blue-600 hover:bg-gray-50 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Scan
                    </Link>
                    <Link
                      href="/analytics"
                      className="text-blue-600 hover:bg-gray-50 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Analytics
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <Link
                      href="/auth/login"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                  <div className="md:hidden mr-2">
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-sm text-blue-600">
                    © 2026 InSpectra. All rights reserved.
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <Link href="/terms" className="text-blue-600 hover:text-blue-800 text-sm">
                      Terms
                    </Link>
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800 text-sm">
                      Privacy
                    </Link>
                    <Link href="/security" className="text-blue-600 hover:text-blue-800 text-sm">
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
