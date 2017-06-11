exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('facebookId');
    table.string('googleId');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('facebookId');
    table.dropColumn('googleId');
  });
};
