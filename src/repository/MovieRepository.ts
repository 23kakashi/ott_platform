import knex from "../config/db";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../Error/customErrorMessage";
import ErrorHandler from "../Error/ErrorHandler";
import { MovieCastType, MovieDirectorType, MovieGenerType, MovieType } from "../types/movie.types";
class MovieRepository {
  constructor() {}

  async storeMovie(movie: MovieType): Promise<string> {
    const movieId = await knex("movies").insert(movie).returning("movies_id");
    return movieId[0].movies_id;
  }

  async storeMovieCast(moviecast: MovieCastType[]) {
    await knex("movie_cast").insert(moviecast);
  }

  async storeMovieDirectors(moviedirectors: MovieDirectorType[]) {
    return await knex("movie_direction").insert(moviedirectors);
  }

  async storeMovieGeners(moviegeners: MovieGenerType[]) {
    return await knex("movie_geners").insert(moviegeners);
  }
}

const MovieRepositoryObj = new MovieRepository();
export default MovieRepositoryObj;
