
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, username: 'jake', password: 'password', email: 'jake@email.com', first_name: 'jake', last_name: 'juneau'},
        {id: 1, username: 'jake1', password: 'password', email: 'jake1@email.com', first_name: 'jake', last_name: 'juneau'},
        {id: 1, username: 'jake2', password: 'password', email: 'jake2@email.com', first_name: 'jake', last_name: 'juneau'},
      ]);
    });
};
