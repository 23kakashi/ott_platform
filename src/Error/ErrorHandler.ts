import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_USER_MESSAGE,
  OTP_EXPIRED_MESSAGE,
  INVALID_OTP_MESSAGE,
  UNAUTHORIZED_ACCESS_MESSAGE,
} from "./customErrorMessage";
import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  UNAUTHORIZED_ACCESS_STATUS_CODE,
} from "../utils/httpStatusCode";

class ErrorHandler extends Error {
  public erroCode: number;
  public errorMessage: string;
  constructor(errorMessage: string) {
    super();
    this.erroCode = INTERNAL_SERVER_ERROR_STATUS_CODE;
    this.errorMessage = errorMessage;
    this.handleError();
  }

  public handleError() {
    switch (this.errorMessage) {
      case INVALID_EMAIL_MESSAGE:
        this.erroCode = UNAUTHORIZED_ACCESS_STATUS_CODE;
        this.errorMessage = INVALID_EMAIL_MESSAGE;
        break;
      case INVALID_USER_MESSAGE:
        this.erroCode = UNAUTHORIZED_ACCESS_STATUS_CODE;
        this.errorMessage = INVALID_USER_MESSAGE;
        break;
      case UNAUTHORIZED_ACCESS_MESSAGE:
        this.erroCode = UNAUTHORIZED_ACCESS_STATUS_CODE;
        this.errorMessage = UNAUTHORIZED_ACCESS_MESSAGE;
        break;
      case OTP_EXPIRED_MESSAGE:
        this.erroCode = NOT_FOUND_STATUS_CODE;
        this.errorMessage = OTP_EXPIRED_MESSAGE;
        break;
      case INVALID_OTP_MESSAGE:
        this.erroCode = NOT_FOUND_STATUS_CODE;
        this.errorMessage = INVALID_OTP_MESSAGE;
        break;
      default:
        this.erroCode = INTERNAL_SERVER_ERROR_STATUS_CODE;
        this.errorMessage = INTERNAL_SERVER_ERROR_MESSAGE;
    }
  }
}

// const ErrorHandlerObj = new ErrorHandler();
export default ErrorHandler;
