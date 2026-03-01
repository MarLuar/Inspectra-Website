"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getAllProjects, Project, deleteProject } from "@/services/projectService";
import { useToast } from "@/context/ToastContext";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLocation, setNewProjectLocation] = useState("");
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    loadProjects();
  }, [currentUser]);

  async function loadProjects() {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const allProjects = await getAllProjects(currentUser.uid);
      setProjects(allProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
      showToast({ message: "Failed to load projects", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProject(projectId: string, projectName: string) {
    if (!confirm(`Are you sure you want to delete "${projectName}"?`)) {
      return;
    }

    try {
      const success = await deleteProject(projectId);
      if (success) {
        showToast({ message: "Project deleted successfully", type: "success" });
        loadProjects();
      } else {
        showToast({ message: "Failed to delete project", type: "error" });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      showToast({ message: "Failed to delete project", type: "error" });
    }
  }

  function getStatusColor(status?: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "on_hold":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  }

  function formatStatus(status?: string) {
    if (!status) return "Active";
    return status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Projects</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">
              Your Projects ({projects.length})
            </h2>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 w-full sm:w-auto text-center"
            >
              + New Project
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">No projects found</p>
              <button
                onClick={() => setShowNewProjectModal(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">
                        {project.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium self-start ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.isShared ? "Shared" : formatStatus(project.status)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-blue-600">
                      {project.location || "No location specified"}
                    </p>

                    <div className="mt-3 flex items-center text-xs sm:text-sm text-blue-600">
                      <svg
                        className="flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Created: {formatDate(project.createdAt)}
                    </div>

                    <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-blue-600">
                      <svg
                        className="flex-shrink-0 mr-1 h-4 w-4 sm:h-5 sm:w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Documents: {project.documentCount}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row sm:justify-between gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm font-medium text-center sm:text-left"
                    >
                      View Details
                    </Link>
                    <div className="flex justify-center sm:justify-end space-x-2">
                      <button
                        className="text-gray-600 hover:text-gray-700"
                        title="Edit project"
                      >
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        className="text-gray-600 hover:text-red-700"
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        title="Delete project"
                      >
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Create New Project
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="projectLocation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    id="projectLocation"
                    value={newProjectLocation}
                    onChange={(e) => setNewProjectLocation(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter location"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowNewProjectModal(false);
                    setNewProjectName("");
                    setNewProjectLocation("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!newProjectName.trim()) {
                      showToast({ message: "Please enter a project name", type: "error" });
                      return;
                    }
                    // TODO: Implement createProject function call
                    showToast({ message: "Project creation coming soon", type: "info" });
                    setShowNewProjectModal(false);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
