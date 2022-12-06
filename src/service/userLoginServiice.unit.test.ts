import { UserRepository } from "../database/user.query";
import { UserLoginService } from "./userLogin.service";
import sinon from "sinon";

describe("send otp to user", () => {
  let loginService: UserLoginService;
  let userRepositoryStub;
  beforeEach(() => {
    loginService = new UserLoginService();
  });

  it("should throw validation error", async () => {
    //Act
    try {
      const response = await loginService.sendOtpToUser("xyzgmail.com");
    } catch (error: any) {
      //Assert
      expect(error.message).toBe("validation failed");
    }
  });

  it.only("should throw user not found error", async () => {
    //Arrange
    userRepositoryStub = sinon.stub(UserRepository.prototype, 'getUserByEmail').resolves({});

    
    try {
      const response = await loginService.sendOtpToUser("zyx@gmail.com");
    } catch (error: any) {
      //Assert
      expect(error.message).toBe("user not found");
    }
  });

  it('should return a user ', ()=> {
  //Arrange
  
  //Act
  
  //Assert
  
  })
});
