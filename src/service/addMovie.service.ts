import { responceType } from "../types/api_response.types";
import { movieType } from "../types/movies.types";

export const createNewMovie = async (
  movieData: movieType
): Promise<responceType> => {
  try {
    const { title, release_date, rating, language, actors, directos, geners } =
      movieData;
    return {
      status: 200,
      error: false,
      message: "success",
    };
  } catch (error) {
    return {
      status: 404,
      error: true,
      message: "error",
    };
  }
};
