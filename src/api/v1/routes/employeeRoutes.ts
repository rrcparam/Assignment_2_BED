import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  addEmployee,      
  updateEmployee,
  deleteEmployee,   
} from "../services/employeeService";

const router = express.Router();

router.use(express.json());

//This is for GET all employees
router.get("/", (_req, res) => {
  const employees = getAllEmployees();
  res.json(employees);
});

// This is for GET employee by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = getEmployeeById(id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.json(employee);
});

//  POST(create employee)
router.post("/", (req, res) => {
  const { name, position, department, email, phone, branchId } = req.body;

  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEmployee = addEmployee({ name, position, department, email, phone, branchId });
  res.status(201).json(newEmployee);
});

// PUT update employee
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = updateEmployee(id, req.body);
  if (!updatedEmployee) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.json(updatedEmployee);
});

// DELETE delete employee
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = deleteEmployee(id);
  if (!deleted) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.status(200).json({ message: "Employee deleted" });
});

export default router;
