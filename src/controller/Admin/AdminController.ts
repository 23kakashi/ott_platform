import { Request, Response, Router } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR_MESSAGE } from "../../Error/customErrorMessage";
import ErrorHandler from "../../Error/ErrorHandler";
import { INTERNAL_SERVER_ERROR_STATUS_CODE, OK_STATUS_CODE } from "../../utils/httpStatusCode";
import { requireLogin } from "../../middleware/loginMiddleware";
import { checkAccessLevel } from "../../middleware/accessLevelMiddleware";
import MovieServiceObj from "../../service/MovieService";
import APILogger from "../../logger/logger";
import ValidationsObj from "../../utils/validations";
class AdminController {
  public adminRouter: Router;
  constructor() {
    this.adminRouter = Router();
    this.routes();
  }

  private async addMovie(request: Request, response: Response) {
    const logger = new APILogger();
    try {
      const movieData = request.body;
      const result = ValidationsObj.validateMovieData().validate(movieData);
      if (result.error) {
        throw new ErrorHandler(BAD_REQUEST);
      }
      await MovieServiceObj.addMovieToDb(movieData, logger);
      response.status(OK_STATUS_CODE).json({ message: "movie added" });
    } catch (error) {
      logger.error(String(error));
      if (error instanceof ErrorHandler) {
        return response.status(error.erroCode).json({ message: error.errorMessage });
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
