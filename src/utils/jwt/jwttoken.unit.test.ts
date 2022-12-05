import { signJwtToken, verifyJwtToken } from "./jwttoken";

describe("jwttokwn function", () => {
  it("should sign jwt token with user role and userid", () => {
    //Arrange
    const role = "user";
    const userid = "849ryufy90roih4";
    //Act
    const response = signJwtToken(role, userid);
    //Assert
    expect(typeof response).toBe("string");
    expect(response).toContain(".");
  });

  it("should verify jwt token", () => {
    //Arrange
    const role = "user";
    const userid = "849ryufy90roih4";
    const expectedResponse = {
      role: "user",
      userid: "849ryufy90roih4",
    };
    //Act
    const token = signJwtToken(role, userid);
    const response = verifyJwtToken(token);
    //Assert
    expect(response).toHaveProperty("role");
    expect(response).toHaveProperty("userid");
    expect(response).toMatchObject(expectedResponse);
  });
});
