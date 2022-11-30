import Logger from "bunyan";
import bunyan from "bunyan";
import { v4 as uuid } from "uuid";

export const server_log: Logger = bunyan.createLogger({
  name: "ott_server_connect",
  reqid: uuid(),
});
