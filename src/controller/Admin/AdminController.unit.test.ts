import sinon from "sinon";
import { App } from "../../app";
import request from "supertest";
import MovieServiceObj from "../../service/MovieService";
import * as access from "../../middleware/accessLevelMiddleware";
import * as login from "../../middleware/loginMiddleware";
import jwt from "jsonwebtoken";
import APILogger from "../../logger/logger";
import ErrorHandler from "../../Error/ErrorHandler";
import { INVALID_PLAN_MESSAGE } from "../../Error/customErrorMessage";

describe("add movie POST (admin/addMovie", () => {
  const logger = new APILogger();
  const movieData = {
    title: "Bahubali3",
    release_date: "2017-12-12",
    rating: "7.2",
    language: "English",
    plan: "basic",
    url: "https://via.placeholder.com/150",
    actors: ["prabhas3", "tammanna3", "anushka3"],
    directors: ["rajamol3", "kattappa3"],
    geners: ["action3", "adventure3", "drama3"],
  };
  let jwtmock: sinon.SinonStub<
    [
      token: string,
      secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
      options?: jwt.VerifyOptions | undefined,
      callback?: jwt.VerifyCallback<string | jwt.Jwt | jwt.JwtPayload> | undefined
    ],
    void
  >;

  afterEach(() => {
    sinon.restore();
    jest.resetAllMocks();
    jwtmock.restore();
  });

  it("should return status 200 if otp is sent to user", async () => {
    //Arrange
    const app = new App();
    const addMovieToDbSpy = jest.spyOn(MovieServiceObj, "addMovieToDb").mockResolvedValue("movie added");
    jwtmock = sinon.stub(jwt, "verify");
    jwtmock.yields(null, { role: "admin", userid: "test@test.com" });

    //Act
    const response = await request(app.connection)
      .post("/admin/addMovie")
      .set("Cookie", "authott=lshglhkdfjk")
      .send(movieData);
    //Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "movie added" });
    expect(addMovieToDbSpy).toBeCalledTimes(1);
    expect(addMovieToDbSpy).toHaveBeenCalledWith(movieData, logger);
  });

  it("should throw error if cookie is not present", async () => {
    //Arrange
    const app = new App();
    //Act
    const response = await request(app.connection).post("/admin/addMovie").send(movieData);
    //Assert
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized access" });
  });

  it("should throw error if invalid cookie is not present", async () => {
    //Arrange
    const app = new App();
    sinon.stub(login, "requireLogin").returns();
    sinon.stub(access, "checkAccessLevel").resolves();
    sinon.stub(MovieServiceObj, "addMovieToDb").resolves();
    //Act
    const response = await request(app.connection).post("/admin/addMovie").send(movieData);
    //Assert
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized access" });
  });

  it("should throw error if  adding movie to db fails", async () => {
    //Arrange
    const app = new App();
    sinon.stub(MovieServiceObj, "addMovieToDb").rejects();
    jwtmock = sinon.stub(jwt, "verify");
    jwtmock.yields(null, { role: "admin", userid: "test@test.com" });

    //Act
    const response = await request(app.connection)
      .post("/admin/addMovie")
      .set("Cookie", "authott=lshglhkdfjk")
      .send(movieData);
    //Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal Server Error" });
  });

  it("should throw 401 user is not admin", async () => {
    //Arrange
    const app = new App();
    sinon.stub(MovieServiceObj, "addMovieToDb").rejects();
    jwtmock = sinon.stub(jwt, "verify");
    jwtmock.yields(null, { role: "user", userid: "test@test.com" });
    //Act
    const response = await request(app.connection)
      .post("/admin/addMovie")
      .set("Cookie", "authott=lshglhkdfjk")
      .send(movieData);

    //Assert
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized access" });
  });

  it("should throw error if error is on errorhandle instance", async () => {
    //Arrange
    const app = new App();
    sinon.stub(MovieServiceObj, "addMovieToDb").throws(new ErrorHandler(INVALID_PLAN_MESSAGE));
    jwtmock = sinon.stub(jwt, "verify");
    jwtmock.yields(null, { role: "user", userid: "test@test.com" });
    //Act
    const response = await request(app.connection)
      .post("/admin/addMovie")
      .set("Cookie", "authott=lshglhkdfjk")
      .send(movieData);

    //Assert
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized access" });
  });
});
