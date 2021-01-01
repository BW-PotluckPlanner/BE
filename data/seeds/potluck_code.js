exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('potluck_code').del()
      .then(function () {
        // Inserts seed entries
        return knex('potluck_code').insert([
          {id: 1, potluck_id: 1, code: 'ABCDEFG', isValid: 1},
          {id: 2, potluck_id: 2, code: 'ABCDEFH', isValid: 1},
          {id: 3, potluck_id: 3, code: 'ABCDEFJ', isValid: 1}
        ]);
      });
  };
  