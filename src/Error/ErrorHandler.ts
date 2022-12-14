import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_USER_MESSAGE,
  OTP_EXPIRED_MESSAGE,
  INVALID_OTP_MESSAGE,
  UNAUTHORIZED_ACCESS_MESSAGE,
  PLAN_ALREADY_ACTIVE,
  INVALID_PLAN_MESSAGE,
  UPGREADE_TO_PREMIUM,
  BAD_REQUEST,
} from "./customErrorMessage";
import {
  BAD_REQUEST_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  OK_STATUS_CODE,
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
      case PLAN_ALREADY_ACTIVE:
        this.erroCode = OK_STATUS_CODE;
        this.errorMessage = PLAN_ALREADY_ACTIVE;
        break;
      case INVALID_PLAN_MESSAGE:
        this.erroCode = NOT_FOUND_STATUS_CODE;
        this.errorMessage = INVALID_PLAN_MESSAGE;
        break;
      case UPGREADE_TO_PREMIUM:
        this.erroCode = UNAUTHORIZED_ACCESS_STATUS_CODE;
        this.errorMessage = UPGREADE_TO_PREMIUM;
        break;
      case BAD_REQUEST:
        this.erroCode = BAD_REQUEST_STATUS_CODE;
        this.errorMessage = BAD_REQUEST;
        break;
      default:
        this.erroCode = INTERNAL_SERVER_ERROR_STATUS_CODE;
        this.errorMessage = INTERNAL_SERVER_ERROR_MESSAGE;
    }
  }
}

// const ErrorHandlerObj = new ErrorHandler();
export default ErrorHandler;
