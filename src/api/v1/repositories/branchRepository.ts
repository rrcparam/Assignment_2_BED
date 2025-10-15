import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "./firestoreRepository";
import { Branch } from "../models/branchModel";

const COLLECTION_NAME = "branches";

 //  Repository layer for Branch collection in Firestore.
 
export const BranchRepository = {
  async create(data: Branch): Promise<string> {
    return await createDocument<Branch>(COLLECTION_NAME, data);
  },


  async getAll(): Promise<Branch[]> {

    const snapshot = await getDocuments(COLLECTION_NAME);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Branch[];
  },

  async getById(id: string): Promise<Branch | null> {

    const doc = await getDocumentById(COLLECTION_NAME, id);
    return doc?.exists ? ({ id: doc.id, ...doc.data() } as Branch) : null;
  },

  async update(id: string, data: Partial<Branch>): Promise<void> {
    
    await updateDocument<Branch>(COLLECTION_NAME, id, data);
  },

  async delete(id: string): Promise<void> {
    await deleteDocument(COLLECTION_NAME, id);
  },
};
