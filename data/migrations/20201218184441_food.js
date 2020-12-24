exports.up = function (knex) {
    return knex.schema.createTable('food', food => {
        food.increments();

        food.string('name', 50)
        .notNullable()
        .unique();
  
        food.string('category', 128);
  
        food.string('comment', 128);
  
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
  
  };
  
  exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('food')
        .dropTableIfExists('potluck_food')
        
  };