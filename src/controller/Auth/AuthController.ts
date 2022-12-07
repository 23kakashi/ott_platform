import { Request, Response, Router } from "express";
import UserLoginServiceObj from "../../service/UserLoginService";
import { OK_STATUS_CODE } from "../../utils/httpStatusCode";
class AuthController {
  public authRouter: Router;

  constructor() {
    this.authRouter = Router();
    this.routes();
  }

  private routes(): void {
    this.authRouter.post(
      "/login/otp",
      async function (request: Request, response: Response) {
        try {
          const { email } = request.body;
          await UserLoginServiceObj.sendOtpUserViaEmail(email);
          return response.status(OK_STATUS_CODE).json({ message: "otp sent" });
        } catch (error: any) {
          return response.status(error.status).json({ message: error.message });
        }
      }
    );
  }
}

const AuthControllerObj = new AuthController();
export default AuthControllerObj;
