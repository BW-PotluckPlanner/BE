const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findByName,
    add,
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

async function remove(food) {
    
}