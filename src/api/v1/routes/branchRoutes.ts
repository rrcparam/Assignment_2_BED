
import express from "express";
import {
  getAllBranches,
  getBranchById,
  addBranch,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

const router = express.Router();

// Branch Routes
router.get("/", getAllBranches);     
router.get("/:id", getBranchById);   
router.post("/", addBranch);         
router.put("/:id", updateBranch);    
router.delete("/:id", deleteBranch); 

export default router;
