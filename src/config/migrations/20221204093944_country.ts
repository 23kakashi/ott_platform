import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("country", (tbl) => {
    tbl.uuid("country_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("country_name", 200).unique().notNullable();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("country");
}
