import request from "supertest";
import sinon from "sinon";
import app from "../../app";
import e from "express";

describe("login api /auth/login", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 if otp is sent to the user", async () => {
    //Arrange
    const expecteStatus = 200;
    const expecteResponse = {
      error: false,
      message: "otp sent success",
    };
    //Act
    const response: request.Response = await request(app)
      .get("/auth/login")
      .send({
        email: "abc@xyz.com",
      });
    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });

  it("should throw staus code 401 is email is invalid", async () => {
    //Arrange
    const expecteStatus = 401;
    const expecteResponse = {
      error: true,
      message: "invalid email",
    };
    //Act
    const response: request.Response = await request(app)
      .get("/auth/login")
      .send({
        email: "abcxyz.com",
      });
    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });
});
