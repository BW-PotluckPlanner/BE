
exports.up = function(knex) {
    return knex.schema.createTable('roles', roles => {
        roles.increments();
    
        roles.enu('user_role', ['creator', 'attendee'])
      })
    
    .createTable('potluck', pl => {
        pl.increments();
    
        pl.string('name', 48)
          .notNullable();
        
        pl.string('date', 10)
          .notNullable();
        
        pl.string('time_start', 11)
          .notNullable();

          pl.string('time_end', 11)
          .notNullable();
        
        pl.string("description", 100)
          .notNullable();
      })
    
    .createTable("potluck_members", pm => {
        pm
        .integer("potluck_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("potluck")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    
        pm
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    
        pm
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    
      // Composite key with user_id and team_id
        pm.primary(["user_id", "potluck_id"]);
      })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('potluck_members')
        .dropTableIfExists('potluck')
        .dropTableIfExists('roles')
  
};
