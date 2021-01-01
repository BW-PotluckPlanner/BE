
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potluck_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('potluck_members').insert([
        {user_id: 1, role_id: 1, potluck_id: 1},
        {user_id: 2, role_id: 2, potluck_id: 1},
        {user_id: 3, role_id: 2, potluck_id: 1}
      ]);
    });
};
