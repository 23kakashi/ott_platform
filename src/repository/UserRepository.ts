import knex from "../config/db";
import { INVALID_USER_MESSAGE } from "../Error/customErrorMessage";
import ErrorHandlerObj from "../Error/ErrorHandler";
import { UserType } from "../types/user.types";

class UserRepository {
  constructor() {}

  public async getUserByEmail(email: string): Promise<UserType | undefined> {
    return await knex("users").select("*").where("email", email).first();
  }

  public async updatePlan(email: string, plan: string) {
    return await knex("users").update({ plan: plan }).where("email", email);
  }
}

const UserRepositoryObj = new UserRepository();
export default UserRepositoryObj;
