import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Simulate document upload processing
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;
    
    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock response
    return Response.json({
      success: true,
      document: {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: "document",
        size: file.size,
        url: "/mock-document-url",
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return Response.json({ error: "Failed to upload document" }, { status: 500 });
  }
}
