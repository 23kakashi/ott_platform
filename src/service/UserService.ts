import { INVALID_PLAN_MESSAGE, PLAN_ALREADY_ACTIVE } from "../Error/customErrorMessage";
import ErrorHandler from "../Error/ErrorHandler";
import MovieRepositoryObj from "../repository/MovieRepository";
import UserRepositoryObj from "../repository/UserRepository";
import { MovieDataType } from "../types/movie.types";
import { UserType } from "../types/user.types";

class UserService {
  constructor() {}

  public async validateUserByEmail(email: string): Promise<UserType | undefined> {
    const user = await UserRepositoryObj.getUserByEmail(email);
    if (user === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(user);
  }

  public async changeUserplan(email: string, plan: string) {
    if (plan !== "basic" && plan !== "premium") {
      throw new ErrorHandler(INVALID_PLAN_MESSAGE);
    }
    const user = await UserRepositoryObj.getUserByEmail(email);
    if (user !== undefined && user.plan === plan) {
      throw new ErrorHandler(PLAN_ALREADY_ACTIVE);
    }

    await UserRepositoryObj.updatePlan(email, plan);
  }

  public async getMovie(searchQuery: string) {
    const movieids = await UserRepositoryObj.getMovieBySearch(searchQuery);

    let movies: any = [];

    for (let id of movieids) {
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

      await movies.push(moviedata);
    }
    return movies;
  }
}

const UserServiceObj = new UserService();
export default UserServiceObj;
