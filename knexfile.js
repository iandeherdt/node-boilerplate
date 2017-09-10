module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    debug: false,
    pool: {
      min: 1,
      max: 2
    },
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}_test`,
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  },
  production : {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    debug: false,
    pool: {
      min: 1,
      max: 2
    },
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  },
};