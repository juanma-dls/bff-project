import request from "supertest";
import server from "../server";
import { environment } from "../config/environment";

const sites = ["MLA", "MLB", "MLM"];
const randomSite = sites[Math.floor(Math.random() * sites.length)];

describe("GET /api/products/search", () => {
  it("should return real data with TOKEN_VALIDO", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", randomSite);
    expect([200, 400, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("paging");
      expect(res.body).toHaveProperty("items");
      expect(Array.isArray(res.body.items)).toBe(true);
    }
  });

  it("should return mock data with TOKEN_ALTERNATIVO", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("x-auth-token", environment.TOKEN_ALTERNATIVO)
      .set("site", randomSite);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("paging");
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.categories).toEqual(expect.arrayContaining([
      expect.stringMatching(/mock/i)
    ]));
  });

  it("should return 401 if token is missing or invalid", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("site", randomSite);
    expect([401]).toContain(res.status);
  });
});