import knex from "../config/db";
import { MovieCastType, MovieDirectorType, MovieGenerType, MovieType } from "../types/movie.types";
class MovieRepository {
  async storeMovie(movie: MovieType): Promise<string> {
    const movieId = await knex("movies").insert(movie).returning("movies_id");
    return movieId[0].movies_id;
  }

  async storeMovieCast(moviecast: MovieCastType[]) {
    knex("movie_cast").insert(moviecast);
  }

  async storeMovieDirectors(moviedirectors: MovieDirectorType[]) {
    await knex("movie_direction").insert(moviedirectors);
  }

  async storeMovieGeners(moviegeners: MovieGenerType[]) {
    await knex("movie_geners").insert(moviegeners);
  }

  async getMovieByMovieId(id: string) {
    return await knex("movies").where("movies_id", id);
  }

  async getMovieCast(id: string) {
    return await knex("movie_cast").select("actor").where("movie_id", id);
  }
  async getMovieDirection(id: string) {
    return await knex("movie_direction").select("director_name").where("movie_id", id);
  }
  async getMovieGeners(id: string) {
    return await knex("movie_geners").select("genres").where("movie_id", id);
  }
}

const MovieRepositoryObj = new MovieRepository();
export default MovieRepositoryObj;
