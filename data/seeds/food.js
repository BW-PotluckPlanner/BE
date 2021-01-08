
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('food').insert([
        {id: 1, name: 'Broccoli'},
        {id: 2, name: 'Hawaiian Rolls'},
        {id: 3, name: 'Steak'}
      ]);
    });
};
