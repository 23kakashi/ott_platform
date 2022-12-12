import exp from "constants";
import sinon from "sinon";
import UserRepositoryObj from "../repository/UserRepository";
import UserServiceObj from "./UserService";

describe("User service", () => {
  afterEach(() => {
    sinon.restore();
    jest.clearAllMocks();
  });
  describe("validate user by email", () => {
    it("should return a user if user is found in db", async () => {
      //Arrange
      const email = "test@test.com";
      const expectedResponse = {
        userid: "",
        email: "",
        role: "",
        plan: "",
        createdAt: new Date(),
      };
      const getUserByEmailStub = jest.spyOn(UserRepositoryObj, "getUserByEmail").mockResolvedValue(expectedResponse);
      //Act
      const response = await UserServiceObj.validateUserByEmail(email);
      //Assert
      expect(response).toBe(expectedResponse);
      expect(getUserByEmailStub).toBeCalledTimes(1);
      expect(getUserByEmailStub).toBeCalledWith(email);
    });

    it("should return a undefined if user is found in db", async () => {
      //Arrange
      const email = "test@test.com";
      const expectedResponse = undefined;
      const getUserByEmailStub = jest.spyOn(UserRepositoryObj, "getUserByEmail").mockResolvedValue(undefined);
      //Act
      const response = await UserServiceObj.validateUserByEmail(email);
      //Assert
      expect(response).toBe(expectedResponse);
      expect(getUserByEmailStub).toBeCalledTimes(1);
      expect(getUserByEmailStub).toBeCalledWith(email);
    });
  });
});
