import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED_ACCESS_MESSAGE } from "../Error/customErrorMessage";
import ErrorHandler from "../Error/ErrorHandler";
import { RequestUserType } from "../types/loginCredentials.types";

declare global {
  namespace Express {
    export interface Request {
      user?: RequestUserType;
    }
  }
}

const requireLogin = (request: Request, response: Response, next: NextFunction) => {
  const cookie = request.headers?.cookie || "";
  const receivedToken = cookie.split(";")[0].split("=")[1];
  try {
    jwt.verify(receivedToken, "eiuof978weruyiuwef79438rferi23", (err: any, decoded: any) => {
      if (err) {
        throw new ErrorHandler(UNAUTHORIZED_ACCESS_MESSAGE);
      }
      request.user = decoded;
      next();
    });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      response.status(error.erroCode).json({ error: true, message: error.errorMessage });
    }
  }
};

export default requireLogin;
