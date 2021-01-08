exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_food').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_food').insert([
        {food_id: 1, potluck_id: 1, user_id: 2},
        {food_id: 2, potluck_id: 1, user_id: 2},
        {food_id: 3, potluck_id: 1, user_id: 2},
        {food_id: 1, potluck_id: 2, user_id: 3},
        {food_id: 2, potluck_id: 2, user_id: 3},
        {food_id: 3, potluck_id: 2, user_id: 3},
        {food_id: 1, potluck_id: 3, user_id: 1},
        {food_id: 2, potluck_id: 3, user_id: 1},
        {food_id: 3, potluck_id: 3, user_id: 1},
      ]);
    });
};
