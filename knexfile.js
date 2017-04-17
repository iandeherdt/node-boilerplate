const connectionString = 'postgres://postgres:postgres@localhost:5432/node-security';
module.exports = {
  development: {
    client: 'pg',
    connection: connectionString,
    debug: false,
    pool: {
        min: 1,
        max: 2 
    }
  }
};