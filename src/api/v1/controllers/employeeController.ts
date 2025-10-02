

import { Request, Response } from "express";
import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = (_req: Request, res: Response) => {
  res.json(employees);
};

export const getEmployeeById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
};

export const createEmployee = (req: Request, res: Response) => {

  //Create new employee
  const newEmployee: Employee = {
    id: employees.length + 1,
    ...req.body,
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

// Update an existing employee
export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return res.status(404).json({ message: "Employee not found" });

  employees[index] = { ...employees[index], ...req.body };
  res.json(employees[index]);
};


// Delete an employee by their ID
export const deleteEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return res.status(404).json({ message: "Employee not found" });

  employees.splice(index, 1);
  res.json({ message: "Employee deleted successfully" });
};
