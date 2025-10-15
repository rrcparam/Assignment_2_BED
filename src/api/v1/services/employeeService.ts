import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { Employee } from "../models/employeeModel";

const COLLECTION_NAME = "employees";


 // Getting all employees
 
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot = await getDocuments(COLLECTION_NAME);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Employee[];
};


 //Getting  employee by ID
 
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const doc = await getDocumentById(COLLECTION_NAME, id);
  if (!doc || !doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Employee;
};


// Creating a new employee

export const createEmployee = async (data: Employee): Promise<string> => {
  const newId = await createDocument(COLLECTION_NAME, data);
  return newId;
};


 // For updating an existing employee
 
export const updateEmployee = async (
  id: string,
  data: Partial<Employee>
): Promise<Employee | null> => {
  await updateDocument(COLLECTION_NAME, id, data);
  const updatedDoc = await getDocumentById(COLLECTION_NAME, id);
  if (!updatedDoc || !updatedDoc.exists) return null;
  return { id: updatedDoc.id, ...updatedDoc.data() } as Employee;
};


 // to Delete employee by ID
 
export const deleteEmployee = async (id: string): Promise<boolean> => {
  await deleteDocument(COLLECTION_NAME, id);
  return true;
};
