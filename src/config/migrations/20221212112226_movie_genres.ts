import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("movie_geners", (tbl) => {
    tbl.dropColumn("geners_id");
    tbl.string("genres");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_geners");
}
