import { employees, Employee } from "../../../data/employees";

export function getAllEmployees(): Employee[] {
  return employees;
}

export function getEmployeeById(id: number): Employee | undefined {
  return employees.find(employee => employee.id === id);
}


export function addEmployee(data: Omit<Employee, "id">): Employee {
  const newEmployee: Employee = {
    id: Math.max(...employees.map(e => e.id), 0) + 1,
    ...data
  };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(id: number, updatedEmployee: Partial<Employee>): Employee | null {
  const index = employees.findIndex(employee => employee.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updatedEmployee };
  return employees[index];
}


export function deleteEmployee(id: number): boolean {
  const index = employees.findIndex(employee => employee.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
}
