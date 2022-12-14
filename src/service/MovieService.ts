import APILogger from "../logger/logger";
import MovieRepositoryObj from "../repository/MovieRepository";
import { MovieDataType } from "../types/movie.types";

class MovieService {
  async addMovieToDb(
    { title, rating, language, release_date, plan, url, actors, directors, geners }: MovieDataType,
    logger: APILogger
  ) {
    const movie_id: string = await MovieRepositoryObj.storeMovie({ title, rating, language, release_date, plan, url });
    logger.info("movie is stored in movies table");
    const moviecast = actors.map((actor: string) => {
      return { movie_id, actor: actor };
    });
    logger.info("movie cast stored");
    await MovieRepositoryObj.storeMovieCast(moviecast);

    const moviedirectors = directors.map((director: string) => {
      return { movie_id, director_name: director };
    });
    await MovieRepositoryObj.storeMovieDirectors(moviedirectors);
    logger.info("movie directors stored");
    const moviegeners = geners.map((genres: string) => {
      return { movie_id, genres };
    });

    await MovieRepositoryObj.storeMovieGeners(moviegeners);
    logger.info("movie geners stored");
    logger.info("movie stored");
    return Promise.resolve("movie added");
  }
}

const MovieServiceObj = new MovieService();
export default MovieServiceObj;
