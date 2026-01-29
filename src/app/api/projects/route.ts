import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Mock data for projects
  const projects = [
    {
      id: "1",
      name: "Construction Site Alpha",
      description: "Construction project for residential building",
      status: "active",
      createdAt: "2026-01-15T00:00:00Z",
      documentsCount: 24,
    },
    {
      id: "2",
      name: "Office Building Beta",
      description: "Renovation project for downtown office",
      status: "in-progress",
      createdAt: "2025-12-20T00:00:00Z",
      documentsCount: 18,
    },
    {
      id: "3",
      name: "Retail Space Gamma",
      description: "New retail space development",
      status: "on-hold",
      createdAt: "2025-11-05T00:00:00Z",
      documentsCount: 32,
    },
  ];

  return Response.json(projects);
}
