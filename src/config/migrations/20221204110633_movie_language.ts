import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movie_language", (tbl) => {
    tbl
      .uuid("movie_language_id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    tbl
      .uuid("movie_id")
      .notNullable()
      .references("movies_id")
      .inTable("movies");
    tbl
      .uuid("language_id")
      .notNullable()
      .references("language_id")
      .inTable("language");
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_language");
}
