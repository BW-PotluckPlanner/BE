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
    getFoodToUsers,
    getAdminRole,
    addPotluck,
    addUsertoPotluck,
    addFoodToUser,
    updateRSVP,
    update,
    remove,
    removeFood
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
      const invited = await findUsersAtPotluck(id)
      const food = await getFood(id)
      return {...potluckId, invited, food}
    } catch (err) {
        throw err
    }
}

async function findByUserId(userId) {
    try {
        return await db('users')
        .join('potluck_members', 'potluck_members.user_id', 'users.id')
        .join('potluck', 'potluck_members.potluck_id', 'potluck.id')
        .join('rsvp', 'potluck_members.rsvp_id', 'rsvp.id')
        .where('users.id', userId)
        .select('potluck.id', 'potluck.name', 'potluck.description', 'potluck.date', 'potluck.time_start', 'potluck.time_end', 'potluck_members.role_id', 'rsvp.isAttending')
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

//gets admin role
async function getAdminRole(user_id) {
    try {
        const userRole =  await db("potluck_members").where({ user_id }).select("role_id").first();
        return userRole
    } catch (err) {
        throw err
    }
}

//gets users in  a potluck
async function findUsersAtPotluck(id) {
    try {
        return await db('potluck')
            .join('potluck_members', 'potluck_members.potluck_id', 'potluck.id')
            .join('users', 'potluck_members.user_id', 'users.id')
            .join('rsvp', 'potluck_members.rsvp_id', 'rsvp.id')
            .where('potluck.id', id)
            .select('users.username', 'users.first_name', 'users.last_name', 'potluck_members.role_id', 'rsvp.isAttending')
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

//gets food user is bringing
async function getFoodToUsers(id) {
    try {
        return await db('food')
            .join('member_food', 'member_food.food.id', 'food.id')
            .join('food', 'member_food.id', 'food.id')
            .join('potluck_member', 'potluck_member.user_id', 'users.id')
            .where('food.id', id)
    } catch (err) {
        throw err;
    }
}

//add food to user
async function addFoodToUser(user_id, potluck_id, food_id) {
    try {
        return db("user_food").insert( user_id, {potluck_id}, food_id )
    } catch (err) {
        throw err;
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

//update user RSVP
async function updateRSVP(rsvp_id, user_id , potluck_id) {
    try {
        return await db('potluck_members')
            .where({ user_id , potluck_id })
            .update({ rsvp_id })
    } catch (err) {
        throw err
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

//delete food from user
async function removeFood(food_id, user_id, potluck_id) {
    try {
        return await db('user_food').where( food_id, user_id, {potluck_id }).del()
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
