import axios from "axios";
import { deleteByCategoryService } from "../../services/deleteByCategoryService";
import CustomError from "../../utils/errors/customError";
import { Request } from "express";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("deleteByCategoryService", () => {
  const mockReq = {
    params: { category: "smartphones" },
    headers: { "x-auth-token": "valid-token" },
  } as unknown as Request;

  it("should return data when deletion is successful", async () => {
    const mockResponse = { items_delete: 2 };
    mockedAxios.delete.mockResolvedValue({ data: mockResponse });

    const result = await deleteByCategoryService(mockReq);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      expect.stringContaining("smartphones"),
      {
        headers: mockReq.headers,
        timeout: expect.any(Number),
      },
    );
  });

  it("should throw CustomError when no data returned", async () => {
    mockedAxios.delete.mockResolvedValue({ data: null });

    await expect(deleteByCategoryService(mockReq)).rejects.toThrow(CustomError);
    await expect(deleteByCategoryService(mockReq)).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw CustomError on axios failure", async () => {
    mockedAxios.delete.mockRejectedValue(new Error("Network error"));

    await expect(deleteByCategoryService(mockReq)).rejects.toThrow(CustomError);
    await expect(deleteByCategoryService(mockReq)).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
