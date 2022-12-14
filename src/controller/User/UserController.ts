import { Request, Response, Router } from "express";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../../Error/customErrorMessage";
import ErrorHandler from "../../Error/ErrorHandler";
import { INTERNAL_SERVER_ERROR_STATUS_CODE, OK_STATUS_CODE } from "../../utils/httpStatusCode";
import { requireLogin } from "../../middleware/loginMiddleware";
import UserServiceObj from "../../service/UserService";
import APILogger from "../../logger/logger";
class UserController {
  public userRouter: Router;
  constructor() {
    this.userRouter = Router();
    this.routes();
  }

  private async changePlan(request: Request, response: Response) {
    const logger = new APILogger();
    try {
      if (request.user?.userid !== undefined)
        await UserServiceObj.changeUserplan(request.user.userid, request.body.plan, logger);
      response.status(OK_STATUS_CODE).json("plan updated");
    } catch (error) {
      logger.error(String(error));
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  private async getMovie(request: Request, response: Response) {
    const logger = new APILogger();
    try {
      const { search } = request.query;
      const movie = await UserServiceObj.getMovie(String(search), logger);
      response.status(OK_STATUS_CODE).json({
        message: "success",
        movie,
      });
    } catch (error) {
      logger.error(String(error));
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  private async watchMovie(request: Request, response: Response) {
    const logger = new APILogger();
    try {
      const user = request.user;
      const { movieid } = request.params;
      const data = await UserServiceObj.watchMovie(movieid, user?.userid || "", logger);
      response.status(OK_STATUS_CODE).json({
        message: "success",
        movie_url: data,
      });
    } catch (error) {
      logger.error(String(error));
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  routes() {
    this.userRouter.get("/watch/:movieid", requireLogin, this.watchMovie);
    this.userRouter.patch("/changeplan", requireLogin, this.changePlan);
    this.userRouter.get("/", this.getMovie);
  }
}

const UserControllerObj = new UserController();
export default UserControllerObj;
