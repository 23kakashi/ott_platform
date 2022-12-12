import { Request, Response, NextFunction } from "express";
import { RequestUserType } from "../types/loginCredentials.types";
import ErrorHandler from "../Error/ErrorHandler";
import { UNAUTHORIZED_ACCESS_MESSAGE } from "../Error/customErrorMessage";

declare global {
  namespace Express {
    export interface Request {
      user?: RequestUserType;
    }
  }
}
const checkAccessLevel = (request: Request, response: Response, next: NextFunction) => {
  if (request.user?.role === "admin") {
    next();
  } else {
    throw new ErrorHandler(UNAUTHORIZED_ACCESS_MESSAGE);
  }
};

export default checkAccessLevel;
