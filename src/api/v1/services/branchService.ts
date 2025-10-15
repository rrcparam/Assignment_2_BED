
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { Branch } from "../models/branchModel";

const COLLECTION_NAME = "branches";


 //Getting  all the branches
 
export const getAllBranches = async (): Promise<Branch[]> => {
  const snapshot = await getDocuments(COLLECTION_NAME);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Branch[];
};


 // to Get branch by ID
 
export const getBranchById = async (id: string): Promise<Branch | null> => {
  const doc = await getDocumentById(COLLECTION_NAME, id);
  if (!doc || !doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Branch;
};


 //for  Create a new branch
 
export const createBranch = async (data: Branch): Promise<string> => {
  
  const plainData = JSON.parse(JSON.stringify(data));

  const newId = await createDocument(COLLECTION_NAME, plainData);
  return newId;
};


 // Updating an existing branch
 
export const updateBranch = async (
  id: string,
  data: Partial<Branch>
): Promise<Branch | null> => {
  const plainData = JSON.parse(JSON.stringify(data)); 
  await updateDocument(COLLECTION_NAME, id, plainData);

  const updatedDoc = await getDocumentById(COLLECTION_NAME, id);
  if (!updatedDoc || !updatedDoc.exists) return null;

  return { id: updatedDoc.id, ...updatedDoc.data() } as Branch;
};


 // TO Delete a branch by ID
 
export const deleteBranch = async (id: string): Promise<boolean> => {
  await deleteDocument(COLLECTION_NAME, id);
  return true;
};
