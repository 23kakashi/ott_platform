// import * as path from "path";
import path from "path";
// import * as dotenv from "dotenv";
require("dotenv").config();

export default {
  development: {
    client: "pg",
    connection: process.env.CONNECTION_STRING,
    // "postgres://wlvrnqyn:yf5xexuTkWx6zFIlZa7ivfUbsdOBTu1n@tiny.db.elephantsql.com/wlvrnqyn",
    migrations: {
      directory: path.join(__dirname, "config", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "config", "seeds"),
    },
  },
};
