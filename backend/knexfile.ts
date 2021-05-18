const config: {[k: string]: any} = {
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.HOST,
      database: 'ecoleta',
      user: process.env.USER,
      password: process.env.PASSWORD,
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
      host: process.env.HOST,
      database: 'ecoleta',
      user: process.env.USER,
      password: process.env.PASSWORD,
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
      host: process.env.HOST,
      database: 'ecoleta',
      user: process.env.USER,
      password: process.env.PASSWORD
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
      host: process.env.HOST,
      database: 'ecoleta',
      user: process.env.USER,
      password: process.env.PASSWORD
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
