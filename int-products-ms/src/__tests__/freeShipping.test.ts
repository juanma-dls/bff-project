import request from "supertest";
import server from "../server";

describe("GET /api/products/free_shipping", () => {
  it("should return an array of free shipping product IDs", async () => {
    const res = await request(server)
      .get("/api/products/free_shipping")
      .set("site", "MLA");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});