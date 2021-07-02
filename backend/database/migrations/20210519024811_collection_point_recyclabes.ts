import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('collection_point_recyclables', table => {
    table.increments()

    table.integer('collection_point_id').unsigned().references('id').inTable('collection_points')
    table.integer('recycling_type_id').unsigned().references('id').inTable('recycling_types')
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('collection_point_recyclables')
}
