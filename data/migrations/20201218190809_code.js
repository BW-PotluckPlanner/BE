
exports.up = function(knex) {
    return knex.schema.createTable('potluck_code', plc => {
        plc.increments();

        plc.integer('potluck_id', 50)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("potluck")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  
        plc.string('code', 255)
        .unique();
  
        plc.boolean('isValid', 128);

    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('potluck_code')
};
