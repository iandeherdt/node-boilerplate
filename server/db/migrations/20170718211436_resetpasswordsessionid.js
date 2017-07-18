
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('resetid');
    table.timestamp('resetexpiration');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('resetid');
    table.dropColumn('resetexpiration')
  });
};
