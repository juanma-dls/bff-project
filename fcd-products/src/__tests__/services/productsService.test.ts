import axios from "axios";
import { productsService } from "../../services/productsService";
import CustomError from "../../utils/errors/customError";
import { Request } from "express";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("productsService", () => {
  const mockReq = {
    query: {
      q: "iphone",
      limit: 5,
    },
  } as unknown as Request;

  it("should return products when data is valid", async () => {
    const mockData = {
      products: {
        products: [
          {
            id: 1,
            title: "iPhone X",
            price: 1000,
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await productsService(mockReq);
    expect(result).toEqual(mockData.products);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/products"),
      expect.objectContaining({
        params: mockReq.query,
        timeout: expect.any(Number),
      }),
    );
  });

  it("should throw CustomError when data is empty", async () => {
    mockedAxios.get.mockResolvedValue({ data: { products: { products: [] } } });

    await expect(productsService(mockReq)).rejects.toThrow(CustomError);
    await expect(productsService(mockReq)).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw CustomError on axios error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(productsService(mockReq)).rejects.toThrow(CustomError);
    await expect(productsService(mockReq)).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
