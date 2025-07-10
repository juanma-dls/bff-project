import request from "supertest";
import server from "../server";
import { environment } from "../config/environment";

describe("DELETE /api/products/category/:category", () => {
  it("should return real data with TOKEN_VALIDO", async () => {
    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");
    expect([200, 400, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("result");
      expect(res.body).toHaveProperty("items_delete");
    }
  });

  it("should return mock data with TOKEN_ALTERNATIVO", async () => {
    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_ALTERNATIVO)
      .set("site", "MLA");
    expect(res.status).toBe(200);
    console.log("res.body -->", res.body);
    expect(res.body).toHaveProperty("result");
    expect(res.body).toHaveProperty("items_delete");
  });
});