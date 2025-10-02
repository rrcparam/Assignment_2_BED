
import express from "express";
import {
  getAllBranches,
} from "../services/branchService";

const router = express.Router();

router.use(express.json());

//  In this we GET all branches
router.get("/", (_req, res) => {
  const branches = getAllBranches();
  res.json(branches);
});
