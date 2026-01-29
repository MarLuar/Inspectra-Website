import Link from "next/link";

export default function Documents() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">All Documents</h2>
            <p className="text-gray-600">Manage your scanned documents and files</p>
          </div>
          <div className="flex space-x-3">
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Projects</option>
              <option>Construction Site Alpha</option>
              <option>Office Building Beta</option>
              <option>Retail Space Gamma</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + New Document
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Document Row 1 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Blueprint_Floor_Plan.pdf</div>
                      <div className="text-sm text-blue-600">Construction Site Alpha</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Construction Site Alpha</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Blueprint
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  Jan 18, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  2.4 MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link href="#" className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                    <Link href="#" className="text-green-600 hover:text-green-900">
                      Download
                    </Link>
                    <Link href="#" className="text-red-600 hover:text-red-900">
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
              
              {/* Document Row 2 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-md flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Inspection_Report_01.pdf</div>
                      <div className="text-sm text-blue-600">Office Building Beta</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Office Building Beta</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Report
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  Jan 15, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  1.8 MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link href="#" className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                    <Link href="#" className="text-green-600 hover:text-green-900">
                      Download
                    </Link>
                    <Link href="#" className="text-red-600 hover:text-red-900">
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
              
              {/* Document Row 3 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-md flex items-center justify-center">
                      <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Contract_Agreement.pdf</div>
                      <div className="text-sm text-blue-600">Retail Space Gamma</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Retail Space Gamma</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Contract
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  Jan 10, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  3.2 MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link href="#" className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                    <Link href="#" className="text-green-600 hover:text-green-900">
                      Download
                    </Link>
                    <Link href="#" className="text-red-600 hover:text-red-900">
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
              
              {/* Document Row 4 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center">
                      <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Site_Photo_001.jpg</div>
                      <div className="text-sm text-blue-600">Construction Site Alpha</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Construction Site Alpha</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Photo
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  Jan 8, 2026
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  4.1 MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link href="#" className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                    <Link href="#" className="text-green-600 hover:text-green-900">
                      Download
                    </Link>
                    <Link href="#" className="text-red-600 hover:text-red-900">
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
