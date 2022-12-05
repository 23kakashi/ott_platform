import { getUserByEmail } from "../database/login/login.query";
import { userType } from "../types/user.types";
import { checkPassword, encryptPassword } from "../utils/encryption/encyption";
import { log } from "../utils/logger";
import { validateEmail } from "../utils/validation/validation";
import { generateOtp } from "../utils/otp/generate_otp";
import { getOtp, setOtp } from "../utils/otp/otp";
import {
  responceType,
  responceWithDataType,
} from "../types/api_response.types";
import { sendEmail } from "../utils/email/nodemailer";
import { validateOtp } from "../utils/validation/validation";
import "dotenv/config";
import { signJwtToken } from "../utils/jwt/jwttoken";

export const sendOtpToUser = async (email: string): Promise<responceType> => {
  try {
    const validaitonStatus: boolean = validateEmail(email);
    if (!validaitonStatus) {
      return {
        status: 401,
        error: true,
        message: "invalid email",
      };
    }
    log.info("valid email");
    const user: userType = await getUserByEmail(email);
    if (user === undefined) {
      return {
        status: 401,
        error: true,
        message: "invalid user",
      };
    }
    log.info("valid user");

    const otp = generateOtp();
    const hash = await encryptPassword(otp);
    await setOtp(email, hash);
    await sendEmail(email, otp);
    log.info(`email sent to ${email} with otp ${otp}`);
    return {
      status: 200,
      error: false,
      message: "otp request success",
    };
  } catch (error) {
    log.error("something went wrong with user login", error);
    return {
      status: 404,
      error: true,
      message: "otp request failed",
    };
  }
};

export const loginUser = async (
  email: string,
  otp: string
): Promise<responceWithDataType> => {
  try {
    const validateEmailResponse: boolean = validateEmail(email);
    const validateOtpResponse: boolean = validateOtp(otp);
    if (!validateEmailResponse || !validateOtpResponse) {
      return {
        status: 401,
        error: true,
        message: "invalid email or otp",
        data: [],
      };
    }
    log.info("valid email");
    const getOtpResponse = await getOtp(email);
    const otpCheckResponse = await checkOtp(getOtpResponse.otp, otp);
    if (otpCheckResponse.error) {
      return {
        ...otpCheckResponse,
        data: [],
      };
    }
    log.info("otp match success");
    const user = await getUserByEmail(email);
    const jwtToken = signJwtToken(user.role, user.userid);
    log.info("login success");
    return {
      status: 200,
      error: false,
      message: "login success",
      data: [jwtToken],
    };
  } catch (error) {
    log.error("login failed");
    return {
      status: 404,
      error: true,
      message: "login failed",
      data: [],
    };
  }
};

// varifying otp with its hash
export const checkOtp = async (otpHash: string, otp: string) => {
  if (otpHash === "") {
    return {
      status: 404,
      error: true,
      message: "otp expired",
    };
  }
  const hash = await checkPassword(otpHash, otp);
  if (!hash) {
    return {
      status: 404,
      error: true,
      message: "otp match failed",
    };
  }
  return {
    status: 200,
    error: false,
    message: "otp match success",
  };
};
