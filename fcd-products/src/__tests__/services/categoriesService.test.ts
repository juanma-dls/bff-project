import axios from "axios";
import { categoriesService } from "../../services/categoriesService";
import CustomError from "../../utils/errors/customError";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("categoriesService", () => {
  it("should return data when axios returns a list", async () => {
    const mockData = ["beauty", "smartphones"];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await categoriesService();

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("should throw CustomError when data is empty", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    await expect(categoriesService()).rejects.toThrow(CustomError);
    await expect(categoriesService()).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw CustomError on axios error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await expect(categoriesService()).rejects.toThrow(CustomError);
    await expect(categoriesService()).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
