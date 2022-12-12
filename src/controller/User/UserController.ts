import { Request, Response, Router } from "express";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../../Error/customErrorMessage";
import ErrorHandler from "../../Error/ErrorHandler";
import { INTERNAL_SERVER_ERROR_STATUS_CODE, OK_STATUS_CODE } from "../../utils/httpStatusCode";
import requireLogin from "../../middleware/loginMiddleware";
import checkAccessLevel from "../../middleware/accessLevelMiddleware";
import MovieServiceObj from "../../service/MovieService";
class UserController {
  public userRouter: Router;
  constructor() {
    this.userRouter = Router();
    this.routes();
  }

  private async changePlan(request: Request, response: Response) {
    try {
      console.log(request.user);
      response.status(OK_STATUS_CODE).json("plan updated");
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  routes() {
    this.userRouter.patch("/changeplan", requireLogin, this.changePlan);
  }
}

const UserControllerObj = new UserController();
export default UserControllerObj;
