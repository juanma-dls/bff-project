import CustomError from "../../../utils/errors/customError";
import errorHandler from "../../../utils/middlewares/errorHandler";


describe("errorHandler middleware", () => {
  const mockReq = {} as any;
  const mockNext = jest.fn();

  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;
  let mockRes: any;

  beforeEach(() => {
    mockStatus = jest.fn().mockReturnThis();
    mockJson = jest.fn().mockReturnThis();
    mockRes = { status: mockStatus, json: mockJson };
  });

  it("should handle CustomError correctly", () => {
    const error = new CustomError("Bad Request", 400);

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      errors: error.serializeErrors(),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should handle generic errors with 500", () => {
    const error = new Error("Something went wrong");

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      errors: [{ message: "Internal Server Error" }],
    });
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});