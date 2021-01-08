
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rsvp').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('rsvp').insert([
        {isAttending: 'yes'},
        {isAttending: 'no'}
      ]);
    });
};
