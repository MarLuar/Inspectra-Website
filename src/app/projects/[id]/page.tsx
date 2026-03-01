"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  getProjectById,
  getAllProjectDocuments,
  Project,
  Document,
} from "@/services/projectService";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { currentUser } = useAuth();

  useEffect(() => {
    loadProjectData();
  }, [projectId, currentUser]);

  async function loadProjectData() {
    if (!projectId || !currentUser) return;

    setLoading(true);
    try {
      const [projectData, projectDocs] = await Promise.all([
        getProjectById(projectId),
        getAllProjectDocuments(projectId, currentUser.uid),
      ]);
      setProject(projectData);
      setDocuments(projectDocs);
    } catch (error) {
      console.error("Error loading project data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Get unique categories
  const categories = ["all", ...new Set(documents.map((doc) => doc.category))];

  // Filter documents by category
  const filteredDocuments =
    activeCategory === "all"
      ? documents
      : documents.filter((doc) => doc.category === activeCategory);

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatFileSize(bytes?: number) {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!project) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Project Not Found
              </h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500 mb-4">
                The project you&apos;re looking for doesn&apos;t exist or you don&apos;t have
                access to it.
              </p>
              <Link
                href="/projects"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Projects
              </Link>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Link
                  href="/projects"
                  className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block"
                >
                  ← Back to Projects
                </Link>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {project.name}
                </h1>
                {project.location && (
                  <p className="text-sm text-gray-500 mt-1">{project.location}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {project.isShared && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Shared
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  Created: {formatDate(project.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category === "all"
                    ? "All Documents"
                    : category.replace(/_/g, " ")}
                  {category === "all"
                    ? ` (${documents.length})`
                    : ` (${documents.filter((d) => d.category === category).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500 mb-4">
                {documents.length === 0
                  ? "No documents in this project yet."
                  : "No documents in this category."}
              </p>
              <Link
                href="/scan"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Scan New Document
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Document Preview */}
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {doc.fileType === "image" ? (
                      <img
                        src={doc.path}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/file-icon.png";
                        }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-gray-500 mt-2">PDF Document</p>
                      </div>
                    )}
                  </div>

                  {/* Document Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{doc.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {formatDate(doc.createdAt)}
                      </span>
                      {doc.fileSize && (
                        <span className="text-xs text-gray-400">
                          {formatFileSize(doc.fileSize)}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={doc.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs bg-blue-100 text-blue-800 py-1.5 rounded hover:bg-blue-200"
                      >
                        View
                      </a>
                      <a
                        href={doc.path}
                        download
                        className="flex-1 text-center text-xs bg-gray-100 text-gray-800 py-1.5 rounded hover:bg-gray-200"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
