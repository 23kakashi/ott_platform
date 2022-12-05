import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("admin", (tbl) => {
    tbl.uuid("admin_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("email", 200).unique().notNullable();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("admin");
}
