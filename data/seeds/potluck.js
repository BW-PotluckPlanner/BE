
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potluck').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('potluck').insert([
        {id: 1, name: "Jake's potluck", date: '12/25/2020', time_start: '03:30PM PST', time_end: '07:00PM PST', description: 'Come have fun at my party'},
        {id: 2, name: "Covid Party 2020", date: '04/02/2020', time_start: '03:30PM PST', time_end: '07:00PM PST', description: 'This will be fun'},
        {id: 3, name: 'Sad Boy Club', date: '11/03/2020', time_start: '03:30PM PST', time_end: '07:00PM PST', description: 'Come and be sad, and eat sad food'}
      ]);
    });
};
