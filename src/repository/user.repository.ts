import knex from "../config/db";
import { userType } from "../types/user.types";

export class UserRepository {
  constructor() {}

  public getUserByEmail(email: string): Promise<userType | undefined> {
    return knex("users").select("*").where("email", email).first();
  }
}
