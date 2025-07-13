import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

const allowedHeaders = ["x-auth-token", "site", "user-agent", "host"];

function filterHeaders(headers: Record<string, any>) {
  const filtered: Record<string, any> = {};
  for (const key of allowedHeaders) {
    if (headers[key]) {
      filtered[key] = key === "x-auth-token" ? "[REDACTED]" : headers[key];
    }
  }
  return filtered;
}

export const logRequest = (
  req: any,
  res: any,
  body: any,
  elapsedTime: number,
) => {
  const { method, originalUrl, url, query, body: requestBody, headers } = req;
  const status = res.statusCode;

  const message = `
========== [Request Start] ==========
Method: ${method}
Path: ${originalUrl || url}
Status: ${status}
Headers: ${JSON.stringify(filterHeaders(headers), null, 2)}
Query: ${JSON.stringify(query, null, 2)}
Body: ${JSON.stringify(requestBody, null, 2)}
Response body: ${typeof body === "string" ? JSON.stringify(JSON.parse(body), null, 2) : JSON.stringify(body, null, 2)}
Elapsed time: ${elapsedTime} ms
========== [Request End] ============
`;

  if (status >= 500) {
    logger.error(message);
  } else if (status === 401 || status === 400) {
    logger.warn(message);
  } else {
    logger.info(message);
  }
};
