import Redis from "ioredis";
import { log } from "./logger";
require("dotenv").config();

export const saveOtpOnRedis = async (email: string) => {
  try {
    const redis = new Redis({
      host: process.env.REDIS_API,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
    });
    await redis.set("hi", `hello`);
    log.info(`otp saved on redis against ${email}`);
    return { error: false };
  } catch (error) {
    log.error(`failed to save otp on redis against ${email}`, error);
    return { error: true };
  }
};
