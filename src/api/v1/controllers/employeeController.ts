import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const getAllEmployees = (_req: Request, res: Response): void => {
  const employees = employeeService.getAllEmployees();
  res.status(200).json(employees); 
};

export const getEmployeeById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const employee = employeeService.getEmployeeById(id);

  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json(employee); 
};

export const createEmployee = (req: Request, res: Response): void => {
  const { name, position, department, email, phone, branchId } = req.body;

  if (!name || !position || !department || !email || !phone || !branchId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newEmployee = employeeService.addEmployee({
    name,
    position,
    department,
    email,
    phone,
    branchId,
  });

  res.status(201).json(newEmployee);
};

export const updateEmployee = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const updatedEmployee = employeeService.updateEmployee(id, req.body);

  if (!updatedEmployee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json(updatedEmployee); 
};

export const deleteEmployee = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);

  if (!deleted) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json({ message: "Employee deleted successfully" });
};
