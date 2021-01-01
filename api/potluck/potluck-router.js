const express = require('express');

const Potluck = require('./potluck-model.js')

const {
    restrict,
    validatePotluckId
} = require('../../middleware/middleware.js')

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

//create and add members to potluck
router.post('/', restrict, (req, res) => {
    const { body } = req;

    Potluck.addPotluck(body)
        .then(potluck => {
            Potluck.addUsertoPotluck({
                potluck_id: potluck[0].id,
                user_id: req.user.id,
                role_id: 1,
            }).then(() => {
                res.status(201).json({id: potluck[0], name: potluck.name});
            })
            
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to create potluck: ${err}`})
        })
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



module.exports = router;