import knex from "../config/db";
import { INVALID_USER_MESSAGE } from "../Error/customErrorMessage";
import ErrorHandlerObj from "../Error/ErrorHandler";
import { UserType } from "../types/user.types";

class UserRepository {
  constructor() {}

  public async getUserByEmail(email: string): Promise<UserType | undefined> {
    return await knex("users").select("*").where("email", email).first();
  }

  public async updatePlan(email: string, plan: string) {
    return await knex("users").update({ plan: plan }).where("email", email);
  }

  public async getMovieBySearch(search: string) {
    const movie = await knex
      .select(["movies.movies_id"])
      .from("movies")
      .join("movie_cast", "movies.movies_id", "movie_cast.movie_id")
      .join("movie_direction", "movies.movies_id", "movie_direction.movie_id")
      .join("movie_geners", "movies.movies_id", "movie_geners.movie_id")
      .whereILike("title", `%${search}%`)
      .orWhereILike("language", `%${search}%`)
      .orWhereILike("actor", `%${search}%`)
      .orWhereILike("director_name", `%${search}%`)
      .orWhereILike("genres", `%${search}%`)
      .distinct();
    return movie;
  }
}

const UserRepositoryObj = new UserRepository();
export default UserRepositoryObj;
