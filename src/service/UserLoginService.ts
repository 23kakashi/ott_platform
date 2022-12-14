import {
  INVALID_EMAIL_MESSAGE,
  INVALID_OTP_MESSAGE,
  INVALID_USER_MESSAGE,
  OTP_EXPIRED_MESSAGE,
} from "../Error/customErrorMessage";
import ErrorHandlerObj from "../Error/ErrorHandler";
import APILogger from "../logger/logger";
import { UserType } from "../types/user.types";
import EmailServiceObj from "../utils/EmailService";
import GenerateOtpObj from "../utils/GenerateOtp";
import ValidationsObj from "../utils/validations";
import UserServiceObj from "./UserService";

class UserLoginService {
  public async sendOtpToValidUserViaEmail(email: string, logger: APILogger): Promise<string | undefined | UserType> {
    const validateEmailResponse: boolean = ValidationsObj.validateEmail(email);
    if (!validateEmailResponse) {
      throw new ErrorHandlerObj(INVALID_EMAIL_MESSAGE);
    }
    logger.info("email is valid");

    const validateUserByEmailResponse: UserType | undefined = await UserServiceObj.validateUserByEmail(email);
    if (validateUserByEmailResponse === undefined) {
      throw new ErrorHandlerObj(INVALID_USER_MESSAGE);
    }
    logger.info("user is valid");

    const otp = await GenerateOtpObj.generateOtp(email);
    logger.info("otp is generated");
    await EmailServiceObj.sendEmail(email, otp);
    logger.info("email sent to user with otp");
    return Promise.resolve("success");
  }

  public async verifyLoginOtp(email: string, otp: string, logger: APILogger): Promise<string | undefined> {
    const validateEmailResponse: boolean = ValidationsObj.validateEmail(email);
    if (!validateEmailResponse) {
      throw new ErrorHandlerObj(INVALID_EMAIL_MESSAGE);
    }
    logger.info("email is valid");

    const storedOtp = await GenerateOtpObj.getOtpFromDb(email);
    if (storedOtp === null || undefined) {
      throw new ErrorHandlerObj(OTP_EXPIRED_MESSAGE);
    }
    logger.info("otp is retrived");
    if (storedOtp !== otp) {
      throw new ErrorHandlerObj(INVALID_OTP_MESSAGE);
    }
    logger.info("otp verified");
    return Promise.resolve("success");
  }
}

const UserLoginServiceObj = new UserLoginService();
export default UserLoginServiceObj;
