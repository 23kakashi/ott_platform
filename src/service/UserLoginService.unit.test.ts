import sinon from "sinon";
import { UserType } from "../types/user.types";
import GenerateOtpObj from "../utils/GenerateOtp";
import UserLoginServiceObj from "./UserLoginService";
import UserServiceObj from "./UserService";
import ErrorHandler from "../Error/ErrorHandler";
import EmailServiceObj from "../utils/EmailService";

describe("send otp to user via email", () => {
  const user: UserType = {
    userid: "",
    email: "",
    role: "",
    plan: "",
    createdAt: new Date(),
  };
  beforeEach(() => {
    sinon.stub(EmailServiceObj, "sendEmail").resolves();
  });
  afterEach(() => {
    sinon.restore();
    jest.clearAllMocks();
  });
  it("should return invalid email if email is not of valid", async () => {
    //Arrange
    const email = "testtest.com";

    try {
      await UserLoginServiceObj.sendOtpToValidUserViaEmail(email);
    } catch (error) {
      //Assert
      if (error instanceof ErrorHandler) {
        expect(error.erroCode).toBe(401);
        expect(error.errorMessage).toBe("Invalid Email");
      }
    }
  });

  it("should return invalid user if no user matches the email", async () => {
    //Arrange
    const email = "test@test.com";

    const validateEmailSpy = jest.spyOn(UserServiceObj, "validateUserByEmail").mockResolvedValue(undefined);
    // Act
    try {
      await UserLoginServiceObj.sendOtpToValidUserViaEmail(email);
    } catch (error: any) {
      //Assert
      expect(error.erroCode).toBe(401);
      expect(error.errorMessage).toBe("Invalid User");
    }
    expect(validateEmailSpy).toBeCalledTimes(1);
    expect(validateEmailSpy).toHaveBeenCalledWith(email);
  });

  it("should generate otp is user is valid", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "3445";
    sinon.stub(UserServiceObj, "validateUserByEmail").resolves(user);
    const generateOtpSpy = jest.spyOn(GenerateOtpObj, "generateOtp").mockResolvedValue(otp);

    //Act
    const response = await UserLoginServiceObj.sendOtpToValidUserViaEmail(email);
    //Assert

    // expect(response).toBe("success");
    expect(generateOtpSpy).toBeCalledTimes(1);
    expect(generateOtpSpy).toHaveBeenCalledWith(email);
  });

  it("should send otp to user if otp is generated", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "3445";
    sinon.stub(UserServiceObj, "validateUserByEmail").resolves(user);
    sinon.stub(GenerateOtpObj, "generateOtp").resolves(otp);
    const sendEmailSpy = jest.spyOn(EmailServiceObj, "sendEmail").mockResolvedValue();
    //Act
    const response = await UserLoginServiceObj.sendOtpToValidUserViaEmail(email);
    //Assert

    expect(response).toBe("success");
    expect(sendEmailSpy).toBeCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(email, otp);
  });
});

describe("verify login otp", () => {
  afterEach(() => {
    sinon.restore();
    jest.clearAllMocks();
  });

  it("should return invalid email if email is not of valid", async () => {
    //Arrange
    const email = "testtest.com";
    const otp = "1212";
    let response;
    //act
    try {
      response = await UserLoginServiceObj.verifyLoginOtp(email, otp);
    } catch (error) {
      //Assert
      if (error instanceof ErrorHandler) {
        expect(error.erroCode).toBe(401);
        expect(error.errorMessage).toBe("Invalid Email");
      }
    }
    expect(response).not.toBe("login success");
  });

  it("should call getOtpFromDb if email is valid", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "1212";
    const getOtpFromDbSpy = jest.spyOn(GenerateOtpObj, "getOtpFromDb").mockResolvedValue("1212");
    //act
    await UserLoginServiceObj.verifyLoginOtp(email, otp);

    //Assert
    expect(getOtpFromDbSpy).toBeCalledTimes(1);
    expect(getOtpFromDbSpy).toHaveBeenCalledWith(email);
  });

  it("should should throw error if otp is expired", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "1212";
    sinon.stub(GenerateOtpObj, "getOtpFromDb").resolves(null);
    //act
    try {
      await UserLoginServiceObj.verifyLoginOtp(email, otp);
    } catch (error) {
      //Assert
      if (error instanceof ErrorHandler) {
        expect(error.erroCode).toBe(404);
        expect(error.errorMessage).toBe("otp expired");
      }
    }
  });

  it("should should throw error if otp does not match", async () => {
    //Arrange
    const email = "test@test.com";
    const otp = "1212";
    sinon.stub(GenerateOtpObj, "getOtpFromDb").resolves("2232");
    //act
    try {
      await UserLoginServiceObj.verifyLoginOtp(email, otp);
    } catch (error) {
      //Assert
      if (error instanceof ErrorHandler) {
        expect(error.erroCode).toBe(404);
        expect(error.errorMessage).toBe("invalid otp");
      }
    }
  });
});
