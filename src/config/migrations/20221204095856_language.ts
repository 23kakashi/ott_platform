import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("language", (tbl) => {
    tbl.uuid("language_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("language", 100).unique().notNullable();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("language");
}
