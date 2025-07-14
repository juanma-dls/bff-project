import axios from "axios";
import { deleteProductByIdService } from "../../services/deleteProductByIdService";
import CustomError from "../../utils/errors/customError";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("deleteProductByIdService", () => {
  it("should return data if product found", async () => {
    const mockResponse = {
      product: {
        id: 1,
        isDeleted: true,
        deletedOn: "2025-07-13T23:28:24.768Z",
      },
    };
    mockedAxios.delete.mockResolvedValue({ data: mockResponse });

    const result = await deleteProductByIdService("1");

    expect(result).toEqual(mockResponse);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("/api/products/1"),
      expect.objectContaining({ timeout: expect.any(Number) }),
    );
  });

  it("should throw CustomError if product not found", async () => {
    mockedAxios.delete.mockResolvedValue({ data: {} });

    await expect(deleteProductByIdService("1")).rejects.toThrow(CustomError);
    await expect(deleteProductByIdService("1")).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw CustomError on axios error", async () => {
    mockedAxios.delete.mockRejectedValue(new Error("Network failure"));

    await expect(deleteProductByIdService("1")).rejects.toThrow(CustomError);
    await expect(deleteProductByIdService("1")).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
