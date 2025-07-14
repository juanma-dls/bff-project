// tests/searchFacade.test.ts
import request from "supertest";
import server from "../server";
import { environment } from "../config/environment";
import { productsService } from "../services/productsService";
import { freeShippingService } from "../services/freeShippingService";
import { mockedProductsResponse } from "../mocks/productsMock";
import { mockedFreeShipping } from "../mocks/freeShippingMock";

jest.mock("../services/productsService");
jest.mock("../services/freeShippingService");

describe("GET /api/products/search (mocked services)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return expected structure using mocked microservices", async () => {
    (productsService as jest.Mock).mockResolvedValue(mockedProductsResponse);
    (freeShippingService as jest.Mock).mockResolvedValue(mockedFreeShipping);

    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("paging");
    expect(res.body).toHaveProperty("items");
    expect(res.body.items.length).toBe(2);
    expect(res.body.categories).toEqual(["smartphones"]);

    expect(res.body.items[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: "Mocked iPhone",
        price_with_discount: 900,
        free_shipping: true,
      }),
    );
  });

  it("should return mock data with TOKEN_ALTERNATIVO", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("x-auth-token", environment.TOKEN_ALTERNATIVO)
      .set("site", "MLA");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("paging");
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.categories).toEqual(
      expect.arrayContaining([expect.stringMatching(/mock/i)]),
    );
  });

  it("should return 400 if token or site is missing", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("site", "MLA");
    expect([400]).toContain(res.status);
  });

  it("should return 401 if token is invalid", async () => {
    const res = await request(server)
      .get("/api/products/search?q=iphone")
      .set("x-auth-token", "xxxx-xxxx-xxxx-xxxx")
      .set("site", "MLA");
    expect([401]).toContain(res.status);
  });
});
