import Redis from "ioredis";
import { redisConfig } from "../../config/redis.connection";
import { log } from "../logger";

export const setOtp = async (email: string, otp: string) => {
  try {
    //set otp on redis with an expiry of 10 min
    // const redis = new Redis(redisConfig);
    // await redis.set(email, otp, "EX", 600);
    // log.info(`otp saved on redis against ${email}`);
    // redis.quit();
    const redis = await setToRedis(email, otp);
    return { error: false };
  } catch (error) {
    log.error(`failed to save otp on redis against ${email}`, error);
    return { error: true };
  }
};

export const getOtp = async (email: string) => {
  try {
    const otp = await getFromRedis(email);
    return { error: false, otp: otp };
  } catch (error) {
    log.error(`failed to receive otp from redis against ${email}`, error);
    return { error: true, otp: "" };
  }
};

export const setToRedis = async (email: string, otp: string) => {
  try {
    const redis = new Redis(redisConfig);
    await redis.set(email, otp, "EX", 600);
    log.info(`otp saved on redis against ${email}`);
    redis.quit();
    return true;
  } catch (error) {
    return false;
  }
};

export const getFromRedis = async (email: string) => {
  try {
    const redis = new Redis(redisConfig);
    const otp: string = (await redis.get(email)) || "";
    log.info(`otp received from redis against ${email}`);
    redis.quit();
    return otp;
  } catch (error) {
    return "";
  }
};
