import sinon from "sinon";
import GenerateOtpObj from "./GenerateOtp";

describe("genrate otp", () => {
  const email = "test@test.com";
  const otp = "2121";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate 4 digit otp", async () => {
    //Arrange
    const storeOtpInDbSpy = jest.spyOn(GenerateOtpObj, "storeOtpInDb").mockResolvedValue(true);
    //Act
    const response = await GenerateOtpObj.generateOtp(email);
    //Assert
    expect(response).toHaveLength(4);
    expect(typeof response).toBe("string");
    expect(typeof Number(response)).toBe("number");
    expect(storeOtpInDbSpy).toBeCalledTimes(1);
    expect(storeOtpInDbSpy).toBeCalledWith(email, response);
  });
  it("should return true if otp is stored in db", async () => {
    //Act
    const response = await GenerateOtpObj.storeOtpInDb(email, otp);
    //Assert
    expect(response).toBe(true);
  });
});
