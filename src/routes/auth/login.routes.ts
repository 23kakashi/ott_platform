import { Router } from "express";
import app from "../../app";
import { userLogin } from "../../controller/user_login.controller";
import { validateEmail } from "../../utils/validation/validation";

const authRouter = Router();

//routes

// send otp
authRouter.get("/login", async (request, response) => {
  const { email } = request.body;
  const validaitonStatus: boolean = validateEmail(email);
  if (!validaitonStatus) {
    return response.status(401).json({
      error: true,
      message: "invalid email",
    });
  }
  // const {status, error, message} = await userLogin()
  //   responce.status()
  return response.status(200).json({
    error: false,
    message: "otp sent success",
  });
});

export default authRouter;
