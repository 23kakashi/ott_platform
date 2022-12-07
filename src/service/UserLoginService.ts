import { INVALID_EMAIL_MESSAGE } from "../Error/customErrorMessage";
import ErrorHandlerObj from "../Error/ErrorHandler";
import ValidationsObj from "../utils/validations";

class UserLoginService {
  constructor() {}

  public async sendOtpUserViaEmail(email: string): Promise<string | undefined> {
    const emailValidaitonResponse: boolean = ValidationsObj.validateEmail(email);
    if (!emailValidaitonResponse) {
      throw ErrorHandlerObj.handleError(INVALID_EMAIL_MESSAGE);
    }

    return Promise.resolve("success");
  }
}

const UserLoginServiceObj = new UserLoginService();
export default UserLoginServiceObj;
