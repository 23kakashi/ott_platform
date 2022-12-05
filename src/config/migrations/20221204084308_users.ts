import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (tbl) => {
    tbl.uuid("userid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("email", 200).unique().notNullable();
    tbl.enum("plan", ["basic", "premium"]).defaultTo("basic");
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
