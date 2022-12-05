require("dotenv").config();

export const redisConfig = {
  host: process.env.REDIS_API,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
};
