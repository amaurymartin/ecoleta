import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('addresses', table => {
    table.increments()

    table.string('street').notNullable()
    table.string('number').notNullable()
    table.string('complement')
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('country').notNullable().defaultTo('BRA')
    table.decimal('latitude', 8, 6).notNullable().defaultTo(-14.235004)
    table.decimal('longitude', 8, 6).notNullable().defaultTo(-51.925280)
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('addresses')
}
