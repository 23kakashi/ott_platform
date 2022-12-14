/* eslint-disable no-useless-catch */
import Redis from "ioredis";
import { redisConfig } from "../config/redis.connection";

class GenerateOtp {
  public async generateOtp(email: string): Promise<string> {
    const otp: string = (Math.floor(Math.random() * 9000) + 1000).toString();
    await this.storeOtpInDb(email, otp);
    return Promise.resolve(otp);
  }

  async storeOtpInDb(email: string, otp: string): Promise<boolean> {
    try {
      const redis = new Redis(redisConfig);
      await redis.set(email, otp, "EX", 600);
      redis.quit();
      return Promise.resolve(true);
    } catch (error) {
      throw error;
    }
  }

  async getOtpFromDb(email: string): Promise<string | null> {
    try {
      const redis = new Redis(redisConfig);
      const storedotp = await redis.get(email);
      redis.quit();
      return Promise.resolve(storedotp);
    } catch (error) {
      throw error;
    }
  }
}

const GenerateOtpObj = new GenerateOtp();
export default GenerateOtpObj;
