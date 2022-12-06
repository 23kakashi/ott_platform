import { Knex } from "knex";
import knex from "../config/db";

const SELET_USER_QUERY = 'SELECT * FROM USERS WHERE EMAIL';
export class UserRepository {
  constructor() {}

  public getUserByEmail(email: string): Knex.QueryBuilder {
    return knex("users").select("*").where("email", email).first();
  }
}
