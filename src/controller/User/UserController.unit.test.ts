import request from "supertest";
import sinon from "sinon";
import { App } from "../../app";
import UserServiceObj from "../../service/UserService";
import ErrorHandler from "../../Error/ErrorHandler";
import { INVALID_PLAN_MESSAGE } from "../../Error/customErrorMessage";
import jwt from "jsonwebtoken";
import APILogger from "../../logger/logger";

describe("user controller", () => {
  const movie = {
    movies_id: "adb52532-6ba2-45af-b7df-0eb732e5930f",
    title: "Bahubali2",
    release_date: "2017-12-11T18:30:00.000Z",
    rating: 7.2,
    createdAt: "2022-12-12T16:21:21.806Z",
    plan: "premium",
    url: "https://via.placeholder.com/150",
    language: "Telugu",
    actors: ["prabhas2", "tammanna2", "anushka2"],
    directors: ["rajamoli2", "kattappa2"],
    geners: ["action2", "adventure2", "drama2"],
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
    // jwtmock.restore();
  });

  describe("change plan api /user/changeplan", () => {
    it("should return 200 status is plan is changed", async () => {
      //Arrange
      const app = new App();
      jwtmock = sinon.stub(jwt, "verify");

      const changeUserplanSpy = jest.spyOn(UserServiceObj, "changeUserplan").mockResolvedValue("plan changed");
      jwtmock.yields(null, { role: "user", userid: "test@test.com" });
      //Act
      const response = await request(app.connection)
        .patch("/user/changeplan")
        .set("Cookie", "authott=lshglhkdfjk")
        .send({ plan: "basic" });
      //Assert
      expect(changeUserplanSpy).toBeCalledTimes(1);
      expect(response.body).toBe("plan updated");
      expect(response.status).toBe(200);
    });

    it("should return error if user in not logged in", async () => {
      //Arrange
      const app = new App();
      sinon.stub(UserServiceObj, "changeUserplan").resolves("plan changed");
      //Act
      const response = await request(app.connection).patch("/user/changeplan").send({ plan: "basic" });
      //Assert
      expect(response.body).toEqual({ message: "Unauthorized access" });
      expect(response.status).toBe(401);
    });

    it("should throw 500 error some error occurs that is not handled", async () => {
      //Arrange
      const app = new App();
      jwtmock = sinon.stub(jwt, "verify");

      sinon.stub(UserServiceObj, "changeUserplan").rejects();
      jwtmock.yields(null, { role: "user", userid: "test@test.com" });

      //Act
      const response = await request(app.connection)
        .patch("/user/changeplan")
        .set("Cookie", "authott=lshglhkdfjk")
        .send({ plan: "basic" });
      //Assert

      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.status).toBe(500);
    });

    it("should throw error if an error is thrown", async () => {
      //Arrange
      const app = new App();
      sinon.stub(UserServiceObj, "changeUserplan").throws(new ErrorHandler(INVALID_PLAN_MESSAGE));
      jwtmock = sinon.stub(jwt, "verify");

      jwtmock.yields(null, { role: "user", userid: "test@test.com" });

      //Act

      const response = await request(app.connection)
        .patch("/user/changeplan")
        .set("Cookie", "authott=lshglhkdfjk")
        .send({ plan: "" });

      expect(response.body).toEqual({ erroCode: 404, errorMessage: "invalid plan" });
    });

    it("should throw error if token is wrong", async () => {
      //Arrange
      const app = new App();
      sinon.stub(UserServiceObj, "changeUserplan").throws(new ErrorHandler(INVALID_PLAN_MESSAGE));
      //Act
      const response = await request(app.connection)
        .patch("/user/changeplan")
        .set("Cookie", "authott=lshglhkdfjk")
        .send({ plan: "baisc" });

      expect(response.body).toEqual({ message: "Unauthorized access" });
    });
  });

  describe("getMovie api /user/", () => {
    it("should return 200 status is movie is sent", async () => {
      //Arrange
      const app = new App();
      const getMovieSpy = jest.spyOn(UserServiceObj, "getMovie").mockResolvedValue([movie]);
      //Act
      const response = await request(app.connection).get("/user").query({ search: "bahubali" });
      //Assert
      expect(getMovieSpy).toBeCalledTimes(1);
      expect(getMovieSpy).toHaveBeenCalledWith("bahubali", new APILogger());
      expect(response.body).toEqual({
        message: "success",
        movie: [
          {
            actors: ["prabhas2", "tammanna2", "anushka2"],
            createdAt: "2022-12-12T16:21:21.806Z",
            directors: ["rajamoli2", "kattappa2"],
            geners: ["action2", "adventure2", "drama2"],
            language: "Telugu",
            movies_id: "adb52532-6ba2-45af-b7df-0eb732e5930f",
            plan: "premium",
            rating: 7.2,
            release_date: "2017-12-11T18:30:00.000Z",
            title: "Bahubali2",
            url: "https://via.placeholder.com/150",
          },
        ],
      });
      expect(response.status).toBe(200);
    });

    it("should return 200 status is movie is sent", async () => {
      //Arrange
      const app = new App();
      sinon.stub(UserServiceObj, "getMovie").rejects();
      //Act
      const response = await request(app.connection).get("/user").query({ search: "bahubali" });
      //Assert
      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.status).toBe(500);
    });

    it("should return 200 status is movie is sent", async () => {
      //Arrange
      const app = new App();
      sinon.stub(UserServiceObj, "getMovie").throws(new ErrorHandler(INVALID_PLAN_MESSAGE));
      //Act
      const response = await request(app.connection).get("/user").query({ search: "bahubali" });
      //Assert
      expect(response.body).toEqual({ erroCode: 404, errorMessage: "invalid plan" });
      expect(response.status).toBe(404);
    });
  });

  describe("watch movie api /user/watch/movieId", () => {
    it("should throw error is user is not logged in", async () => {
      //Arrange
      const app = new App();
      const movieId = "movieId";
      //Act
      const response = await request(app.connection).get(`/user/watch/${movieId}`);
      //Assert
      expect(response.body).toEqual({ message: "Unauthorized access" });
      expect(response.status).toBe(401);
    });
    it("should return movie url if search matches in db", async () => {
      //Arrange
      const app = new App();
      const movieId = "movieId";
      const watchMovieSpy = jest.spyOn(UserServiceObj, "watchMovie").mockResolvedValue("movieurl");
      jwtmock = sinon.stub(jwt, "verify");
      jwtmock.yields(null, { role: "user", userid: "test@test.com" });

      //Act
      const response = await request(app.connection).get(`/user/watch/${movieId}`).set("Cookie", "authott=23456787");
      //Assert
      expect(watchMovieSpy).toBeCalledTimes(1);
      expect(watchMovieSpy).toHaveBeenCalledWith(movieId, "test@test.com", new APILogger());
      expect(response.body).toEqual({ message: "success", movie_url: "movieurl" });
      expect(response.status).toBe(200);
    });
    it("should return movie url if search matches in db", async () => {
      //Arrange
      const app = new App();
      const movieId = "movieId";
      sinon.stub(UserServiceObj, "watchMovie").rejects();
      jwtmock = sinon.stub(jwt, "verify");

      jwtmock.yields(null, { role: "user", userid: "test@test.com" });

      //Act
      const response = await request(app.connection).get(`/user/watch/${movieId}`).set("Cookie", "authott=23456787");
      //Assertcom");
      expect(response.body).toEqual({ message: "Internal Server Error" });
      expect(response.status).toBe(500);
    });
    it("should return movie url if search matches in db", async () => {
      //Arrange
      const app = new App();
      const movieId = "movieId";
      sinon.stub(UserServiceObj, "watchMovie").throws(new ErrorHandler(INVALID_PLAN_MESSAGE));
      jwtmock = sinon.stub(jwt, "verify");
      jwtmock.yields(null, { role: "user", userid: "test@test.com" });
      //Act
      const response = await request(app.connection).get(`/user/watch/${movieId}`).set("Cookie", "authott=23456787");
      //Assertcom");
      expect(response.body).toEqual({ erroCode: 404, errorMessage: "invalid plan" });
    });
  });
});
