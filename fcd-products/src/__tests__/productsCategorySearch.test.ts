import request from "supertest";
import server from "../server";
import { categoriesService } from "../services/categoriesService";
import { productsByCategoryService } from "../services/productsByCategoryService";
import { freeShippingService } from "../services/freeShippingService";
import { environment } from "../config/environment";
import { mockedProductsResponse } from "../mocks/productsMock";
import { mockedFreeShipping } from "../mocks/freeShippingMock";
import { mockedCategory } from "../mocks/categoryMock";

jest.mock("../services/categoriesService");
jest.mock("../services/productsByCategoryService");
jest.mock("../services/freeShippingService");

describe("GET /api/products/category (mocked services)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return expected structure using mocked microservices", async () => {
    (productsByCategoryService as jest.Mock).mockResolvedValue(
      mockedProductsResponse,
    );
    (freeShippingService as jest.Mock).mockResolvedValue(mockedFreeShipping);
    (categoriesService as jest.Mock).mockResolvedValue(mockedCategory);

    const res = await request(server)
      .get("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("paging");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);

    expect(res.body.items[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: "Mocked iPhone",
        price_discount: 100,
        freeShipping: true,
        picture: "mock-thumbnail.jpg",
        price: 1000,
        rating: 4.8,
      }),
    );
  });

  it("should return 400 if token or site is missing", async () => {
    const res = await request(server)
      .get("/api/products/category/smartphones")
      .set("site", "MLA");
    expect([400]).toContain(res.status);
  });

  it("should return 401 if token is invalid", async () => {
    const res = await request(server)
      .get("/api/products/category/smartphones")
      .set("x-auth-token", "xxxx-xxxx-xxxx-xxxx")
      .set("site", "MLA");
    expect([401]).toContain(res.status);
  });
});
