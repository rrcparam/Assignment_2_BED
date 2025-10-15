import Joi from "joi";
import { Employee } from "../models/employeeModel";

export const createEmployeeSchema = Joi.object<Employee>({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  branchId: Joi.string().required(),
});

export const updateEmployeeSchema = Joi.object<Partial<Employee>>({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  position: Joi.string().min(2).max(50),
  branchId: Joi.string(),
});
