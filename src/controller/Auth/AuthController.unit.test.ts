import sinon from "sinon";
import request from "supertest";
import UserLoginServiceObj from "../../service/UserLoginService";
import { App } from "../../app";
import GenerateOtpObj from "../../utils/GenerateOtp";
import UserRepositoryObj from "../../repository/UserRepository";
import { UserType } from "../../types/user.types";
import JwtTokenObj from "../../utils/jwt/jwttoken";
import { Cookie } from "express-session";

describe("otp controller /login/otp route", () => {
  afterEach(() => {
    sinon.restore();
    jest.resetAllMocks();
  });
  it("should return status 200 if otp is sent to user", async () => {
    //Arrange
    const app = new App();
    sinon.stub(UserLoginServiceObj, "sendOtpToValidUserViaEmail").resolves("success");
    //Act
    const response = await request(app.connection).post("/auth/login/otp").send({ email: "test@test.com" });

    //Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "otp sent" });
  });

  it("should throw error if email otp is not sent to the user", async () => {
    //Arrange
    const email = "test@test.com";
    const expectedResponse = { message: "Internal Server Error" };
    const app = new App();
    const verifyLoginOtpSpy = jest.spyOn(UserLoginServiceObj, "sendOtpToValidUserViaEmail").mockRejectedValue({
      status: 500,
      message: "Internal Server Error",
    });
    //Act
    const response: request.Response = await request(app.connection).post("/auth/login/otp").send({ email: email });
    //Assert
    expect(response.status).toBe(500);
    expect(verifyLoginOtpSpy).toHaveBeenCalledWith(email);
    expect(verifyLoginOtpSpy).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(expectedResponse);
  });
});

describe("otp verification controller /login/verify", () => {
  const user: UserType = {
    userid: "",
    email: "",
    role: "",
    plan: "",
    createdAt: new Date(),
  };
  afterEach(() => {
    sinon.restore();
    jest.resetAllMocks();
  });

  it("should return status 200 if user is logged in", async () => {
    //Arrange
    const app = new App();
    sinon.stub(UserLoginServiceObj, "verifyLoginOtp").resolves("login success");
    sinon.stub(UserRepositoryObj, "getUserByEmail").resolves();
    //Act
    const response = await request(app.connection)
      .post("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });

    //Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "user logged in" });
    expect(response.header["set-cookie"][0].split("=")[0]).toBe("authott");
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  it("should throw error if user login failes", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "2323";
    const expectedResponse = { message: "Internal Server Error" };
    const app = new App();
    const verifyLoginOtpSpy = jest.spyOn(UserLoginServiceObj, "verifyLoginOtp").mockRejectedValue({
      status: 500,
      message: "Internal Server Error",
    });
    //Act
    const response: request.Response = await request(app.connection)
      .post("/auth/login/verify")
      .send({ email: email, otp: otp });
    //Assert
    expect(response.status).toBe(500);
    expect(verifyLoginOtpSpy).toHaveBeenCalledWith(email, otp);
    expect(verifyLoginOtpSpy).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should get user form db if otp is verified", async () => {
    //Arrange

    const email = "test@test.com";
    const otp = "2323";
    const app = new App();
    sinon.stub(UserLoginServiceObj, "verifyLoginOtp").resolves("success");
    const getUserByEmailSpy = jest.spyOn(UserRepositoryObj, "getUserByEmail").mockResolvedValue(user);
    //Act
    const response: request.Response = await request(app.connection)
      .post("/auth/login/verify")
      .send({ email: email, otp: otp });
    //Assert
    expect(getUserByEmailSpy).toBeCalledTimes(1);
    expect(getUserByEmailSpy).toBeCalledWith(email);
  });

  it("should generate jwttoken with user details", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "2323";
    const app = new App();
    sinon.stub(UserLoginServiceObj, "verifyLoginOtp").resolves("success");
    sinon.stub(UserRepositoryObj, "getUserByEmail").resolves(user);
    const signJwttokenSpy = jest.spyOn(JwtTokenObj, "signJwtToken").mockReturnValue("abcd");
    //Act
    const response: request.Response = await request(app.connection)
      .post("/auth/login/verify")
      .send({ email: email, otp: otp });
    //Assert
    expect(signJwttokenSpy).toBeCalledTimes(1);
    expect(signJwttokenSpy).toBeCalledWith(user.role, user.email);
  });
});
