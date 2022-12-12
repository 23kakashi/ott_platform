import { Request, Response, Router } from "express";
import UserLoginServiceObj from "../../service/UserLoginService";
import { INTERNAL_SERVER_ERROR_STATUS_CODE, OK_STATUS_CODE } from "../../utils/httpStatusCode";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../../Error/customErrorMessage";
import ErrorHandler from "../../Error/ErrorHandler";
import UserRepositoryObj from "../../repository/UserRepository";
import JwtTokenObj from "../../utils/jwt/jwttoken";

class AuthController {
  public authRouter: Router;
  constructor() {
    this.authRouter = Router();
    this.routes();
  }

  private async otpController(request: Request, response: Response) {
    try {
      const { email } = request.body;
      await UserLoginServiceObj.sendOtpToValidUserViaEmail(email);
      return response.status(OK_STATUS_CODE).json({ message: "otp sent" });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  private async otpVerificaitonController(request: Request, response: Response) {
    try {
      const { email, otp } = request.body;
      await UserLoginServiceObj.verifyLoginOtp(email, otp);
      const user = await UserRepositoryObj.getUserByEmail(email);

      const token = JwtTokenObj.signJwtToken(user?.role || "", user?.email || "");
      return response
        .cookie("authott", token, {
          httpOnly: true,
          secure: false,
        })
        .status(OK_STATUS_CODE)
        .json({ message: "user logged in" });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  routes() {
    this.authRouter.post("/login/otp", this.otpController);
    this.authRouter.post("/login/verify", this.otpVerificaitonController);
  }
}

const AuthControllerObj = new AuthController();
export default AuthControllerObj;
