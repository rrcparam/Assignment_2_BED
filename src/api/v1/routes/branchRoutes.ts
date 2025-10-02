
import express from "express";
import {
  getAllBranches,
  getBranchById,
  updateBranch,
  addBranch,

} from "../services/branchService";

const router = express.Router();

router.use(express.json());

//  In this we GET all branches
router.get("/", (_req, res) => {
  const branches = getAllBranches();
  res.json(branches);
});

// in This we GET branch by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid branch ID" });
  }
  const branch = getBranchById(id);
  if (!branch) {
    return res.status(404).json({ error: "Branch not found" });
  }
  res.json(branch);
});


// This is for POST creating a new branch
router.post("/", (req, res) => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newBranch = addBranch({name,address,phone });
  res.status(201).json(newBranch);
});

// PUT  for updating  branch
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid branch ID" });
  }

  const updatedBranch = updateBranch(id, req.body);
  if (!updatedBranch) {
    return res.status(404).json({ error: "Branch not found" });
  }
  res.json(updatedBranch);
});



