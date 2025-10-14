import Joi from "joi";
import { Branch } from "../models/branchModel";

export const createBranchSchema = Joi.object<Branch>({
  name: Joi.string().min(3).max(50).required(),
  address: Joi.string().min(5).max(100).required(),
  phone: Joi.string().pattern(/^[0-9\-+() ]{7,15}$/).required(),
});

export const updateBranchSchema = Joi.object<Partial<Branch>>({
  name: Joi.string().min(3).max(50),
  address: Joi.string().min(5).max(100),
  phone: Joi.string().pattern(/^[0-9\-+() ]{7,15}$/),
});
