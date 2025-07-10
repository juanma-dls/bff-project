import request from "supertest";
import server from "../server";

describe("GET /api/categories", () => {
  it("should return an array of categories", async () => {
    const res = await request(server)
      .get("/api/categories")
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});