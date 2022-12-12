import knex from "../config/db";
import { INVALID_USER_MESSAGE } from "../Error/customErrorMessage";
import ErrorHandlerObj from "../Error/ErrorHandler";
import { UserType } from "../types/user.types";

class UserRepository {
  constructor() {}

  public async getUserByEmail(email: string): Promise<UserType | undefined> {
    return await knex("users").select("*").where("email", email).first();
  }
}

const UserRepositoryObj = new UserRepository();
export default UserRepositoryObj;
