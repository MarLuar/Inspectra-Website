import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">InSpectra Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">Profile</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Out</button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/scan" className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Scan Document
              </Link>
              <Link href="/projects" className="block w-full text-center bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300">
                Manage Projects
              </Link>
              <Link href="/documents" className="block w-full text-center bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300">
                View Documents
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <ul className="space-y-2">
              <li className="border-b pb-2"><Link href="/projects/1" className="text-blue-600 hover:underline">Construction Site Alpha</Link></li>
              <li className="border-b pb-2"><Link href="/projects/2" className="text-blue-600 hover:underline">Office Building Beta</Link></li>
              <li><Link href="/projects/3" className="text-blue-600 hover:underline">Retail Space Gamma</Link></li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="text-sm">Added 3 new blueprints to Project Alpha</li>
              <li className="text-sm">Enhanced image quality for Inspection Report #12</li>
              <li className="text-sm">Generated QR code for Project Beta</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Document Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold">24</p>
              <p className="text-gray-600">Projects</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold">142</p>
              <p className="text-gray-600">Documents</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold">36</p>
              <p className="text-gray-600">Scans Today</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold">8</p>
              <p className="text-gray-600">Teams</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
