import request from "supertest";
import server from "../server";

describe("DELETE /api/products/:id", () => {
  it("should return a product object or 404 if not found", async () => {
    const res = await request(server)
      .delete("/api/products/1")
      .set("site", "MLA");
    expect([200, 404]).toContain(res.status);
    // Si es 200, debe tener un objeto product
    if (res.status === 200) {
      expect(res.body).toHaveProperty("product");
    }
  });
});
