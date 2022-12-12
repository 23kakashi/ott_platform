import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("movie_cast", (tbl) => {
    tbl.dropColumn("actor_id");
    tbl.string("actor");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_cast");
}
