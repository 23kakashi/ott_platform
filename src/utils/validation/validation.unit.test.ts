import { validateEmail, validateOtp, validateDate } from "./validation";

describe("email validaiton", () => {
  it("should be a valid email", () => {
    //Arrange
    const email = "tapish@gmail.com";
    const expectedResponse = true;
    //Act
    const result = validateEmail(email);
    //Assert
    expect(result).toBe(expectedResponse);
  });

  it("should have @ in the email", () => {
    //Arrange
    const email = "abcxyz.com";
    const expectedResponse = false;
    //Act
    const result = validateEmail(email);
    //Assert
    expect(result).toBe(expectedResponse);
  });

  it("should have . in the email", () => {
    //Arrange
    const email = "abc@xyzcom";
    const expectedResponse = false;
    //Act
    const result = validateEmail(email);
    //Assert
    expect(result).toBe(expectedResponse);
  });

  it("should have only two-three character after . ", () => {
    //Arrange
    const emailWithMoreCharacters = "abc@xyz.comorg";
    const emailWithLessCharacters = "abc@xyz.c";
    const emailWithnumber = "abc@xyz.123";
    const expectedResponse = false;
    //Act
    const resultForEmailWithMoreCharacters = validateEmail(
      emailWithMoreCharacters
    );
    const resultForEmailWithLessCharacters = validateEmail(
      emailWithLessCharacters
    );

    const resultForEmailWithNumber = validateEmail(emailWithnumber);
    //Assert
    expect(resultForEmailWithMoreCharacters).toBe(expectedResponse);
    expect(resultForEmailWithLessCharacters).toBe(expectedResponse);
    expect(resultForEmailWithNumber).toBe(expectedResponse);
  });
});

describe("validate otp", () => {
  it("should return true if otp is exactly of length 4", () => {
    //Arrange
    const otp = "1232";
    const expecteResponse = true;
    //Act
    const response = validateOtp(otp);
    //Assert
    expect(response).toBe(expecteResponse);
  });

  it("should return false if otp is of not exactly of length 4", () => {
    //Arrange
    const otp1 = "123233";
    const otp2 = "123233";
    const expecteResponse = false;
    //Act
    const response1 = validateOtp(otp1);
    const response2 = validateOtp(otp2);
    //Assert
    expect(response1).toBe(expecteResponse);
    expect(response2).toBe(expecteResponse);
  });
});

describe("validate date format", () => {
  it("should return true if date is of valid format (yyyy-mm-dd)", () => {
    //Arrange
    const expectedResponse = true;
    const date = "2014-10-11";
    //Act
    const response = validateDate(date);
    //Assert
    expect(response).toBe(expectedResponse);
  });

  it("should return false if date is of invalid format (yyyy-mm-dd)", () => {
    //Arrange
    const expectedResponse = false;
    const date = "10-11-2014";
    //Act
    const response = validateDate(date);
    //Assert
    expect(response).toBe(expectedResponse);
  });

  it("should return false if date is from future (yyyy-mm-dd)", () => {
    //Arrange
    const expectedResponse = false;
    const date = "10-11-2232";
    //Act
    const response = validateDate(date);
    //Assert
    expect(response).toBe(expectedResponse);
  });

  it("should return false if date is of invalid format (yyyy-mm-dd)", () => {
    //Arrange
    const expectedResponse = false;
    const date = "25-12-2014";
    //Act
    const response = validateDate(date);
    //Assert
    expect(response).toBe(expectedResponse);
  });
});
