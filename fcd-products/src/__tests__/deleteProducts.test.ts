import request from "supertest";
import server from "../server";
import { environment } from "../config/environment";
import { mockedCategory } from "../mocks/categoryMock";
import { mockedProductDelete } from "../mocks/productDeleteMock";
import { mockedProductsResponse } from "../mocks/productsMock";
import { categoriesService } from "../services/categoriesService";
import { deleteProductByIdService } from "../services/deleteProductByIdService";
import { productsByCategoryService } from "../services/productsByCategoryService";

jest.mock("../services/categoriesService");
jest.mock("../services/deleteProductByIdService");
jest.mock("../services/productsByCategoryService");

describe("DELETE /api/products/category (mocked services)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return expected structure using mocked microservices", async () => {
    (categoriesService as jest.Mock).mockResolvedValue(mockedCategory);
    (deleteProductByIdService as jest.Mock).mockResolvedValue(
      mockedProductDelete,
    );
    (productsByCategoryService as jest.Mock).mockResolvedValue(
      mockedProductsResponse,
    );

    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("result", "ok");
    expect(res.body).toHaveProperty("items_delete", 2);
  });

  it("should return 400 if category is invalid", async () => {
    // Mockeo categorías permitidas, sin incluir 'beauty'
    (categoriesService as jest.Mock).mockResolvedValue([
      "smartphones",
      "laptops",
    ]);

    const res = await request(server)
      .delete("/api/products/category/beauty") // categoría inválida respecto al mock
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].message).toMatch(/category is not valid/i);
  });

  it("should return 400 if token or site is missing", async () => {
    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("site", "MLA"); // falta token

    expect(res.status).toBe(400);
  });

  it("should return 401 if token is invalid", async () => {
    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", "xxxx-xxxx-xxxx-xxxx") // token inválido
      .set("site", "MLA");

    expect(res.status).toBe(401);
  });
});
