import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movie_geners", (tbl) => {
    tbl.uuid("movie_geners_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.uuid("movie_id").notNullable().references('movies_id').inTable('movies');
    tbl.uuid("geners_id").notNullable().references('geners_id').inTable('geners');
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_geners");
}
