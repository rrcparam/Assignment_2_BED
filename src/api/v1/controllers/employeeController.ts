import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validation/employeeSchemas";
import { successResponse, errorResponse } from "../models/responseModel";

 //in order to Get all employees
 
export const getAllEmployees = async (_req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(successResponse(employees, "Employees retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to fetch employees"));
  }
};


 // to Get employee by ID
 
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Firestore IDs are strings
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }

    res.status(200).json(successResponse(employee, "Employee retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to fetch employee"));
  }
};


 //Create a new employee
 
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = createEmployeeSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res
        .status(400)
        .json(errorResponse("Validation failed", error.details.map((d) => d.message).join(", ")));
      return;
    }

    const newId = await employeeService.createEmployee(value);
    res
      .status(201)
      .json(successResponse({ id: newId }, "Employee created successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to create employee"));
  }
};


  // Update an existing employee

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = updateEmployeeSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res
        .status(400)
        .json(errorResponse("Validation failed", error.details.map((d) => d.message).join(", ")));
      return;
    }

    const updatedEmployee = await employeeService.updateEmployee(req.params.id, value);

    if (!updatedEmployee) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }

    res
      .status(200)
      .json(successResponse(updatedEmployee, "Employee updated successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to update employee"));
  }
};


 // used to Delete employee by ID
 
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await employeeService.deleteEmployee(req.params.id);
    if (!success) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }

    res.status(200).json(successResponse(null, "Employee deleted successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to delete employee"));
  }
};
