import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('recycling_types', table => {
    table.increments()

    table.string('description').notNullable()
    table.string('filename').notNullable()

    table.unique(['description'])
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('recycling_types')
}
