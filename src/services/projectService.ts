import { firestore } from '@/config/firebase';
import { supabase, STORAGE_BUCKET } from '@/config/supabase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy
} from 'firebase/firestore';

// Types matching the mobile app
export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  qrCodePath?: string;
  documentCount: number;
  location?: string;
  ownerUserId?: string;
  isShared: number;
  status?: 'active' | 'in_progress' | 'on_hold' | 'completed';
}

export interface Document {
  id: string;
  projectId: string;
  name: string;
  path: string;
  category: string;
  createdAt: Date;
  fileType: 'image' | 'pdf' | string;
  qrCodePath?: string;
  ownerUserId?: string;
  isShared: number;
  mimeType?: string;
  fileSize?: number;
}

// Firebase Projects Collection
const PROJECTS_COLLECTION = 'projects';
const DOCUMENTS_COLLECTION = 'documents';

/**
 * Fetch all projects for a user from Firebase
 */
export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(firestore, PROJECTS_COLLECTION),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    
    const snapshot = await getDocs(projectsQuery);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id || doc.id,
        name: data.name || 'Unnamed Project',
        createdAt: data.created_at?.toDate() || new Date(),
        qrCodePath: data.qr_code_path,
        documentCount: data.document_count || 0,
        location: data.location,
        ownerUserId: data.owner_user_id || data.user_id,
        isShared: data.is_shared || 0,
        status: data.status || 'active',
      };
    });
  } catch (error) {
    console.error('Error fetching user projects:', error);
    return [];
  }
}

/**
 * Fetch all shared projects from Supabase (accessible to all authenticated users)
 */
export async function getSharedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_shared', 1)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching shared projects:', error);
      return [];
    }
    
    return (data || []).map((proj: Record<string, unknown>) => ({
      id: (proj.id as string) || '',
      name: (proj.name as string) || 'Unknown Project',
      createdAt: proj.created_at 
        ? new Date(proj.created_at as number)
        : new Date(),
      qrCodePath: proj.qr_code_path as string | undefined,
      documentCount: (proj.document_count as number) || 0,
      location: proj.location as string | undefined,
      ownerUserId: (proj.owner_user_id as string) || (proj.user_id as string),
      isShared: 1,
      status: 'active',
    }));
  } catch (error) {
    console.error('Error fetching shared projects:', error);
    return [];
  }
}

/**
 * Fetch all projects (Firebase user projects + Supabase shared projects)
 */
