import sinon from "sinon";
import ErrorHandler from "../Error/ErrorHandler";
import APILogger from "../logger/logger";
import MovieRepositoryObj from "../repository/MovieRepository";
import UserRepositoryObj from "../repository/UserRepository";
import UserServiceObj from "./UserService";

describe("User service", () => {
  afterEach(() => {
    sinon.restore();
    jest.clearAllMocks();
  });
  describe("validate user by email", () => {
    it("should return a user if user is found in db", async () => {
      //Arrange
      const email = "test@test.com";
      const expectedResponse = {
        userid: "",
        email: "",
        role: "",
        plan: "",
        createdAt: new Date(),
      };
      const getUserByEmailStub = jest.spyOn(UserRepositoryObj, "getUserByEmail").mockResolvedValue(expectedResponse);
      //Act
      const response = await UserServiceObj.validateUserByEmail(email);
      //Assert
      expect(response).toBe(expectedResponse);
      expect(getUserByEmailStub).toBeCalledTimes(1);
      expect(getUserByEmailStub).toBeCalledWith(email);
    });

    it("should return a undefined if user is found in db", async () => {
      //Arrange
      const email = "test@test.com";
      const expectedResponse = undefined;
      const getUserByEmailStub = jest.spyOn(UserRepositoryObj, "getUserByEmail").mockResolvedValue(undefined);
      //Act
      const response = await UserServiceObj.validateUserByEmail(email);
      //Assert
      expect(response).toBe(expectedResponse);
      expect(getUserByEmailStub).toBeCalledTimes(1);
      expect(getUserByEmailStub).toBeCalledWith(email);
    });
  });

  describe("change user plan", () => {
    const email = "test@test.com";
    const plan = "basic";
    const user = {
      userid: "",
      plan: "",
      role: "",
      createdAt: new Date(),
      email: "test@test.com",
    };

    it("should throw error if plan is nether basic or premium", async () => {
      //Arrange
      //Act
      try {
        await UserServiceObj.changeUserplan(email, "acd", new APILogger());
      } catch (error) {
        if (error instanceof ErrorHandler) {
          //Assert
          expect(error.erroCode).toBe(404);
          expect(error.errorMessage).toBe("invalid plan");
        }
      }
    });

    it("should throw error if user existing plan and new plan are same", async () => {
      //Arrange
      const getUserByEmailSpy = jest
        .spyOn(UserRepositoryObj, "getUserByEmail")
        .mockResolvedValue({ ...user, plan: "basic" });
      sinon.stub(UserRepositoryObj, "updatePlan").resolves();
      //Act
      try {
        await UserServiceObj.changeUserplan(email, plan, new APILogger());
      } catch (error) {
        //Assert
        if (error instanceof ErrorHandler) {
          //Assert
          expect(error.erroCode).toBe(200);
          expect(error.errorMessage).toBe("plan already active");
        }
      }
      expect(getUserByEmailSpy).toBeCalledTimes(1);
      expect(getUserByEmailSpy).toBeCalledWith(email);
    });

    it("should update plan", async () => {
      //Arrange
      sinon.stub(UserRepositoryObj, "getUserByEmail").resolves({ ...user, plan: "premium" });
      sinon.stub(UserRepositoryObj, "updatePlan").resolves();
      //Act
      const response = await UserServiceObj.changeUserplan(email, plan, new APILogger());
      // Assert
      expect(response).toBe("plan changed");
    });
  });

  describe("getMovie", () => {
    it("should return movies", async () => {
      //Arrange
      const getMovieBySearchSpy = jest.spyOn(UserRepositoryObj, "getMovieBySearch").mockResolvedValue([
        {
          movies_id: "dkhfldjsfkjkhkjad",
        },
      ]);
      const getMovieByMovieIdSpy = jest.spyOn(MovieRepositoryObj, "getMovieByMovieId").mockResolvedValue([{}]);
      const getMovieCastIdSpy = jest.spyOn(MovieRepositoryObj, "getMovieCast").mockResolvedValue([{ actor: "actor1" }]);
      const getMovieDirectionSpy = jest
        .spyOn(MovieRepositoryObj, "getMovieDirection")
        .mockResolvedValue([{ director_name: "director1" }]);
      const getMovieGenersSpy = jest
        .spyOn(MovieRepositoryObj, "getMovieGeners")
        .mockResolvedValue([{ geners: "geners1" }]);
      //Act
      const response = await UserServiceObj.getMovie("bahu", new APILogger());
      //Assert
      expect(response[0]).toEqual({
        cast: ["actor1"],
        directors: ["director1"],
        geners: [undefined],
      });

      expect(getMovieBySearchSpy).toBeCalledTimes(1);
      expect(getMovieBySearchSpy).toHaveBeenCalledWith("bahu");
      expect(getMovieByMovieIdSpy).toBeCalledTimes(1);
      expect(getMovieByMovieIdSpy).toHaveBeenCalledWith("dkhfldjsfkjkhkjad");
      expect(getMovieCastIdSpy).toBeCalledTimes(1);
      expect(getMovieCastIdSpy).toHaveBeenCalledWith("dkhfldjsfkjkhkjad");
      expect(getMovieDirectionSpy).toBeCalledTimes(1);
      expect(getMovieDirectionSpy).toHaveBeenCalledWith("dkhfldjsfkjkhkjad");
      expect(getMovieGenersSpy).toBeCalledTimes(1);
      expect(getMovieGenersSpy).toHaveBeenCalledWith("dkhfldjsfkjkhkjad");
    });
  });

  describe("watch movie", () => {
    const user = {
      userid: "",
      email: "",
      role: "",
      plan: "basic",
      createdAt: new Date(),
    };
    const movie = {
      movies_id: "adb52532-6ba2-45af-b7df-0eb732e5930f",
      title: "Bahubali2",
      release_date: "2017-12-11T18:30:00.000Z",
      rating: 7.2,
      createdAt: "2022-12-12T16:21:21.806Z",
      plan: "premium",
      url: "https://via.placeholder.com/150",
      language: "Telugu",
      cast: ["prabhas2", "tammanna2", "anushka2"],
      directors: ["rajamoli2", "kattappa2"],
      geners: ["action2", "adventure2", "drama2"],
    };
    const movieId = "9830819092lksdflk";
    const email = "test@test.com";

    it("should throw error if no movie is available with movie id", async () => {
      //Arrange
      sinon.stub(UserRepositoryObj, "getUserByEmail").resolves(user);
      sinon.stub(MovieRepositoryObj, "getMovieByMovieId").resolves([]);
      //Act
      try {
        await UserServiceObj.watchMovie(movieId, email, new APILogger());
      } catch (error) {
        if (error instanceof ErrorHandler) {
          //Assert
          expect(error.erroCode).toBe(404);
          expect(error.errorMessage).toBe("invalid plan");
        }
      }
    });

    it("should send movie url if user with basic plan asks for movie in basic category", async () => {
      //Arrange
      sinon.stub(UserRepositoryObj, "getUserByEmail").resolves({ ...user, plan: "basic" });
      sinon.stub(MovieRepositoryObj, "getMovieByMovieId").resolves([{ ...movie, plan: "basic" }]);
      //Act
      const response = await UserServiceObj.watchMovie(movieId, email, new APILogger());
      expect(response).toBe("https://via.placeholder.com/150");
    });

    it("should send message to upgrade to premium if user with basic plan request for a movie in premium category", async () => {
      //Arrange
      sinon.stub(UserRepositoryObj, "getUserByEmail").resolves({ ...user, plan: "basic" });
      sinon.stub(MovieRepositoryObj, "getMovieByMovieId").resolves([{ ...movie, plan: "premium" }]);
      //Act
      try {
        await UserServiceObj.watchMovie(movieId, email, new APILogger());
      } catch (error) {
        if (error instanceof ErrorHandler) {
          expect(error.erroCode).toBe(401);
          expect(error.errorMessage).toBe("upgrade to premium");
        }
      }

      // expect(response).toBe("upgrade to premium");
    });

    it("should send message to upgrade to premium if user with basic plan request for a movie in premium category", async () => {
      //Arrange
      sinon.stub(UserRepositoryObj, "getUserByEmail").resolves({ ...user, plan: "premium" });
      sinon.stub(MovieRepositoryObj, "getMovieByMovieId").resolves([{ ...movie, plan: "premium" }]);
      //Act
      const response = await UserServiceObj.watchMovie(movieId, email, new APILogger());
      expect(response).toBe("https://via.placeholder.com/150");
    });
  });
});
