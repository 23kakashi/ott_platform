import { INVALID_PLAN_MESSAGE, PLAN_ALREADY_ACTIVE } from "../Error/customErrorMessage";
import ErrorHandler from "../Error/ErrorHandler";
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

  public async changeUserplan(email: string, plan: string) {
    if (plan !== "basic" && plan !== "premium") {
      throw new ErrorHandler(INVALID_PLAN_MESSAGE);
    }
    const user = await UserRepositoryObj.getUserByEmail(email);
    if (user !== undefined && user.plan === plan) {
      throw new ErrorHandler(PLAN_ALREADY_ACTIVE);
    }

    await UserRepositoryObj.updatePlan(email, plan);
  }
}

const UserServiceObj = new UserService();
export default UserServiceObj;
