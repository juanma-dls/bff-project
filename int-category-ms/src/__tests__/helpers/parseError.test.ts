import axios from "axios";
import { parseError } from "../../helper/parseError";
import CustomError from "../../utils/errors/customError";

describe("parseError", () => {
  const defaultMessage = "Unexpected error";
  const defaultStatus = 500;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should handle AxiosError with response and error message", () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 404,
        data: {
          errors: [{ message: "Not Found" }],
        },
      },
      message: "Fallback message",
    };

    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);

    const parsed = parseError(axiosError);
    expect(parsed).toEqual({ status: 404, message: "Not Found" });
  });

  it("should fallback to error.message if AxiosError has no response data", () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 500, data: {} },
      message: "Only message available",
    };

    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);

    const parsed = parseError(axiosError);
    expect(parsed).toEqual({ status: 500, message: "Only message available" });
  });

  it("should fallback to defaultMessage if AxiosError has no response and no message", () => {
    const axiosError = {
      isAxiosError: true,
    };

    jest.spyOn(axios, "isAxiosError").mockReturnValue(true);

    const parsed = parseError(axiosError);
    expect(parsed).toEqual({ status: defaultStatus, message: defaultMessage });
  });

  it("should handle CustomError instance", () => {
    const customError = new CustomError("Custom failure");
    const parsed = parseError(customError);

    expect(parsed).toEqual({
      status: defaultStatus,
      message: "Custom failure",
    });
  });

  it("should handle unknown error", () => {
    const unknownError = { some: "random", error: true };
    const parsed = parseError(unknownError);

    expect(parsed).toEqual({
      status: defaultStatus,
      message: defaultMessage,
    });
  });
});