export async function getAllProjects(userId: string): Promise<Project[]> {
  const [userProjects, sharedProjects] = await Promise.all([
    getUserProjects(userId),
    getSharedProjects(),
  ]);
  
  // Merge and deduplicate by ID
  const projectMap = new Map<string, Project>();
  
  // Add user projects first
  userProjects.forEach(project => {
    projectMap.set(project.id, project);
  });
  
  // Add shared projects (will override if same ID exists)
  sharedProjects.forEach(project => {
    projectMap.set(project.id, { ...project, isShared: 1 });
  });
  
  return Array.from(projectMap.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

/**
 * Fetch a single project by ID
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  try {
    // Try Firebase first
    const projectDoc = await getDoc(doc(firestore, PROJECTS_COLLECTION, projectId));
    
    if (projectDoc.exists()) {
      const data = projectDoc.data();
      return {
        id: data.id || projectDoc.id,
        name: data.name || 'Unnamed Project',
        createdAt: data.created_at?.toDate() || new Date(),
        qrCodePath: data.qr_code_path,
        documentCount: data.document_count || 0,
        location: data.location,
        ownerUserId: data.owner_user_id || data.user_id,
        isShared: data.is_shared || 0,
        status: data.status || 'active',
      };
    }
    
    // Try Supabase if not found in Firebase
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return {
      id: (data.id as string) || '',
      name: (data.name as string) || 'Unknown Project',
      createdAt: data.created_at 
        ? new Date(data.created_at as number)
        : new Date(),
      qrCodePath: data.qr_code_path as string | undefined,
      documentCount: (data.document_count as number) || 0,
      location: data.location as string | undefined,
      ownerUserId: (data.owner_user_id as string) || (data.user_id as string),
      isShared: 1,
      status: 'active',
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Fetch documents for a project from Firebase
 */
export async function getProjectDocumentsFromFirebase(
  projectId: string, 
  userId: string
): Promise<Document[]> {
  try {
    const documentsQuery = query(
      collection(firestore, DOCUMENTS_COLLECTION),
      where('project_id', '==', projectId),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    
    const snapshot = await getDocs(documentsQuery);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id || doc.id,
        projectId: data.project_id || projectId,
        name: data.name || 'Unnamed Document',
        path: data.path || '',
        category: data.category || 'Documents',
        createdAt: data.created_at?.toDate() || new Date(),
        fileType: data.file_type || 'pdf',
        qrCodePath: data.qr_code_path,
        ownerUserId: data.owner_user_id || data.user_id,
        isShared: data.is_shared || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching project documents from Firebase:', error);
    return [];
  }
}

/**
 * Fetch documents for a project from Supabase (shared)
 */
export async function getProjectDocumentsFromSupabase(
  projectId: string
): Promise<Document[]> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching documents from Supabase:', error);
      return [];
    }
    
    return (data || []).map((doc: Record<string, unknown>) => {
      // Handle created_at which might be String (ISO date) or int (milliseconds)
      let createdAt: Date;
      const createdAtValue = doc.created_at;
      if (typeof createdAtValue === 'string') {
        createdAt = new Date(createdAtValue);
      } else if (typeof createdAtValue === 'number') {
        createdAt = new Date(createdAtValue);
      } else {
        createdAt = new Date();
      }
      
      // Get the path - prefer storage_path, fallback to path
      let docPath = (doc.path as string) || (doc.storage_path as string) || '';
      
      // If the path is not a URL, convert it to a Supabase public URL
      if (docPath && !docPath.startsWith('http://') && !docPath.startsWith('https://')) {
        try {
          const { data: publicUrlData } = supabase
            .storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(docPath);
          docPath = publicUrlData.publicUrl;
        } catch (e) {
          console.error('Error converting path to URL:', e);
        }
      }
      
      const mimeType = (doc.mime_type as string) || '';
      
      return {
        id: (doc.id as string) || '',
        projectId: (doc.project_id as string) || projectId,
        name: (doc.name as string) || 'Unknown Document',
        path: docPath,
        category: (doc.category as string) || 'Documents',
        createdAt,
        fileType: mimeType.includes('image') ? 'image' : 'pdf',
        qrCodePath: doc.qr_code_path as string | undefined,
        ownerUserId: (doc.owner_id as string) || (doc.owner_user_id as string),
        isShared: 1,
        mimeType,
        fileSize: doc.file_size as number | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching documents from Supabase:', error);
    return [];
  }
}

/**
 * Fetch all documents for a project (Firebase + Supabase)
 */
export async function getAllProjectDocuments(
  projectId: string,
  userId: string
): Promise<Document[]> {
  const [firebaseDocs, supabaseDocs] = await Promise.all([
    getProjectDocumentsFromFirebase(projectId, userId),
    getProjectDocumentsFromSupabase(projectId),
  ]);
  
  // Merge and deduplicate by ID
  const docMap = new Map<string, Document>();
  
  firebaseDocs.forEach(doc => {
    docMap.set(doc.id, doc);
  });
  
  supabaseDocs.forEach(doc => {
    docMap.set(doc.id, { ...doc, isShared: 1 });
  });
  
  return Array.from(docMap.values()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

/**
 * Create a new project
 */
export async function createProject(
  userId: string,
  projectData: Omit<Project, 'id' | 'createdAt' | 'ownerUserId'>
): Promise<Project | null> {
  try {
    const newProject = {
      name: projectData.name,
      created_at: Timestamp.now(),
      qr_code_path: projectData.qrCodePath || null,
      document_count: 0,
      location: projectData.location || null,
      user_id: userId,
      owner_user_id: userId,
      is_shared: projectData.isShared || 0,
      status: projectData.status || 'active',
    };
    
    const docRef = await addDoc(collection(firestore, PROJECTS_COLLECTION), newProject);
    
    return {
      id: docRef.id,
      name: projectData.name,
      createdAt: new Date(),
      qrCodePath: projectData.qrCodePath,
      documentCount: 0,
      location: projectData.location,
      ownerUserId: userId,
      isShared: projectData.isShared || 0,
      status: projectData.status || 'active',
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

/**
 * Update a project
 */
export async function updateProject(
  projectId: string,
  updates: Partial<Project>
): Promise<boolean> {
  try {
    const projectRef = doc(firestore, PROJECTS_COLLECTION, projectId);
    
    const updateData: Record<string, unknown> = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.qrCodePath !== undefined) updateData.qr_code_path = updates.qrCodePath;
    if (updates.documentCount !== undefined) updateData.document_count = updates.documentCount;
    if (updates.isShared !== undefined) updateData.is_shared = updates.isShared;
    if (updates.status !== undefined) updateData.status = updates.status;
    
    await updateDoc(projectRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(firestore, PROJECTS_COLLECTION, projectId));
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

/**
 * Get all documents from Supabase (shared across all users)
 */
export async function getAllSharedDocuments(): Promise<Document[]> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all shared documents:', error);
      return [];
    }
    
    return (data || []).map((doc: Record<string, unknown>) => {
      let createdAt: Date;
      const createdAtValue = doc.created_at;
      if (typeof createdAtValue === 'string') {
        createdAt = new Date(createdAtValue);
      } else if (typeof createdAtValue === 'number') {
        createdAt = new Date(createdAtValue);
      } else {
        createdAt = new Date();
      }
      
      let docPath = (doc.path as string) || (doc.storage_path as string) || '';
      
      if (docPath && !docPath.startsWith('http://') && !docPath.startsWith('https://')) {
        try {
          const { data: publicUrlData } = supabase
            .storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(docPath);
          docPath = publicUrlData.publicUrl;
        } catch (e) {
          console.error('Error converting path to URL:', e);
        }
      }
      
      const mimeType = (doc.mime_type as string) || '';
      
      return {
        id: (doc.id as string) || '',
        projectId: (doc.project_id as string) || '',
        name: (doc.name as string) || 'Unknown Document',
        path: docPath,
        category: (doc.category as string) || 'Documents',
        createdAt,
        fileType: mimeType.includes('image') ? 'image' : 'pdf',
        qrCodePath: doc.qr_code_path as string | undefined,
        ownerUserId: (doc.owner_id as string) || (doc.owner_user_id as string),
        isShared: 1,
        mimeType,
        fileSize: doc.file_size as number | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching all shared documents:', error);
    return [];
  }
}
