const databaseName = 'node-security';

module.exports = {
  development: {
    client: 'pg',
    connection: `${process.env.CONNECTIONSTRING}/${databaseName}`,
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
    connection: `${process.env.CONNECTIONSTRING}/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/db/seeds'
    }
  },
  production : {
    client: 'pg',
    connection: `${process.env.CONNECTIONSTRING}/${databaseName}`,
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