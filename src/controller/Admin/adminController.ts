import { Request, Response, Router } from "express";
import { checkAccessLevel } from "../../middleware/checkAcessLevel.middleware";
import { createNewMovie } from "../../service/addMovie.service";
import { movieType } from "../../types/movies.types";

const adminController = Router();

//routes

adminController.post(
  "/create",
  checkAccessLevel,
  async (request: Request, response: Response) => {
    try {
      const movieData: movieType = request.body;

      const { status, error, message } = await createNewMovie({ ...movieData });
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

export default adminController;
