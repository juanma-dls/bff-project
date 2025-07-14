import request from "supertest";
import server from "../server";
import { environment } from "../config/environment";
import { deleteByCategoryService } from "../services/deleteByCategoryService";
import CustomError from "../utils/errors/customError";
import { mockedProductsDelete } from "../mocks/deleteProductsMock";

jest.mock("../services/deleteByCategoryService");

describe("DELETE /api/products/category (mocked services)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return expected structure using mocked microservices", async () => {
    (deleteByCategoryService as jest.Mock).mockResolvedValue(
      mockedProductsDelete,
    );

    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("result", "ok");
    expect(res.body).toHaveProperty("items_delete", 2);
  });

  it("should return 400 if token or site is missing", async () => {
    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("site", "MLA");
    expect([400]).toContain(res.status);
  });

  it("should return 401 if token is invalid", async () => {
    (deleteByCategoryService as jest.Mock).mockRejectedValue(
      new CustomError("Unauthorized", 401),
    );

    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", "xxxx-xxxx-xxxx-xxxx") // token inválido
      .set("site", "MLA");

    expect(res.status).toBe(401);
    expect(res.body.errors).toEqual([{ message: "Unauthorized" }]);
  });

  it("should return 500 if fcd not respond", async () => {
    (deleteByCategoryService as jest.Mock).mockRejectedValue(
      new CustomError("Error while fetching products", 500),
    );
    const res = await request(server)
      .delete("/api/products/category/smartphones")
      .set("x-auth-token", environment.TOKEN_VALIDO)
      .set("site", "MLA");

    expect(res.status).toBe(500);
    expect(res.body.errors).toEqual([
      { message: "Error while fetching products" },
    ]);
  });
});
