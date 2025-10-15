import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { createBranchSchema, updateBranchSchema } from "../validation/branchSchemas";
import { successResponse, errorResponse } from "../models/responseModel";

/**
 * This Handles retrieving all branches.
 * @param {Request} _req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getAllBranches = async (_req: Request, res: Response): Promise<void> => {
  try {
    const branches = await branchService.getAllBranches();

    if (!branches || branches.length === 0) {
      res.status(200).json(successResponse([], "No branches found"));
      return;
    }

    res.status(200).json(successResponse(branches, "Branches retrieved successfully"));
  } catch (error: unknown) {
    console.error("Error fetching branches:", error);
    res.status(500).json(errorResponse("Failed to fetch branches"));
  }
};

/**
 * This is used to Handles retrieving a branch by Firestore document ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id?.trim();

    if (!id) {
      res.status(400).json(errorResponse("Invalid branch ID format"));
      return;
    }

    const branch = await branchService.getBranchById(id);

    if (!branch) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }

    res.status(200).json(successResponse(branch, "Branch retrieved successfully"));
  } catch (error: unknown) {
    console.error("Error fetching branch:", error);
    res.status(500).json(errorResponse("Failed to fetch branch"));
  }
};

/**
 * Itis used to create a new branch.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const createBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = createBranchSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json(
        errorResponse(
          "Validation failed: " + error.details.map((d) => d.message).join(", ")
        )
      );
      return;
    }

    const newId = await branchService.createBranch(value);
    const createdBranch = { id: newId, ...value };

    res.status(201).json(successResponse(createdBranch, "Branch created successfully"));
  } catch (error: unknown) {
    console.error("Error creating branch:", error);
    res.status(500).json(errorResponse("Failed to create branch"));
  }
};

/**
 * Handles updates a branch by Firestore document ID.
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<void>}
 */
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id?.trim();

    if (!id) {
      res.status(400).json(errorResponse("Invalid branch ID format"));
      return;
    }

    const { error, value } = updateBranchSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json(
        errorResponse(
          "Validation failed: " + error.details.map((d) => d.message).join(", ")
        )
      );
      return;
    }

    const updatedBranch = await branchService.updateBranch(id, value);

    if (!updatedBranch) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }

    res.status(200).json(successResponse(updatedBranch, "Branch updated successfully"));
  } catch (error: unknown) {
    console.error("Error updating branch:", error);
    res.status(500).json(errorResponse("Failed to update branch"));
  }
};

/**
 *   This Handles deleting a branch by Firestore document ID.
 * @param {Request} req 
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id?.trim();

    if (!id) {
      res.status(400).json(errorResponse("Invalid branch ID format"));
      return;
    }


    const success = await branchService.deleteBranch(id);

    if (!success) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }

    res.status(200).json(successResponse(null, "Branch deleted successfully"));
  } catch (error: unknown) {
    console.error("Error deleting branch:", error);
    res.status(500).json(errorResponse("Failed to delete branch"));
  }
};
