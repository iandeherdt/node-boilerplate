const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('johnson123', salt);
    return Promise.join(
      knex('users').insert({
        username: 'jeremy',
        password: hash,
        name: 'jerry',
        email: 'jerry@hotmail.com'
      })
    );
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('bryant123', salt);
    return Promise.join(
      knex('users').insert({
        username: 'kelly',
        password: hash,
        admin: true,
        name: 'kel',
        email: 'kel@hotmail.com'
      })
    );
  });
};
