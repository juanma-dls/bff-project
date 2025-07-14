import axios from "axios";
import { freeShippingService } from "../../services/freeShippingService";
import CustomError from "../../utils/errors/customError";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("freeShippingService", () => {
  it("should return data when non-empty", async () => {
    const mockData = [{ id: 1, free_shipping: true }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await freeShippingService();

    expect(result).toEqual(mockData);
  });

  it("should throw 404 CustomError if empty data", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    await expect(freeShippingService()).rejects.toThrow(CustomError);
    await expect(freeShippingService()).rejects.toMatchObject({
      message: "Products not found",
      statusCode: 404,
    });
  });

  it("should throw 500 CustomError on axios error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Timeout"));

    await expect(freeShippingService()).rejects.toThrow(CustomError);
    await expect(freeShippingService()).rejects.toMatchObject({
      message: expect.stringContaining("Error while fetching products"),
      statusCode: 500,
    });
  });
});
