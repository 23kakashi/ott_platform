import sinon from "sinon";
import * as nodemailer from "./nodemailer";

describe.only("mailer", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return email sent is mail is sent", async () => {
    //Arrange
    const expectedResponse = {
      status: 200,
      error: false,
      message: "email sent",
    };
    const email = "test@test.com";
    const otp = "1234";
    sinon.stub(nodemailer, "nodemailerConnection").resolves();
    //Act
    const response = await nodemailer.sendEmail(email, otp);
    //Assert
    expect(response).toEqual(expectedResponse);
  });

  it("should return email request failed is mail is not sent", async () => {
    //Arrange
    const expectedResponse = {
      status: 404,
      error: true,
      message: "email request failed",
    };
    const email = "test@test.com";
    const otp = "1234";
    sinon.stub(nodemailer, "nodemailerConnection").rejects();
    //Act
    const response = await nodemailer.sendEmail(email, otp);
    //Assert
    expect(response).toEqual(expectedResponse);
  });
});
