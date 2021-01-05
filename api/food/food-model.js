const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findByName,
    add,
    addFoodtoPotluck,
    update,
    remove
}

async function find() {
    try {
       return await db('food') 
    } catch (err) {
        throw err;
    }
}

async function findByName(name) {
    try {
        const food = await db('food').where({ name }).first()
        return food;
    } catch (err) {
        throw err;
    }
}

async function add(food) {
  try {
      const newFood = await db('food').insert(food)
      return newFood
  } catch (err) {
      throw err;
  }  
}

//add food to potluck
async function addFoodtoPotluck(food) {
    try {
      return db("potluck_food").insert(food)  
    } catch (err) {
        throw err
    }
}

async function update(id, changes) {
    try {
        const updatedFood = await db('potluck').where({ id }).update(changes);
        return updatedFood;
    } catch (err) {
        throw err
    }
}

async function remove(id) {
    try {
        return await db('food').where({ id }).del()
    } catch (err) {
        throw err
    }
}