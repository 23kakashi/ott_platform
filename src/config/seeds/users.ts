import { v4 as uuid } from "uuid";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      email: "tapishsharma1234@gmail.com",
      plan: "premium",
      role: "user",
    },
    {
      email: "aniket-solnaki@pluralsight.com",
      plan: "premium",
      role: "user",
    },
    {
      email: "tapish-sharma@pluralsight.com",
      plan: "premium",
      role: "admin",
    },
  ]);
}
