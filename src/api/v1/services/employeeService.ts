import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => {
  // Return all employees
  return employees;
};

export const getEmployeeById = (id: number): Employee | undefined => {
  // Find single employee by ID
  return employees.find((e) => e.id === id);
};

export const addEmployee = (data: Omit<Employee, "id">): Employee => {
  // Create new employee
  const newEmployee: Employee = {
    id: employees.length + 1,
    ...data,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (id: number, updatedData: Partial<Employee>): Employee | null => {
  // Updating  existing employee
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updatedData };
  return employees[index];
};

export const deleteEmployee = (id: number): boolean => {
  // Delete  employee by ID
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
};
