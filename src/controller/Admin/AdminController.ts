import { Request, Response, Router } from "express";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../../Error/customErrorMessage";
import ErrorHandler from "../../Error/ErrorHandler";
import { INTERNAL_SERVER_ERROR_STATUS_CODE, OK_STATUS_CODE } from "../../utils/httpStatusCode";
import requireLogin from "../../middleware/loginMiddleware";
import checkAccessLevel from "../../middleware/accessLevelMiddleware";
import MovieServiceObj from "../../service/MovieService";
class AdminController {
  public adminRouter: Router;
  constructor() {
    this.adminRouter = Router();
    this.routes();
  }

  private async addMovie(request: Request, response: Response) {
    try {
      const movieData = request.body;
      await MovieServiceObj.addMovieToDb(movieData);
      response.status(OK_STATUS_CODE).json("movie added");
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json(error);
      }
      return response.status(INTERNAL_SERVER_ERROR_STATUS_CODE).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  routes() {
    this.adminRouter.post("/addMovie", requireLogin, checkAccessLevel, this.addMovie);
  }
}

const AdminControllerObj = new AdminController();
export default AdminControllerObj;
