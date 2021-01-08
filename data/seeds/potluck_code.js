exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('potluck_code').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('potluck_code').insert([
          {id: 1, potluck_id: 1, code: '20-29e8c76f0a977314d9bbed3a', isValid: 1},
          {id: 2, potluck_id: 2, code: '15-7963f248244fa2df0331206e', isValid: 1},
          {id: 3, potluck_id: 3, code: '20-cd2d8a379d016a6c28633f7b', isValid: 1}
        ]);
      });
  };
  