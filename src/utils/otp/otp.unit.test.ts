import * as otp from "./otp";
import sinon from "sinon";

describe("get and set otp function", () => {
  beforeEach(() => {});
  afterEach(() => {
    sinon.restore();
  });

  it("setOtp should return error true if error occurs", async () => {
    //Arrange
    const expectedResponse = { error: true };
    sinon.stub(otp, "setToRedis").rejects(false);
    //Act
    const response = await otp.setOtp("test@test.com", "1211");
    //Assert
    expect(response).toEqual(expectedResponse);
  });

  it("setOtp should return error false otp is set to redis", async () => {
    //Arrange
    const expectedResponse = { error: false };
    sinon.stub(otp, "setToRedis").resolves(true);
    //Act
    const response = await otp.setOtp("test@test.com", "1211");
    //Assert
    expect(response).toEqual(expectedResponse);
  });

  it("getOtp should return error false if otp is received form redis", async () => {
    //Arrange
    const expectedResponse = { error: false, otp: "2321" };
    sinon.stub(otp, "getFromRedis").resolves("2321");
    //Act
    const response = await otp.getOtp("test@test.com");
    //Assert
    expect(response).toEqual(expectedResponse);
  });

  it("getOtp should return error true if error occurs", async () => {
    //Arrange
    const expectedResponse = { error: true, otp: "" };
    sinon.stub(otp, "getFromRedis").rejects("");
    //Act
    const response = await otp.getOtp("test@test.com");
    //Assert
    expect(response).toEqual(expectedResponse);
  });
});
