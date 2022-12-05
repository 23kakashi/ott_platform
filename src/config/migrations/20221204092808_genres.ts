import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("geners", (tbl) => {
    tbl.uuid("geners_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("geners", 200).unique().notNullable();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("geners");
}
