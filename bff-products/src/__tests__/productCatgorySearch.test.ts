import request from "supertest";
import server from "../server";
import { environment } from "../config/environment";
import { searchByCategoryService } from "../services/searchByCategoryService";
import CustomError from "../utils/errors/customError";
import { mockedProductsByCategoryResponse } from "../mocks/productsMock";

jest.mock("../services/searchByCategoryService");

describe("GET /api/products/category (mocked services)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return expected structure using mocked microservices", async () => {
    (searchByCategoryService as jest.Mock).mockResolvedValue(
      mockedProductsByCategoryResponse,
    );

    const res = await request(server)
      .get("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(200);
    console.log("res -->", res.body);
    expect(res.body).toHaveProperty("paging");
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);

    expect(res.body.items[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: "Mocked iPhone",
        price: 1000,
        price_discount: 100,
        picture: "mock-thumbnail.jpg",
        rating: 4.8,
        free_shipping: false,
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
    (searchByCategoryService as jest.Mock).mockRejectedValue(
      new CustomError("Unauthorized", 401),
    );

    const res = await request(server)
      .get("/api/products/category/smartphones")
      .set("x-auth-token", "xxxx-xxxx-xxxx-xxxx") // token inválido
      .set("site", "MLA");

    expect(res.status).toBe(401);
    expect(res.body.errors).toEqual([{ message: "Unauthorized" }]);
  });

  it("should return 500 if fcd not respond", async () => {
    (searchByCategoryService as jest.Mock).mockRejectedValue(
      new CustomError("Error while fetching products", 500),
    );
    const res = await request(server)
      .get("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(500);
    expect(res.body.errors).toEqual([
      { message: "Error while fetching products" },
    ]);
  });
});
