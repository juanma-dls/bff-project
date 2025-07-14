import axios from "axios";
import { searchByCategoryService } from "../../services/searchByCategoryService";
import CustomError from "../../utils/errors/customError";
import { Request } from "express";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("searchByCategoryService", () => {
  const mockReq = {
    params: { category: "smartphones" },
    headers: { "x-auth-token": "valid-token" },
  } as unknown as Request;

  const validResponse = {
    items: [
      { id: 1, title: "Mocked iPhone" },
      { id: 2, title: "Mocked Samsung" },
    ],
  };

  it("should return data when items exist", async () => {
    mockedAxios.get.mockResolvedValue({ data: validResponse });

    const result = await searchByCategoryService(mockReq);

    expect(result).toEqual(validResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("smartphones"),
      {
        headers: mockReq.headers,
        timeout: expect.any(Number),
      },
    );
  });

  it("should throw CustomError when items is empty", async () => {
    mockedAxios.get.mockResolvedValue({ data: { items: [] } });

    await expect(searchByCategoryService(mockReq)).rejects.toThrow(CustomError);
    await expect(searchByCategoryService(mockReq)).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should re-throw CustomError if already thrown", async () => {
    const customError = new CustomError("Handled", 401);
    mockedAxios.get.mockRejectedValue(customError);

    await expect(searchByCategoryService(mockReq)).rejects.toBe(customError);
  });

  it("should throw CustomError on axios error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Connection timeout"));

    await expect(searchByCategoryService(mockReq)).rejects.toThrow(CustomError);
    await expect(searchByCategoryService(mockReq)).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
