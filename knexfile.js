const databaseName = 'node-security';

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://postgres:postgres@localhost:5432/${databaseName}`,
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
    connection: `postgres://postgres:postgres@localhost:5432/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  }
};