import { Request, Response, Router } from "express";
import { createNewMovie } from "../../service/addMovie.service";
import { movieType } from "../../types/movies.types";

const adminController = Router();

//routes

adminController.post(
  "/create",
  async (request: Request, response: Response) => {
    const movieData: movieType = request.body;

    const { status, error, message } = await createNewMovie({ ...movieData });
    return response.status(status).json({
      error,
      message,
    });
  }
);

export default adminController;
