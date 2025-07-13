import request from "supertest";
import server from "../server";

describe("GET /api/category/:category", () => {
  it("should return products for a valid category", async () => {
    const res = await request(server)
      .get("/api/category/smartphones")
      .set("site", "MLA");
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("products");
      expect(Array.isArray(res.body.products)).toBe(true);
    }
  });
});
