import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex('recycling_types').insert([
    {
      description: 'lamps',
      filename: 'lamps.svg'
    },
    {
      description: 'batteries',
      filename: 'batteries.svg'
    },
    {
      description: 'papers',
      filename: 'papers.svg'
    },
    {
      description: 'electronics',
      filename: 'electronics.svg'
    },
    {
      description: 'organics',
      filename: 'organics.svg'
    },
    {
      description: 'oil',
      filename: 'oil.svg'
    }
  ])
}

export async function down (knex: Knex): Promise<void> {
  return await knex('recycling_types').whereIn('description', [
    'lamps', 'batteries', 'papers', 'electronics', 'organics', 'oil'
  ]).delete()
}
