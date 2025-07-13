import { environment } from "./config/environment";
import server from "./server/index";
import { logger } from "./utils/logger";

server.listen(environment.PORT, () => {
  logger.error(`Server is running on port ${environment.PORT}`);
});
