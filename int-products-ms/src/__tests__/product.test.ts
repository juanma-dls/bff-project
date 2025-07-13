import request from "supertest";
import server from "../server";

describe("GET /api/products/search", () => {
  it("should return products with limit, skip, total and products array", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("site", "MLA");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(res.body.products).toHaveProperty("limit");
    expect(res.body.products).toHaveProperty("skip");
    expect(res.body.products).toHaveProperty("total");
    expect(Array.isArray(res.body.products.products)).toBe(true);
  });
});
