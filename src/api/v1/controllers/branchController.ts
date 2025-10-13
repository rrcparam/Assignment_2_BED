import { Request, Response } from "express";
import * as branchService from "../services/branchService";


export const getAllBranches = async (_req: Request, res: Response): Promise<void> => {
  try {
    const branches = await branchService.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid branch ID" });
      return;
    }

    const branch = await branchService.getBranchById(id);
    if (!branch) {
      res.status(404).json({ error: "Branch not found" });
      return;
    }

    res.status(200).json(branch);
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newBranch = await branchService.addBranch({ name, address, phone });
    res.status(201).json(newBranch);
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid branch ID" });
      return;
    }

    const updatedBranch = await branchService.updateBranch(id, req.body);
    if (!updatedBranch) {
      res.status(404).json({ error: "Branch not found" });
      return;
    }

    res.status(200).json(updatedBranch);
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid branch ID" });
      return;
    }

    const deleted = await branchService.deleteBranch(id);
    if (!deleted) {
      res.status(404).json({ error: "Branch not found" });
      return;
    }

    res.status(200).json({ message: "Branch deleted" });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
