"use strict";
// Update with your config settings.
var config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/db/wr-float-denomination-tracker.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
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
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/db/wr-float-denomination-tracker.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    // production: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // }
};
module.exports = config;
//# sourceMappingURL=knexfile.js.map