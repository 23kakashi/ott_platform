import { INVALID_PLAN_MESSAGE, PLAN_ALREADY_ACTIVE, UPGREADE_TO_PREMIUM } from "../Error/customErrorMessage";
import ErrorHandler from "../Error/ErrorHandler";
import APILogger from "../logger/logger";
import MovieRepositoryObj from "../repository/MovieRepository";
import UserRepositoryObj from "../repository/UserRepository";
import { MovieDataType } from "../types/movie.types";
import { UserType } from "../types/user.types";

class UserService {
  public async validateUserByEmail(email: string): Promise<UserType | undefined> {
    const user = await UserRepositoryObj.getUserByEmail(email);
    if (user === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(user);
  }

  public async changeUserplan(email: string, plan: string, logger: APILogger) {
    if (plan !== "basic" && plan !== "premium") {
      throw new ErrorHandler(INVALID_PLAN_MESSAGE);
    }
    logger.info("plan is valid");
    const user = await UserRepositoryObj.getUserByEmail(email);
    if (user !== undefined && user.plan === plan) {
      throw new ErrorHandler(PLAN_ALREADY_ACTIVE);
    }

    await UserRepositoryObj.updatePlan(email, plan);
    logger.info("plan changed");
    return Promise.resolve("plan changed");
  }

  public async getMovie(searchQuery: string, logger: APILogger) {
    const movieids = await UserRepositoryObj.getMovieBySearch(searchQuery);
    logger.info("movie id obtained");
    const movies: any = [];

    for (const id of movieids) {
      const { movies_id } = id;
      const movie = await MovieRepositoryObj.getMovieByMovieId(movies_id);
      const cast = await MovieRepositoryObj.getMovieCast(movies_id);
      const directors = await MovieRepositoryObj.getMovieDirection(movies_id);
      const geners = await MovieRepositoryObj.getMovieGeners(movies_id);

      const movie_cast = cast.map(({ actor }) => actor);
      const movie_directors = directors.map(({ director_name }) => director_name);
      const movie_geners = geners.map(({ genres }) => genres);
      const moviedata: MovieDataType = {
        ...movie[0],
        cast: movie_cast,
        directors: movie_directors,
        geners: movie_geners,
      };

      movies.push(moviedata);
    }
    logger.info("movies sent");
    return movies;
  }

  public async watchMovie(movieId: string, email: string, logger: APILogger) {
    const user = await UserRepositoryObj.getUserByEmail(email);
    logger.info("user obtained");
    const movie = await MovieRepositoryObj.getMovieByMovieId(movieId);
    logger.info("movie obtained");
    if (movie.length < 1) {
      throw new ErrorHandler(INVALID_PLAN_MESSAGE);
    }
    if (user?.plan === "basic" && movie[0].plan === "basic") {
      logger.info("url sent for basic plan");
      return movie[0].url;
    }
    if (user?.plan === "basic" && movie[0].plan === "premium") {
      throw new ErrorHandler(UPGREADE_TO_PREMIUM);
    }
    logger.info("url sent to premium user");
    return movie[0].url;
  }
}

const UserServiceObj = new UserService();
export default UserServiceObj;
