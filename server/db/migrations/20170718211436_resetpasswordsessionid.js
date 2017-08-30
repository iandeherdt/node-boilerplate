
exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('resetid');
    table.timestamp('resetexpiration');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('resetid');
    table.dropColumn('resetexpiration');
  });
};
