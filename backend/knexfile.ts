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
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
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
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
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
      tableName: 'migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
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
      tableName: 'migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
}

export default config
