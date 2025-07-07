import { environment } from "./config/environment";
import server from "./server/index";

server.listen(environment.PORT, () => {
  console.log(`Server is running on port ${environment.PORT}`);
});
