import { branches, Branch } from "../../../data/branches";

export function getAllBranches(): Branch[] {
  return branches;
}

export function getBranchById(id: number): Branch | undefined {
  return branches.find(branch => branch.id === id);
}

// This function is to Create a new branch
export function addBranch(branchData: Omit<Branch, "id">): Branch {
  const newId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;
  const newBranch: Branch = { id: newId, ...branchData };
  branches.push(newBranch);
  return newBranch;
}

// Update an existing branch by its ID.
export function updateBranch(id: number, updatedData: Partial<Branch>): Branch | null {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return null;

  branches[index] = { ...branches[index], ...updatedData };
  return branches[index];
}

// This function for Delete a branch by its ID
export function deleteBranch(id: number): boolean {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;

  branches.splice(index, 1);
  return true;
}


