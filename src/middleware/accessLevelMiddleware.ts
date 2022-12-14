import { Request, Response, NextFunction } from "express";
import { RequestUserType } from "../types/loginCredentials.types";
import ErrorHandler from "../Error/ErrorHandler";
import { UNAUTHORIZED_ACCESS_MESSAGE } from "../Error/customErrorMessage";
import APILogger from "../logger/logger";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: RequestUserType;
    }
  }
}
export const checkAccessLevel = (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.user?.role === "admin") {
      next();
    } else {
      throw new ErrorHandler(UNAUTHORIZED_ACCESS_MESSAGE);
    }
  } catch (error) {
    if (error instanceof ErrorHandler) {
      response.status(error.erroCode).json({ message: error.errorMessage });
    }
  }
};
