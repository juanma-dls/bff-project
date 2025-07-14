import axios from "axios";
import { productsByCategoryService } from "../../services/productsByCategoryService";
import CustomError from "../../utils/errors/customError";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData = ["beauty", "asdasd"];

describe("productsByCategoryService", () => {
  it("should return data when axios returns a list", async () => {
    const mockResponse = {
      products: [
        {
          id: 1,
          title: "Mocked iPhone",
          price: 1000,
          discountPercentage: 10,
          rating: 4.8,
          thumbnail: "mock-thumbnail.jpg",
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const result = await productsByCategoryService("smartphones");

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("should throw CustomError when data is empty", async () => {
    const mockEmptyResponse = { products: [] };
    mockedAxios.get.mockResolvedValue({ data: mockEmptyResponse });

    await expect(productsByCategoryService("empty-category")).rejects.toThrow(
      CustomError,
    );
    await expect(
      productsByCategoryService("empty-category"),
    ).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw CustomError on axios error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await expect(productsByCategoryService("error")).rejects.toThrow(
      CustomError,
    );
    await expect(productsByCategoryService("error")).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
