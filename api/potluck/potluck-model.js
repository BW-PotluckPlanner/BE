const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    addPotluck,
    addUsertoPotluck,
    update,
    remove
}

async function find() {
    try {
        return await db('potluck')
    } catch (err) {
        throw err
    }
}

async function findById(id) {
    try {
      const potluckId = await db('potluck').where({ id: id }).select('*').first();
      return potluckId;
    } catch (err) {
        throw err
    }
}

async function addPotluck(potluck) {
    try {
        const newPotluck =  await db('potluck').insert(potluck, "id")
        return newPotluck;
    } catch (err) {
        throw err;
    }
}

async function addUsertoPotluck(member) {
    try {
        return db("potluck_members").insert(member)
    } catch (error) {
        throw err;
    }
}

//update potluck
async function update(id, changes) {
    try {
        const updatedPotluck = await db('potluck').where({ id }).update(changes);
        return updatedPotluck;
    } catch (err) {
        throw err
    }
}

//delete potluck
async function remove(id) {
    try {
        return await db('potluck').where({ id }).del();
    } catch (err) {
        throw err;
    }
}