"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getAllProjects, getAllSharedDocuments, Project, Document } from "@/services/projectService";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadData();
  }, [currentUser]);

  async function loadData() {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const [allProjects, allDocs] = await Promise.all([
        getAllProjects(currentUser.uid),
        getAllSharedDocuments(),
      ]);
      setProjects(allProjects);
      setDocuments(allDocs);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Get recent projects (last 5)
  const recentProjects = projects.slice(0, 5);

  // Calculate statistics
  const totalProjects = projects.length;
  const totalDocuments = documents.length;
  const todayScans = documents.filter((doc) => {
    const today = new Date();
    const docDate = new Date(doc.createdAt);
    return (
      docDate.getDate() === today.getDate() &&
      docDate.getMonth() === today.getMonth() &&
      docDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // Get recent activity (last 5 documents)
  const recentActivity = documents.slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">InSpectra Dashboard</h1>
            {loading && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/scan"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
                >
                  Scan Document
                </Link>
                <Link
                  href="/projects"
                  className="block w-full text-center bg-blue-100 text-blue-800 py-2 rounded-md hover:bg-blue-200 text-sm sm:text-base"
                >
                  Manage Projects
                </Link>
                <Link
                  href="/documents"
                  className="block w-full text-center bg-blue-100 text-blue-800 py-2 rounded-md hover:bg-blue-200 text-sm sm:text-base"
                >
                  View Documents
                </Link>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">Recent Projects</h2>
                <Link href="/projects" className="text-sm text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              </div>
              {recentProjects.length === 0 ? (
                <p className="text-gray-500 text-sm">No projects yet. Create your first project!</p>
              ) : (
                <ul className="space-y-2">
                  {recentProjects.map((project) => (
                    <li key={project.id} className="border-b pb-2 last:border-0">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-blue-600 hover:underline text-sm sm:text-base flex justify-between items-center"
                      >
                        <span>{project.name}</span>
                        <span className="text-xs text-gray-500">
                          {project.isShared ? "(Shared)" : ""}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Documents</h2>
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 text-sm">No documents yet.</p>
              ) : (
                <ul className="space-y-2">
                  {recentActivity.map((doc) => (
                    <li key={doc.id} className="text-xs sm:text-sm text-blue-600 flex justify-between items-center">
                      <span className="truncate flex-1">{doc.name}</span>
                      <span className="text-gray-400 text-xs ml-2">
                        {formatDate(doc.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Document Statistics */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Document Statistics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold">{totalProjects}</p>
                <p className="text-xs sm:text-sm text-blue-600">Projects</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold">{totalDocuments}</p>
                <p className="text-xs sm:text-sm text-blue-600">Documents</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold">{todayScans}</p>
                <p className="text-xs sm:text-sm text-blue-600">Scans Today</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold">
                  {documents.filter((d) => d.fileType === "image").length}
                </p>
                <p className="text-xs sm:text-sm text-blue-600">Images</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
