import axios from "axios";
import { Request } from "express";
import { searchProductService } from "../../services/searchProductService";
import CustomError from "../../utils/errors/customError";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("searchProductService", () => {
  const mockReq = {
    headers: { "x-auth-token": "valid-token" },
    query: { q: "iphone" },
  } as unknown as Request;

  const validResponse = {
    items: [
      { id: 1, title: "Mocked iPhone", price: 1000 },
      { id: 2, title: "Mocked Samsung", price: 800 },
    ],
    paging: { total: 2, offset: 0, limit: 10 },
  };

  it("should return data when axios returns valid items", async () => {
    mockedAxios.get.mockResolvedValue({ data: validResponse });

    const result = await searchProductService(mockReq);

    expect(result).toEqual(validResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: mockReq.headers,
      params: mockReq.query,
      timeout: expect.any(Number),
    });
  });

  it("should throw CustomError when items is empty", async () => {
    mockedAxios.get.mockResolvedValue({ data: { items: [] } });

    await expect(searchProductService(mockReq)).rejects.toThrow(CustomError);
    await expect(searchProductService(mockReq)).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw CustomError on axios failure", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await expect(searchProductService(mockReq)).rejects.toThrow(CustomError);
    await expect(searchProductService(mockReq)).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
