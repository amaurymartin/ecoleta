import dotenv from 'dotenv'

dotenv.config()

const config: {[k: string]: any} = {
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: 'ecoleta',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: 'utf-8'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: 'ecoleta',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: 'utf-8'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: 'ecoleta',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'db_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: 'ecoleta',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'db_migrations'
    }
  }
}

export default config
