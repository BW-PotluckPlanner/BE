
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'jake', password: 'password', email: 'jake@email.com', first_name: 'jake', last_name: 'juneau'},
        {id: 2, username: 'jake1', password: 'password', email: 'jake1@email.com', first_name: 'jake', last_name: 'juneau'},
        {id: 3, username: 'jake2', password: 'password', email: 'jake2@email.com', first_name: 'jake', last_name: 'juneau'},
      ]);
    });
};
