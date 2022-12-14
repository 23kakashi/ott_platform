import APILogger from "../logger/logger";
import MovieRepositoryObj from "../repository/MovieRepository";
import MovieServiceObj from "./MovieService";

describe("add movie to db", () => {
  const moviData = {
    title: "Bahubali3",
    release_date: new Date("2017-12-12"),
    rating: 7.2,
    language: "English",
    plan: "basic",
    url: "https://via.placeholder.com/150",
    cast: ["prabhas3", "tammanna3", "anushka3"],
    directors: ["rajamol3", "kattappa3"],
    geners: ["action3", "adventure3", "drama3"],
  };
  it("should ", async () => {
    //Arrange
    const movieid = "movieid";
    const storeMovieSpy = jest.spyOn(MovieRepositoryObj, "storeMovie").mockResolvedValue(movieid);
    const storeMovieCastSpy = jest.spyOn(MovieRepositoryObj, "storeMovieCast").mockResolvedValue();
    const storeMovieDirectorsSpy = jest.spyOn(MovieRepositoryObj, "storeMovieDirectors").mockResolvedValue();
    const storeMovieGenersSpy = jest.spyOn(MovieRepositoryObj, "storeMovieGeners").mockResolvedValue();
    //Act
    const response = await MovieServiceObj.addMovieToDb(moviData, new APILogger());
    //Assert
    expect(response).toBe("movie added");
    expect(storeMovieSpy).toBeCalledTimes(1);
    expect(storeMovieSpy).toHaveBeenCalledWith({
      language: "English",
      plan: "basic",
      rating: 7.2,
      release_date: new Date("2017-12-12T00:00:00.000Z"),
      title: "Bahubali3",
      url: "https://via.placeholder.com/150",
    });
    expect(storeMovieCastSpy).toBeCalledTimes(1);
    expect(storeMovieCastSpy).toHaveBeenCalledWith([
      { actor: "prabhas3", movie_id: "movieid" },
      { actor: "tammanna3", movie_id: "movieid" },
      { actor: "anushka3", movie_id: "movieid" },
    ]);
    expect(storeMovieDirectorsSpy).toBeCalledTimes(1);
    expect(storeMovieDirectorsSpy).toHaveBeenCalledWith([
      { director_name: "rajamol3", movie_id: "movieid" },
      { director_name: "kattappa3", movie_id: "movieid" },
    ]);
    expect(storeMovieGenersSpy).toBeCalledTimes(1);
    expect(storeMovieGenersSpy).toHaveBeenCalledWith([
      { genres: "action3", movie_id: "movieid" },
      { genres: "adventure3", movie_id: "movieid" },
      { genres: "drama3", movie_id: "movieid" },
    ]);
  });
});
