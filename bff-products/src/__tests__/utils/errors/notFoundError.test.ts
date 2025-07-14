import CustomError from "../../../utils/errors/customError";
import NotFoundError from "../../../utils/errors/notFoundError";

describe("NotFoundError", () => {
  const path = "/invalid/route";
  const error = new NotFoundError(path);

  it("should be an instance of CustomError", () => {
    expect(error).toBeInstanceOf(CustomError);
  });

  it("should have statusCode 404", () => {
    expect(error.statusCode).toBe(404);
  });

  it("should contain the correct message", () => {
    expect(error.message).toBe(`Route not found: ${path}`);
  });

  it("should serialize errors correctly", () => {
    expect(error.serializeErrors()).toEqual([{ message: "Route not found" }]);
  });
});
