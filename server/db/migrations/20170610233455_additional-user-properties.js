exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('firstname');
    table.boolean('registered');
    table.string('addressName');
    table.string('street');
    table.string('house');
    table.string('bus');
    table.integer('postal');
    table.string('city');
    table.string('country');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('firstname');
    table.dropColumn('registered');
    table.dropColumn('addressName');
    table.dropColumn('street');
    table.dropColumn('house');
    table.dropColumn('bus');
    table.dropColumn('postal');
    table.dropColumn('city');
    table.dropColumn('country');
  });
};