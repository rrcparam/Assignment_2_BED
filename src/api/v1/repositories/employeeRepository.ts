import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "./firestoreRepository";
import { Employee } from "../models/employeeModel";

const COLLECTION_NAME = "employees";

 // This a Repository layer for interacting with the Employee Firestore collection.
 
export const EmployeeRepository = {
  async create(data: Employee): Promise<string> {
    return await createDocument<Employee>(COLLECTION_NAME, data);
  },

  async getAll(): Promise<Employee[]> {

    const snapshot = await getDocuments(COLLECTION_NAME);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Employee[];
  },

  async getById(id: string): Promise<Employee | null> {
    const doc = await getDocumentById(COLLECTION_NAME, id);
    return doc?.exists ? ({ id: doc.id, ...doc.data() } as Employee) : null;
  },

  async update(id: string, data: Partial<Employee>): Promise<void> {

    await updateDocument<Employee>(COLLECTION_NAME, id, data);
  },

  async delete(id: string): Promise<void> {
    
    await deleteDocument(COLLECTION_NAME, id);
  },
};
