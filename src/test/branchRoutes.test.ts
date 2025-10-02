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