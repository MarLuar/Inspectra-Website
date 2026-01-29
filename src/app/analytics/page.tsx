"use client";
import { useState } from "react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("monthly");

  // Mock data for charts
  const documentTypesData = [
    { name: "Blueprints", value: 45 },
    { name: "Reports", value: 30 },
    { name: "Photos", value: 20 },
    { name: "Contracts", value: 5 },
  ];

  const projectData = [
    { name: "Construction Site Alpha", documents: 24, activity: 85 },
    { name: "Office Building Beta", documents: 18, activity: 65 },
    { name: "Retail Space Gamma", documents: 32, activity: 40 },
    { name: "Warehouse Delta", documents: 12, activity: 30 },
  ];

  const monthlyData = [
    { month: "Jan", documents: 42, scans: 38 },
    { month: "Feb", documents: 38, scans: 45 },
    { month: "Mar", documents: 56, scans: 52 },
    { month: "Apr", documents: 49, scans: 41 },
    { month: "May", documents: 62, scans: 58 },
    { month: "Jun", documents: 55, scans: 50 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Document Analytics</h2>
          <div className="flex space-x-2">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-600">Total Documents</p>
            <p className="text-3xl font-bold mt-2">1,248</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-600">Active Projects</p>
            <p className="text-3xl font-bold mt-2">24</p>
            <p className="text-sm text-green-600 mt-1">↑ 3 from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-600">Scans Today</p>
            <p className="text-3xl font-bold mt-2">36</p>
            <p className="text-sm text-green-600 mt-1">↑ 5 from yesterday</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-600">Storage Used</p>
            <p className="text-3xl font-bold mt-2">4.2 GB</p>
            <p className="text-sm text-yellow-600 mt-1">78% of quota</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Types Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Document Types</h3>
            <div className="space-y-4">
              {documentTypesData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Project Activity Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Project Activity</h3>
            <div className="space-y-4">
              {projectData.map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium">{project.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.documents} docs</p>
                    <p className="text-xs text-gray-500">{project.activity}% activity</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Monthly Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <h3 className="text-lg font-medium mb-4">Monthly Document Trends</h3>
          <div className="overflow-x-auto">
            <div className="flex items-end h-64 space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex items-end justify-center h-48 space-x-1">
                    <div 
                      className="w-8 bg-blue-500 rounded-t hover:bg-blue-600"
                      style={{ height: `${data.documents * 2}px` }}
                      title={`Documents: ${data.documents}`}
                    ></div>
                    <div 
                      className="w-8 bg-green-500 rounded-t hover:bg-green-600"
                      style={{ height: `${data.scans * 2}px` }}
                      title={`Scans: ${data.scans}`}
                    ></div>
                  </div>
                  <span className="text-xs mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">Documents</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">Scans</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
