import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { json } from "stream/consumers";
import jwtDecode from "jwt-decode";
import { deocdedType } from "../types/jwt.types";

declare global {
  namespace Express {
    export interface Request {
      user?: deocdedType;
    }
  }
}

export const checkAccessLevel = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const cookie = request.headers?.cookie || "";
    const receivedToken = cookie.split(";")[0].split("=")[1];
    jwt.verify(
      receivedToken,
      "eiuof978weruyiuwef79438rferi23",
      (err: any, decoded: deocdedType | any) => {
        if (err) {
          return response
            .status(404)
            .json({ error: true, message: "token verification failed" });
        }
        // const obj = (decoded)jwtDecode<deocdedType>;
        request.user = decoded;
        if (decoded.role === "admin") {
          next();
        }
        response
          .status(401)
          .json({ error: true, message: "unauthorized user" });
      }
    );
  } catch (error) {
    return {
      status: 401,
      error: true,
      message: "access denied",
    };
  }
};
