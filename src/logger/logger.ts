import bunyan from "bunyan";
import { v4 as uuid } from "uuid";

// logger for each API

class Logger {
  public log;

  constructor() {
    this.log = new bunyan({
      name: "job-portal",
      "request-id": uuid(),
    });
  }
}

export default Logger;
