exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users.string('username', 16)
      .notNullable()
      .unique();

    users.string('password', 128)
      .notNullable();  

    users.string('email', 128)
      .notNullable();

    users.string('first_name', 50)
      .notNullable();

      users.string('last_name', 50)
      .notNullable()
  })

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
