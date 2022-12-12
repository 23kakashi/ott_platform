import UserRepositoryObj from "../repository/UserRepository";
import { UserType } from "../types/user.types";

class UserService {
  constructor() {}

  public async validateUserByEmail(email: string): Promise<UserType | undefined> {
    const user = await UserRepositoryObj.getUserByEmail(email);
    if (user === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(user);
  }
}

const UserServiceObj = new UserService();
export default UserServiceObj;
