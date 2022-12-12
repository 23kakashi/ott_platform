import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("movie_direction", (tbl) => {
    tbl.dropColumn("director_id");
    tbl.string("director_name");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_direction");
}
