// Update with your config settings.

const config = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/wr-float-denomination-tracker.db3'
    },
		useNullAsDefault: true,
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds'
		}
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}

module.exports = config