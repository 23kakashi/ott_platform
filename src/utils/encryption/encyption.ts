import * as argon2 from "argon2";
import { log } from "../logger";
require("dotenv").config();

export const encryptPassword = async (password: string) => {
  const hash = await argon2.hash(password, {
    hashLength: 35,
  });
  log.info("hash generated");
  return hash;
};

export const checkPassword = async (hash: string, password: string) => {
  let result = await argon2.verify(hash, password);
  log.info("hash checked");
  return result;
};
