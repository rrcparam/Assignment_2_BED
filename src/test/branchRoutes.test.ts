import request from "supertest";
import app from "../app";

describe("Branch Routes", () => {
  describe("GET /api/v1/branches", () => {
    it("should return all branches", async () => {
      // Act
      const res = await request(app).get("/api/v1/branches");
      
      // Assert
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});

describe("GET /api/v1/branches/:id", () => {
  it("should return a single branch by ID", async () => {
    // Act
    const res = await request(app).get("/api/v1/branches/1");
    
    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("should return 400 for invalid ID", async () => {
    // Act
    const res = await request(app).get("/api/v1/branches/abc");
    
    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 404 for non-existent branch", async () => {
    // Act
    const res = await request(app).get("/api/v1/branches/9999");
    
    // Assert
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});