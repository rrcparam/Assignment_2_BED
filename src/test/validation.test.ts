import { createBranchSchema } from "../api/v1/validation/branchSchemas";
import { createEmployeeSchema } from "../api/v1/validation/employeeSchemas";


describe("Joi Validation Schemas", () => {
 
  it("should validate a correct branch schema", () => {
    // Arrange
    const validBranch = {
      name: "Toronto HQ",
      address: "123 King Street, Toronto, ON",
      phone: "416-555-7890",
    };

    // Act

    const { error } = createBranchSchema.validate(validBranch);

    // Assert
    expect(error).toBeUndefined();
  });

  it("should reject invalid branch data", () => {

    // Arrange

    const invalidBranch = {
      name: "", 
      address: 12345, 
    };

    // Act 

    const { error } = createBranchSchema.validate(invalidBranch);

    // Assert
    expect(error).toBeDefined();
  });

  
  it("should validate a correct employee schema", () => {
    // Arrange
    const validEmployee = {
      name: "Alice Johnson",
      email: "alice.johnson@pixell-river.com",
      position: "Manager",
      branchId: "1",
    };

    // Act
    const { error } = createEmployeeSchema.validate(validEmployee);

    // Assert
    expect(error).toBeUndefined();
  });

  it("should reject invalid employee data", () => {
    
    // Arrange
    const invalidEmployee = {
      name: "Amandeep", 
    };
    // Act
    const { error } = createEmployeeSchema.validate(invalidEmployee);

    // Assert
    expect(error).toBeDefined();
  });
});
