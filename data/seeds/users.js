
const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'kyla', password: bcrypt.hashSync("password", 8), email: 'kyla@email.com', first_name: 'kyla', last_name: 'oyamot'},
        {id: 2, username: 'jacob', password: bcrypt.hashSync("password", 8), email: 'jacob@email.com', first_name: 'jacob', last_name: 'morris'},
        {id: 3, username: 'ryan', password: bcrypt.hashSync("password", 8), email: 'ryan@email.com', first_name: 'ryan', last_name: 'clark'},
      ]);
    });
};
