import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movies", (tbl) => {
    tbl.uuid("movies_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("title", 100).notNullable();
    tbl.date("release_date").notNullable();
    tbl.float("rating", 1).notNullable();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movies");
}
