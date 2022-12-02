import { generateOtp } from "./generate_otp";

describe("generate otp", () => {
  it("should have 4 digits", () => {
    //Arrange
    //Act
    //Assert
    expect(generateOtp()).toHaveLength(4);
  });

  it("should be of type string", () => {
    //Arrange
    //Act
    //Assert
    expect(typeof generateOtp()).toBe("string");
  });

  it("should return an otp", () => {
    //Arrange
    const expectedResponse = "1223";
    const mockfn = jest.fn().mockImplementation(() => expectedResponse);
    //Act
    const otp = mockfn();
    //Assert
    expect(otp).toBe(expectedResponse);
  });
});
