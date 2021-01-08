
exports.up = function(knex) {
    return knex.schema.createTable('rsvp', rsvp => {
        rsvp.increments();
    
        rsvp.enu('isAttending', ['yes', 'no'])
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rsvp');
};
