import request from "supertest";
import server from "../server";

describe("GET /health", () => {
  it("should return status OK", async () => {
    const res = await request(server).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toMatch(/OK/i);
  });
});