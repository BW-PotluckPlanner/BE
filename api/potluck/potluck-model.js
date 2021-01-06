const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findByUserId,
    findByAdmin,
    findSingleByAdmin,
    findUsersAtPotluck,
    getUserRole,
    getFood,
    getAdminRole,
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
      const potluckId = await db('potluck').where({ id }).select('*').first();
      const attending = await findUsersAtPotluck(id)
      const food = await getFood(id)
      return {...potluckId, attending, food}
    } catch (err) {
        throw err
    }
}

async function findByUserId(userId) {
    try {
        return await db('users')
        .join('potluck_members', 'potluck_members.user_id', 'users.id')
        .join('potluck', 'potluck_members.potluck_id', 'potluck.id')
        .where('users.id', userId)
        .select('potluck.id', 'potluck.name', 'potluck.description', 'potluck.date', 'potluck.time_start', 'potluck.time_end', 'potluck_members.role_id')
    } catch (err) {
        throw err;
    }
}

async function findByAdmin(userId) {
    try {
        return await db('users')
        .join('potluck_members', 'potluck_members.user_id', 'users.id')
        .join('potluck', 'potluck_members.potluck_id', 'potluck.id')
        .where('users.id', userId)
        .andWhere('potluck_members.role_id', 1)
        .select('potluck.id', 'potluck.name', 'potluck.date', 'potluck.description', 'potluck.time_start', 'potluck.time_end')
    } catch (err) {
        throw err;
    }
}

async function findSingleByAdmin(userId, id) {
    try {
        return await db('users')
        .join('potluck_members', 'potluck_members.user_id', 'users.id')
        .join('potluck', 'potluck_members.potluck_id', 'potluck.id')
        .where('users.id', userId)
        .andWhere('potluck.id', id)
        .andWhere('potluck_members.role_id', 1)
        .select('potluck.id', 'potluck.name', 'potluck.date', 'potluck.description', 'potluck.time_start', 'potluck.time_end')
    } catch (err) {
        throw err;
    }
}

//gets user role for specific potluck
async function getUserRole(potluck_id, user_id) {
    try {
        const userRole =  await db("potluck_members").where({ potluck_id, user_id }).select("role_id").first();
        return userRole
    } catch (err) {
        throw err
    }
}

//gets user role
async function getAdminRole(user_id) {
    try {
        const userRole =  await db("potluck_members").where({ potluck_id, user_id }).select("role_id").first();
        return userRole
    } catch (err) {
        throw err
    }
}
//gets users attending a potluck
async function findUsersAtPotluck(id) {
    try {
        return await db('potluck')
            .join('potluck_members', 'potluck_members.potluck_id', 'potluck.id')
            .join('users', 'potluck_members.user_id', 'users.id')
            .where('potluck.id', id)
            .select('users.username', 'users.first_name', 'users.last_name', 'potluck_members.role_id')
    } catch (err) {
        throw err
    }
}

//gets food wanted from potluck
async function getFood(id) {
    try {
        return await db('potluck')
            .join('potluck_food', 'potluck_food.potluck_id', 'potluck.id')
            .join('food', 'potluck_food.food_id', 'food.id')
            .where('potluck.id', id)
            .select('food.name')
    } catch (err) {
        throw err
    }
}

//creates potluck
async function addPotluck(data) {
    try {
        const newPotluck =  await db('potluck').insert(data, "id")
        return newPotluck;
    } catch (err) {
        throw err;
    }
}

//adds user to potluck_members
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
