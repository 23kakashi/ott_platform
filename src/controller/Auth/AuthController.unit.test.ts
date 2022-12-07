import sinon from "sinon";
import request from "supertest";
import UserLoginServiceObj from "../../service/UserLoginService";
import { App } from "../../app";

describe("auth controller /login/otp route", () => {
  afterEach(() => {
    sinon.restore();
    jest.resetAllMocks();
  });
  it("should return status 200 if otp is sent to user", async () => {
    //Arrange
    const app = new App();
    sinon.stub(UserLoginServiceObj, "sendOtpUserViaEmail").resolves("success");
    //Act
    const response = await request(app.connection)
      .post("/auth/login/otp")
      .send({ email: "test@test.com" });
    //Assert
    expect(response.status).toBe(200);
  });

  it("should return error if sendOtpUserViaEmail fails", async () => {
    //Arrange
    const email = "test@test.com";
    const expectedResponse = { message: "Internal server error" };
    const app = new App();
    const spy = jest
      .spyOn(UserLoginServiceObj, "sendOtpUserViaEmail")
      .mockRejectedValue({
        status: 500,
        message: "Internal server error",
      });
    //Act
    const response: request.Response = await request(app.connection)
      .post("/auth/login/otp")
      .send({ email: email });
    //Assert
    expect(response.status).toBe(500);
    expect(spy).toHaveBeenCalledWith(email);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(expectedResponse);
  });
});
