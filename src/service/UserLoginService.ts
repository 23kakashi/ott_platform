import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_OTP_MESSAGE,
  INVALID_USER_MESSAGE,
  OTP_EXPIRED_MESSAGE,
} from "../Error/customErrorMessage";
import ErrorHandlerObj from "../Error/ErrorHandler";
import UserRepositoryObj from "../repository/UserRepository";
import { UserType } from "../types/user.types";
import EmailServiceObj from "../utils/EmailService";
import GenerateOtpObj from "../utils/GenerateOtp";
import ValidationsObj from "../utils/validations";
import UserServiceObj from "./UserService";

class UserLoginService {
  constructor() {}

  public async sendOtpToValidUserViaEmail(email: string): Promise<string | undefined | UserType> {
    const validateEmailResponse: boolean = ValidationsObj.validateEmail(email);
    if (!validateEmailResponse) {
      throw new ErrorHandlerObj(INVALID_EMAIL_MESSAGE);
    }

    const validateUserByEmailResponse: UserType | undefined = await UserServiceObj.validateUserByEmail(email);
    if (validateUserByEmailResponse === undefined) {
      throw new ErrorHandlerObj(INVALID_USER_MESSAGE);
    }

    const otp = await GenerateOtpObj.generateOtp(email);

    await EmailServiceObj.sendEmail(email, otp);

    return Promise.resolve("success");
  }

  public async verifyLoginOtp(email: string, otp: string): Promise<string | undefined> {
    const validateEmailResponse: boolean = ValidationsObj.validateEmail(email);
    if (!validateEmailResponse) {
      throw new ErrorHandlerObj(INVALID_EMAIL_MESSAGE);
    }

    const storedOtp = await GenerateOtpObj.getOtpFromDb(email);
    if (storedOtp === null || undefined) {
      throw new ErrorHandlerObj(OTP_EXPIRED_MESSAGE);
    }
    if (storedOtp !== otp) {
      throw new ErrorHandlerObj(INVALID_OTP_MESSAGE);
    }
    return Promise.resolve("success");
  }
}

const UserLoginServiceObj = new UserLoginService();
export default UserLoginServiceObj;
