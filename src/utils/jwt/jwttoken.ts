import { getUserByEmail } from "../../database/user.query";
import jwt from "jsonwebtoken";
import { log } from "../logger";
require("dotenv").config();

export const signJwtToken = (role: string, userid: string) => {
  return jwt.sign(
    { role: role, userid: userid },
    "eiuof978weruyiuwef79438rferi23",
    { expiresIn: "1d" }
  );
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, "eiuof978weruyiuwef79438rferi23");
};
