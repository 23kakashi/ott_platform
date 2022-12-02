import { validateEmail } from "./validation";

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
