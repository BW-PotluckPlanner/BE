
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(function () {
      // Inserts seed entries
      return knex('food').insert([
        {id: 1, name: 'Broccoli', category: 'vegetables', comment: "I prefer if it's cooked, but raw is ok as well."},
        {id: 2, name: 'Hawaiian Rolls', category: 'bread', comment: "Yum, good for sandwiches."},
        {id: 3, name: 'Steak', category: 'Protein', comment: "I prefer if it's cooked, but raw is ok as well."}
      ]);
    });
};
