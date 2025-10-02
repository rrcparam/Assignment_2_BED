import { branches, Branch } from "../../../data/branches";

export function getAllBranches(): Branch[] {
  return branches;
}

export function getBranchById(id: number): Branch | undefined {
  return branches.find(branch => branch.id === id);
}

export function addBranch(branchData: Omit<Branch, "id">): Branch {
  const newId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;
  const newBranch: Branch = { id: newId, ...branchData };
  branches.push(newBranch);
  return newBranch;
}

