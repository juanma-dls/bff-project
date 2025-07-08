import axios from "axios";
import CustomError from "../utils/errors/customError";

export interface ParsedError {
  message: string;
  status: number;
}

export const parseError = (error: unknown, defaultMessage = "Unexpected error", defaultStatus = 500): ParsedError => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || defaultStatus,
      message:
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        defaultMessage,
    };
  }

  if (error instanceof CustomError) {
    return {
      status: defaultStatus,
      message: error.message,
    };
  }

  return {
    status: defaultStatus,
    message: defaultMessage,
  };
};
