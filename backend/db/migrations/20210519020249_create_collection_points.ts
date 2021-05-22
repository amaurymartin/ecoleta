import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('collection_points', table => {
    table.increments()

    table.integer('address_id').unsigned().references('id').inTable('addresses')

    table.string('key').notNullable()
    table.string('name').notNullable()
    table.string('nickname').notNullable()
    table.string('image_base64').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('whatsapp').notNullable()

    table.unique(['key'])
    table.unique(['email'])
    table.unique(['whatsapp'])

    table.timestamps(true, true)
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('collection_points')
}
