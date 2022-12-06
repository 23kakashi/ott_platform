import { responceType } from "../types/api_response.types";
import { movieType } from "../types/movies.types";
import { validateDate } from "../utils/validation/validation";

export const createNewMovie = async (
  movieData: movieType
): Promise<responceType> => {
  const {
    title,
    release_date,
    rating,
    language,
    url,
    actors,
    directos,
    geners,
  } = movieData;
  const validateDateResponse = validateDate(release_date);
  if (!validateDateResponse) {
    return {
      status: 400,
      error: true,
      message: "invalid release date",
    };
  }
  return {
    status: 200,
    error: false,
    message: "success",
  };
};
