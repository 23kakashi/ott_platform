import { Knex } from "knex";
import knex from "../config/db";

export const getUserByEmail = (email: string): Knex.QueryBuilder => {
  return knex("users").select("*").where("email", email).first();
};
