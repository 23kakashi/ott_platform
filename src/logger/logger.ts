import bunyan from "bunyan";
import Logger from "bunyan";
import { v4 as uuid } from "uuid";

// logger for each API
const logger = bunyan.createLogger({
  name: "job-portal",
  "request-id": uuid(),
});

class APILogger {
  logger: Logger;
  constructor() {
    this.logger = logger;
  }

  info(message: string) {
    this.logger.info(`${message}`);
  }

  error(message: string) {
    this.logger.error(message);
  }
}

export default APILogger;
