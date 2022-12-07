import { App } from "./app";
import { Log } from "./logger/logger";
//connection
const PORT = process.env.NODE_ENV === "test" ? 3000 : process.env.PORT;
const server = new App();
const { log } = new Log();
server.connection.listen(PORT, async () => {
  try {
    log.info(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    log.error("Internal Server Error Occured");
  }
});
