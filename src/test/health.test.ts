import request from "supertest";
import app from "../app";

describe("GET /health", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Server is healthy");
  });

  it("should return text content", async () => {
    const response = await request(app).get("/health");
    expect(typeof response.text).toBe("string");
  });
});
