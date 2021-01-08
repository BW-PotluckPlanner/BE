exports.up = function (knex) {
    return knex.schema.createTable('food', food => {
        food.increments();

        food.string('name', 50)
        .notNullable()
         
    })
    .createTable('potluck_food', plf => {

        plf.integer('food_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("food")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    
        plf.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("potluck")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

        plf.primary(["food_id", "potluck_id"]);
      })
    
      .createTable('user_food', uf => {

        uf.integer('food_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("food")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    
        uf.integer('user_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

        uf.integer('potluck_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("potluck")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

        uf.primary(["food_id", "potluck_id"]);
      })
  
  };
  
  exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('food')
        .dropTableIfExists('potluck_food')
        .dropTableIfExists('user_food')
  };