import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-dvh grid-cols-1 grid-rows-[auto_1fr_auto]">
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600" />
            <span className="text-lg font-semibold">InSpectra</span>
          </a>
          <nav className="ml-10 hidden space-x-6 text-sm font-medium md:flex">
            <a
              className="transition-colors hover:text-blue-600"
              href="/projects"
            >
              Projects
            </a>
            <a
              className="transition-colors hover:text-blue-600"
              href="/documents"
            >
              Documents
            </a>
            <a
              className="transition-colors hover:text-blue-600"
              href="/scan"
            >
              Scan
            </a>
            <a
              className="transition-colors hover:text-blue-600"
              href="/analytics"
            >
              Analytics
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden text-sm font-medium transition-colors hover:text-blue-600 md:inline-block">
            Sign in
          </button>
          <a
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
            href="/dashboard"
          >
            Get started
          </a>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-pretty text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
            InSpectra - Document Management System
          </h1>
          <p className="text-lg text-gray-600">
            Scan, enhance, organize, and manage your construction documents with ease.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900"
              href="/projects"
            >
              View Projects
            </a>
          </div>
          
          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Document Scanning</h3>
              <p className="text-gray-600">Scan documents with automatic edge detection and perspective correction.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Image Enhancement</h3>
              <p className="text-gray-600">Adjust brightness, contrast, and sharpness of your scanned images.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Project Organization</h3>
              <p className="text-gray-600">Organize documents into projects with automatic QR code generation.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 md:h-16 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-600" />
              <p className="text-sm text-gray-600">© 2026 InSpectra. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a className="transition-colors hover:text-blue-600" href="/terms">
                Terms
              </a>
              <a className="transition-colors hover:text-blue-600" href="/privacy">
                Privacy
              </a>
              <a className="transition-colors hover:text-blue-600" href="/security">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
