// import * as path from "path";
import path from "path";
import "dotenv/config";

export default {
  development: {
    client: "pg",
    connection:
      "postgres://wlvrnqyn:yf5xexuTkWx6zFIlZa7ivfUbsdOBTu1n@tiny.db.elephantsql.com/wlvrnqyn",
    //  process.env.CONNECTION_STRING,
    migrations: {
      directory: path.join(__dirname, "config", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "config", "seeds"),
    },
  },
};
