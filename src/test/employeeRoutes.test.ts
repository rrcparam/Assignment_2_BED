import request from "supertest";
import app from "../app";

describe("Employee Routes", () => {
  describe("GET /api/v1/employees", () => {
    it("should return all employees", async () => {

      //Act
      const res = await request(app).get("/api/v1/employees");

      //Assert
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should return a single employee by ID", async () => {

      //ACt
      const res = await request(app).get("/api/v1/employees/1");

      //Assert
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", 1);
    });

    it("should return 404 for non-existent employee", async () => {

      //Act
      const res = await request(app).get("/api/v1/employees/9999");

      //Assert
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/v1/employees", () => {
    it("should create a new employee", async () => {
      const newEmployee = {
        name: "Test User",
        position: "Tester",
        department: "QA",
        email: "test.user@pixell-river.com",
        phone: "123-456-7890",
        branchId: 1,
      };
      
      //ACt
      const res = await request(app).post("/api/v1/employees").send(newEmployee);

      //Assert
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(newEmployee);
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/v1/employees").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should update an existing employee", async () => {
      const res = await request(app)
        .put("/api/v1/employees/1")
        .send({ phone: "987-654-3210" });
      
        //Assert
      expect(res.statusCode).toBe(200);
      expect(res.body.phone).toBe("987-654-3210");
    });

    it("should return 404 if employee to update is not found", async () => {
      const res = await request(app).put("/api/v1/employees/9999").send({ phone: "000-000-0000" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should delete an employee", async () => {

      //Act
      const res = await request(app).delete("/api/v1/employees/1");

      //Assert
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if employee to delete is not found", async () => {

      //ACt
      const res = await request(app).delete("/api/v1/employees/9999");

      //Assert
      expect(res.statusCode).toBe(404);
    });
  });
});
