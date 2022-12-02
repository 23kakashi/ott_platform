import Redis from "ioredis";
import { log } from "../logger";
require("dotenv").config();

export const storeOtp = async (email: string, otp: string) => {
  try {
    const redis = new Redis({
      host: process.env.REDIS_API,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
    });
    await redis.set(email, otp);
    log.info(`otp saved on redis against ${email}`);
    return { error: false };
  } catch (error) {
    log.error(`failed to save otp on redis against ${email}`, error);
    return { error: true };
  }
};

export const getOtp = async (email: string) => {
  try {
    const redis = new Redis({
      host: process.env.REDIS_API,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
    });
    log.info(`otp received from redis against ${email}`);
    return { error: false };
  } catch (error) {
    log.error(`failed to receive otp from redis against ${email}`, error);
    return { error: true };
  }
};
