import { NextFunction, Request, Response } from "express";
import { logRequest } from "../logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  const originalSend = res.send;

  let responseBody: any;
  res.send = function (body) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  res.on("finish", () => {
    const elapsed = Date.now() - start;
    logRequest(req, res, responseBody, elapsed);
  });

  next();
};
