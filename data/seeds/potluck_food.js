exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('potluck_food').del()
      .then(function () {
        // Inserts seed entries
        return knex('potluck_food').insert([
          {food_id: 1, potluck_id: 1},
          {food_id: 2, potluck_id: 1},
          {food_id: 3, potluck_id: 1},
          {food_id: 1, potluck_id: 2},
          {food_id: 2, potluck_id: 2},
          {food_id: 3, potluck_id: 2},
          {food_id: 1, potluck_id: 3},
          {food_id: 2, potluck_id: 3},
          {food_id: 3, potluck_id: 3},
        ]);
      });
  };
  