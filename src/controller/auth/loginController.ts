import { Request, Response, Router } from "express";
import { sendOtpToUser, loginUser } from "../../service/userLogin.service";

const authController = Router();

interface LoginEmailType {
  email: string;
}

interface LoginCredentialsType extends LoginEmailType {
  otp: string;
}

//routes
// login (send otp)
authController.get(
  "/login/otp",
  async (request: Request, response: Response) => {
    try {
      const { email }: LoginEmailType = request.body;
      const { status, error, message } = await sendOtpToUser(email);

      return response.status(status).json({
        error,
        message,
      });
    } catch (error) {
      return response.status(500).json({
        error: true,
        message: "internal server error",
      });
    }
  }
);

// varify otp
authController.get(
  "/login/verify",
  async (request: Request, response: Response) => {
    try {
      const { email, otp }: LoginCredentialsType = request.body;
      otp.toString();
      const { status, error, message, data } = await loginUser(email, otp);
      return response
        .cookie("authott", data[0], {
          httpOnly: true,
          secure: false,
        })
        .status(status)
        .json({
          error,
          message,
        });
    } catch (error) {
      response.status(500).json({
        error: true,
        message: "internal server error",
      });
    }
  }
);

export default authController;
