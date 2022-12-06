import request from "supertest";
import sinon from "sinon";
import app from "../../app";
import * as query from "../../database/user.query";
import * as login from "../../service/userLogin.service";
import * as otp from "../../utils/otp/otp";
import * as encryption from "../../utils/encryption/encyption";
import * as token from "../../utils/jwt/jwttoken";
import * as email from "../../utils/email/nodemailer";

describe("send otp api /auth/login/otp", () => {
  afterEach(() => {
    sinon.restore();
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
      .get("/auth/login/otp")
      .send({
        email: "abcxyz.com",
      });
    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });

  it("should throw invalid user if user is not found", async () => {
    //Arrange
    const expecteStatus = 401;
    const expecteResponse = {
      error: true,
      message: "invalid user",
    };
    sinon.stub(query, "getUserByEmail").resolves(undefined);
    //Act
    const response: request.Response = await request(app)
      .get("/auth/login/otp")
      .send({
        email: "abc@xyz.com",
      });
    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });

  it("should throw otp request failed if getUserByEmail fails", async () => {
    //Arrange
    const expecteStatus = 404;
    const expecteResponse = {
      error: true,
      message: "otp request failed",
    };
    sinon.stub(query, "getUserByEmail").rejects();
    // //Act
    const response: request.Response = await request(app)
      .get("/auth/login/otp")
      .send({
        email: "abc@xyz.com",
      });
    // //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });

  it("should return 200 if otp is sent to the user", async () => {
    //Arrange
    const expecteStatus = 200;
    const expecteResponse = {
      error: false,
      message: "otp request success",
    };
    sinon.stub(query, "getUserByEmail").resolves({
      userid: "1217389490308129",
      email: "test@test.com",
      plan: "premium",
      createdAt: new Date("2022-12-04T12:52:06.064Z"),
      role: "user",
    });
    sinon.stub(encryption, "encryptPassword").resolves("1234");
    sinon.stub(otp, "setOtp").resolves({ error: false });
    sinon.stub(email, "sendEmail").resolves({
      status: 200,
      error: false,
      message: "email sent",
    });
    //Act
    const response: request.Response = await request(app)
      .get("/auth/login/otp")
      .send({
        email: "abc@xyz.com",
      });

    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return 500 if api fails to send response", async () => {
    //Arrange
    const expecteStatus = 500;
    const expecteResponse = {
      error: true,
      message: "internal server error",
    };
    sinon.stub(login, "sendOtpToUser").rejects();
    //Act
    const response: request.Response = await request(app)
      .get("/auth/login/otp")
      .send({
        email: "abc@xyz.com",
      });

    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });
});

describe("login api /auth/login/verify", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should return 200 status is user is logged in successfully", async () => {
    //Arrange
    const expectedStatus = 200;
    const expecteResponse = {
      error: false,
      message: "login success",
    };
    sinon.stub(login, "loginUser").resolves({
      status: 200,
      error: false,
      message: "login success",
      data: [],
    });
    sinon.stub(token, "signJwtToken").resolves();
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return invalid email or otp if email or otp is invalid", async () => {
    //Arrange
    const expectedStatus = 401;
    const expecteResponse = {
      error: true,
      message: "invalid email or otp",
    };
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "12212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return otp match success if hash is matched", async () => {
    //Arrange
    // const expectedStatus = 200;
    const expecteResponse = {
      status: 200,
      error: false,
      message: "otp match success",
    };
    sinon.stub(otp, "getOtp").resolves({
      error: false,
      otp: "1221",
    });
    sinon.stub(encryption, "checkPassword").resolves(true);
    //Act
    const response = await login.checkOtp("test@test.com", "1221");
    //Assert
    expect(response).toEqual(expecteResponse);
  });
  it("should return login success if hash is matched", async () => {
    //Arrange
    const expectedStatus = 200;
    const expecteResponse = {
      error: false,
      message: "login success",
    };
    sinon.stub(login, "checkOtp").resolves({
      status: 200,
      error: false,
      message: "otp match success",
    });
    sinon.stub(otp, "getOtp").resolves({ error: false, otp: "1232" });
    sinon.stub(query, "getUserByEmail").resolves({
      userid: "1217389490308129",
      email: "test@test.com",
      plan: "premium",
      createdAt: new Date("2022-12-04T12:52:06.064Z"),
      role: "user",
    });
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return otp expired if hash is not found against the email", async () => {
    //Arrange
    const expectedStatus = 404;
    const expecteResponse = {
      error: true,
      message: "otp expired",
    };
    sinon.stub(otp, "getOtp").resolves({ error: true, otp: "" });
    // sinon.stub(encryption, "encryptPassword").resolves("8fhsiudyfo89rye");
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return otp match failed if hash does not match", async () => {
    //Arrange
    const expectedStatus = 404;
    const expecteResponse = {
      error: true,
      message: "otp match failed",
    };
    sinon.stub(otp, "getOtp").resolves({ error: false, otp: "1233" });
    sinon.stub(encryption, "checkPassword").resolves(false);
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return login failed if getOtp throws error", async () => {
    //Arrange
    const expectedStatus = 404;
    const expecteResponse = {
      error: true,
      message: "login failed",
    };
    sinon.stub(otp, "getOtp").rejects({ error: true, otp: "" });
    sinon.stub(encryption, "encryptPassword").resolves("8fhsiudyfo89rye");
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return login failed if encryptPassword throws error", async () => {
    //Arrange
    const expectedStatus = 404;
    const expecteResponse = {
      error: true,
      message: "login failed",
    };
    sinon.stub(otp, "getOtp").resolves({ error: false, otp: "1233" });
    sinon.stub(encryption, "encryptPassword").rejects("");
    //Act
    const response = await request(app)
      .get("/auth/login/verify")
      .send({ email: "test@test.com", otp: "1212" });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expecteResponse);
  });
  it("should return 500 if api fails to send response", async () => {
    //Arrange
    const expecteStatus = 500;
    const expecteResponse = {
      error: true,
      message: "internal server error",
    };
    sinon.stub(login, "loginUser").rejects();
    //Act
    const response: request.Response = await request(app)
      .get("/auth/login/verify")
      .send({
        email: "abc@xyz.com",
        otp: "1212",
      });

    //Assert
    expect(response.status).toBe(expecteStatus);
    expect(response.body).toEqual(expecteResponse);
  });
});
