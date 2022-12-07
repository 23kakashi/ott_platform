import sinon from "sinon";
import ValidationsObj from "../utils/validations";
import UserLoginServiceObj from "./UserLoginService";

describe("send otp xto user via email", () => {
  it("should return invalid email if email is not of valid format", async () => {
    //Arrange
    const email = "testtest.com";
    const expectedResponse = { status: 401, message: "Invalid Email" };
    const spy = jest.spyOn(ValidationsObj, "validateEmail").mockReturnValue(false);
    //Act
    try {
      await UserLoginServiceObj.sendOtpUserViaEmail(email);
    } catch (error: any) {
      //Assert
      expect(error).toEqual(expectedResponse);
    }

    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(email);
  });
});
