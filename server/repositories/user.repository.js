const knex = require('../db/connection');
const bcrypt = require('bcryptjs');

function createUser(user){
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  return knex('users').where({username: user.username}).first().then((dbUser) => {
    if (dbUser){
      throw new Error('Cannot insert duplicate user.');
    } else {
      return knex('users')
        .insert({
          username: user.username,
          password: hash,
          name: user.name,
          firstname: user.firstname,
          admin: user.admin,
          street: user.street,
          house: user.house,
          bus: user.bus,
          postal: user.postal,
          city: user.city,
          country: user.country,
        })
        .returning('*');
    }
  });
}

async function findUserByUsername(username){
  return await knex('users').where({ username }).first();
}

module.exports = {
  createUser,
  findUserByUsername,
};