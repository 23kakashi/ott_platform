import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("userdb", (table) => {
    table.increments();
    table.string("username", 100).notNullable().unique();
    table.string("password", 200).notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("userdb");
}
