const express = require('express');
const crypto = require('crypto')
const Potluck = require('./potluck-model.js')
const Invite = require('../invites/invite-model.js')


const {
    restrict,
    validatePotluckId,
    validatePotluckOwner
} = require('../../middleware/middleware.js');


const router = express.Router()


//fetch all potlucks
router.get('/', restrict, (req, res) => {
    Potluck.find()
        .then(potluck => {
            res.json(potluck)
        })
        .catch(err => {
            res.json(500).json({ message: "Could not retrieve potlucks"})
        })
})

//fetch potluck by id
router.get('/:id', validatePotluckId, restrict, (req, res) => {
    const { id } = req.params;
    const potluck = req.potluck;

    Potluck.findById(id)
        .then((potluck) => {
            res.status(200).json(potluck)
        })
        .catch((err) => {
            res.status(500).json({ message: `Could not retrieve potluck with the id of ${id}: ${err}`})
        })
})

router.get('/:id/attendees', restrict, validatePotluckId, (req, res) => {
    const { id } = req.params;
    Potluck.findUsersAtPotluck(id)
        .then((members) => {
            res.status(200).json(members)
        })
        .catch((err) => {
            res.status(500).json({ message: `Could not retrieve members attending potluck with the id of ${id}: ${err}`})
        })
})

//fetch potlucks user is apart of
router.get('/:userId/mypotlucks', restrict, (req, res) => {
    const { userId } = req.params;
    Potluck.findByUserId(userId)
        .then((potluck) => {
            res.status(200).json(potluck)
        })
        .catch((err) => {
            res.status(500).json({ message: `Could not retrieve potlucks created with user id: ${userId}`})
        })
})

//fetch food from potluck
router.get('/:id/food', restrict, (req, res) => {
    const { id } = req.params;
    Potluck.getFood(id)
        .then((food) => {
            res.status(200).json(food)
        })
        .catch((err) => {
            res.status(500).json({ message: `Could not retrieve food from potluck`})
        })
})

//fetch potlucks user created
router.get('/:userId/admin', restrict, (req, res) => {
    const { userId } = req.params;
    const user_id = { userId }
    const role_id = 1
    Potluck.findByAdmin(userId)
        .then((potluck) => {
            res.status(200).json(potluck)
        })
        .catch((err) => {
            res.status(500).json({ message: `Could not retrieve potlucks created with user id: ${userId}`})
        })
})

//fetch single potluck user is apart of
router.get('/:userId/mypotlucks/:id', restrict, (req, res) => {
    const { userId } = req.params;
    const { id } = req.params

    Potluck.findByUserId(userId)
        .then((potluck) => {
            Potluck.findById(id)
            .then((singlePotluck) => {
                res.status(200).json(singlePotluck)
            })
            .catch((err) => {
                res.status(500).json({ message: "could not find potlucks for that user"})
            })
        }).catch((err) => {
            res.status(500).json({ message: "no potlucks for that user."})
        })

})

//fetch single potluck user created
router.get('/:userId/admin/:id', restrict, (req, res) => {
    const { userId } = req.params;
    const { id } = req.params

    Potluck.findSingleByAdmin(userId, id)
        .then((potluck) => {
            res.status(200).json(potluck)
        }).catch((err) => {
            res.status(500).json({ message: "no potlucks for that user."})
        })

})


//create and add creator to potluck
router.post('/', restrict, (req, res) => {
    const { name, date, time_start, time_end, description } = req.body;
    const potluckData = { name, date, time_start, time_end, description }
    const uid = req.body.userId

    Potluck.addPotluck(potluckData)
        .then(potluck => {
            Potluck.addUsertoPotluck({
                potluck_id: potluck[0],
                user_id: uid,
                role_id: 1,
            }).then(() => {
                res.status(201).json({id: potluck[0], name: potluckData.name});
            })
            
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to create potluck: ${err}`})
        })
})

//add user to potluck

router.post("/:id/attendees", (req, res) => {
    const { id } = req.params;
    const potluckData = { potluck_id: id }
    const uid = req.body.userId
    if(potluckData.potluck_id && uid) {
        Potluck.addUsertoPotluck({
            potluck_id: id,
            user_id: uid,
            role_id: 2
        }).then(() => {
            res.status(201).json({ message: `user: ${uid}, added to potluck: ${id}`})
        }).catch(err => {
            res.status(500).json({ message: `Failed to add user to potluck: ${err}`})
        })
    } else {
        res.status(400).json({ message: "must contain required fields" });
      }
})

//update potluck
router.put('/:id', validatePotluckId, (req, res) => {
    const changes = req.body
    const { id } = req.params  
    
    Potluck.update(id, changes)
        .then((update) => {
            res.status(200).json({message: `You updated potluck ${id}.`})
        })
        .catch(err => {
            res.status(500).json({ message: `Can't update potluck with the id ${id} because ${err}`})
        })
})

//delete potluck
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Potluck.remove(id)
        .then((deleted) => {
            res.status(200).json({message: `deleted potluck with the id of ${id}`})
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//creates invite code
router.post("/:id/invite/:userId", restrict, async (req, res) => {
    const potluck_id = req.params.id;
    const user_id = req.params.userId;

    const role = await Potluck.getUserRole(potluck_id, user_id)
    
    if (role.role_id !== 1) {
        res.status(403).json({ error: "Invite access denied."})
    } else {
        if(!potluck_id || !user_id) {
            res.status(400).json({ message: "must contain potluck id, and user id."})
        }

        const newCode = genCode(potluck_id);
        const codeData = { potluck_id, newCode};
        


    Invite.findByPotluck(potluck_id)
        .then((invite) => {
            if (invite.isValid == true) {
                    res.status(400).json({ Code_Exists: invite.code})
            } else {
                res.status(200).json(...invite)
            }
        })

        .catch(() => {
            Invite.insert(codeData)
                .then((data) => {
                    res.status(200).json({ ...data })
                })
                .catch((err) => {
                    res.status(400).json({ message: `potluck with the id ${potluck_id} does not exist`, error: err})
                })
            })
    }
})

//generates invite code
function genCode(potluck_id) {
    var newCode = crypto.randomBytes(12).toString('hex')
    return `${potluck_id}${newCode}`;
}



module.exports = router;