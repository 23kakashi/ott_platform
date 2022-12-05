import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("director", (tbl) => {
    tbl.uuid("director_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("director_name", 100).unique().notNullable();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("director");
}
