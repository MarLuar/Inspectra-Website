import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-3xl space-y-6 text-center">
          <h1 className="text-pretty text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            InSpectra - Document Management System
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Scan, enhance, organize, and manage your construction documents with ease.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">Document Scanning</h3>
              <p className="text-sm sm:text-base text-blue-600">Scan documents with automatic edge detection and perspective correction.</p>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">Image Enhancement</h3>
              <p className="text-sm sm:text-base text-blue-600">Adjust brightness, contrast, and sharpness of your scanned images.</p>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">Project Organization</h3>
              <p className="text-sm sm:text-base text-blue-600">Organize documents into projects with automatic QR code generation.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
