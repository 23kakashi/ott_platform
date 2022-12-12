import MovieRepositoryObj from "../repository/MovieRepository";
import MovieRepository from "../repository/MovieRepository";
import { MovieCastType, MovieDataType } from "../types/movie.types";

class MovieService {
  constructor() {}
  async addMovieToDb({ title, rating, language, release_date, plan, url, actors, directors, geners }: MovieDataType) {
    const movie_id: string = await MovieRepositoryObj.storeMovie({ title, rating, language, release_date, plan, url });

    const moviecast = actors.map((actor: string) => {
      return { movie_id, actor: actor };
    });

    await MovieRepositoryObj.storeMovieCast(moviecast);

    const moviedirectors = directors.map((director: string) => {
      return { movie_id, director_name: director };
    });
    await MovieRepositoryObj.storeMovieDirectors(moviedirectors);
    const moviegeners = geners.map((genres: string) => {
      return { movie_id, genres };
    });

    await MovieRepositoryObj.storeMovieGeners(moviegeners);
  }
}

const MovieServiceObj = new MovieService();
export default MovieServiceObj;
