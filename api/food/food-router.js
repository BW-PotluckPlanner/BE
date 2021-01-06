const express = require('express');
const dbConfig = require('../../data/dbConfig.js');

const Food = require('./food-model.js')

const router = express.Router()

//get all food
router.get('/', (req, res) => {
    Food.find()
        .then(food => {
            res.json(food)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed!'})
        })
})

//get food by name
router.get('/:name', (req, res) => {
    const { name } = req.params

    Food.findByName(name)
        .then(food => {
        if (food){
            res.json(food);
            } else {
                res.status(404).json({ message: "Can't find food by that item." })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "DB Error" });
        })
})

//add new food
router.post('/', (req, res) => {
    const { name } = req.body
    const newFood = { name }
    const pid = req.body.pId

    Food.add(newFood)
        .then(food => {
            Food.addFoodtoPotluck({
                food_id: food[0],
                potluck_id: pid
            }).then(() => {
                res.status(201).json({ id: food[0], name: newFood.name, potluck_id: pid });
            })
        }).catch(err => {
            res.status(500).json({ message: `Could not add food to potluck, check potluck id`})
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to add your item. Check to see if it already exists: ${err}`})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Food.update(id, changes)
        .then(updated => {
            res.status(200).json({ message: `item ${id} updated. ${updated}`})
        }).catch(err => {
            res.status(500).json({ message: `Failed to update food: ${err}`})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Food.remove(id)
        .then(del => {
            res.status(200).json({message: `successfully deleted food item ${id}`})
        }).catch(err => {
            res.status(500).json(err)
        })
})



module.exports = router; 