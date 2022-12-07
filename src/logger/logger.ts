import Logger from "bunyan";
import bunyan from "bunyan";
import { v4 as uuid } from "uuid";

export class Log {
  public log: Logger;
  constructor() {
    this.log = bunyan.createLogger({
      name: "ott_server_connect",
      reqid: uuid(),
    });
  }
}
