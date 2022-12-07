import { ErrorType } from "../types/error.types";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_USER_MESSAGE,
  UNAUTHORIZED_ACCESS_MESSAGE,
} from "./customErrorMessage";
import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  UNAUTHORIZED_ACCESS_STATUS_CODE,
} from "../utils/httpStatusCode";

class ErrorHandler extends Error {
  constructor() {
    super();
  }

  public handleError(message: string): ErrorType {
    switch (message) {
      case INVALID_EMAIL_MESSAGE:
        return {
          status: UNAUTHORIZED_ACCESS_STATUS_CODE,
          message: INVALID_EMAIL_MESSAGE,
        };
      case INVALID_USER_MESSAGE:
        return {
          status: UNAUTHORIZED_ACCESS_STATUS_CODE,
          message: INVALID_USER_MESSAGE,
        };
      case UNAUTHORIZED_ACCESS_MESSAGE:
        return {
          status: UNAUTHORIZED_ACCESS_STATUS_CODE,
          message: UNAUTHORIZED_ACCESS_MESSAGE,
        };
      default:
        return {
          status: INTERNAL_SERVER_ERROR_STATUS_CODE,
          message: INTERNAL_SERVER_ERROR_MESSAGE,
        };
    }
  }
}

const ErrorHandlerObj = new ErrorHandler();
export default ErrorHandlerObj;
